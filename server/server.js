const express = require('express');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

const app = express();

// Middleware
// CORS configuration
const allowedOrigins = [
  'http://localhost:8080',  // Vite dev server
  'http://127.0.0.1:8080',  // Alternative localhost
  'http://192.168.43.252:8080',  // Local network access
  // Production origins - update these with your actual Render URLs
 
  'https://mento-ai-backend-q75s.onrender.com'
   // Render frontend URL
    // Your custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // In production, allow all origins for Render deployment
    if (process.env.NODE_ENV === 'production') {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Auth middleware (placeholder - implement proper auth)
const authenticate = (req, res, next) => {
  // TODO: Implement proper authentication
  // For now, just allow all requests
  next();
};

// Tavus API client
const tavusApi = axios.create({
  baseURL: config.tavusApiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': config.tavusApiKey
  }
});

// Add request/response interceptors for debugging
if (process.env.NODE_ENV === 'development') {
  tavusApi.interceptors.request.use(
    (config) => {
      console.log('Tavus API Request:', {
        url: config.url,
        method: config.method,
        data: config.data
      });
      return config;
    },
    (error) => {
      console.error('Tavus API Request Error:', error);
      return Promise.reject(error);
    }
  );

  tavusApi.interceptors.response.use(
    (response) => {
      console.log('Tavus API Response:', {
        status: response.status,
        data: response.data
      });
      return response;
    },
    (error) => {
      console.error('Tavus API Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return Promise.reject(error);
    }
  );
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Debug endpoint to check current configuration
app.get('/api/debug/config', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    tavusApiUrl: config.tavusApiUrl,
    replicaId: config.replicaId,
    defaultPersonaId: config.defaultPersonaId,
    apiKeySource: process.env.TAVUS_API_KEY ? 'environment' : 'fallback',
    apiKeyLength: config.tavusApiKey ? config.tavusApiKey.length : 0,
    apiKeyPreview: config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : null,
    hasValidConfig: !!(config.tavusApiKey && config.replicaId)
  });
});

// Health check for Tavus API
app.get('/api/tavus/health', authenticate, async (req, res) => {
  try {
    console.log('=== DEBUG: Tavus API Configuration ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('API Key Source:', process.env.TAVUS_API_KEY ? 'Environment Variable' : 'Hardcoded Fallback');
    console.log('API Key Preview:', config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : 'None');
    console.log('Replica ID:', config.replicaId);
    console.log('API URL:', config.tavusApiUrl);
    console.log('=====================================');
    
    const response = await tavusApi.get(`/replicas/${config.replicaId}`);
    
    res.json({
      status: 'ok',
      tavusConnected: true,
      replicaId: config.replicaId,
      replicaStatus: response.data?.status,
      replicaName: response.data?.replica_name,
      debug: {
        apiKeySource: process.env.TAVUS_API_KEY ? 'env' : 'fallback',
        apiKeyLength: config.tavusApiKey ? config.tavusApiKey.length : 0
      }
    });
  } catch (error) {
    console.error('Tavus API Health Check Failed:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    res.status(error.response?.status || 500).json({
      status: 'error',
      tavusConnected: false,
      error: error.response?.data?.message || error.message,
      debug: {
        replicaId: config.replicaId,
        hasApiKey: !!config.tavusApiKey,
        apiKeySource: process.env.TAVUS_API_KEY ? 'env' : 'fallback',
        apiKeyLength: config.tavusApiKey ? config.tavusApiKey.length : 0,
        apiUrl: config.tavusApiUrl
      }
    });
  }
});

// Get replica details
app.get('/api/tavus/replica', authenticate, async (req, res) => {
  try {
    const response = await tavusApi.get(`/replicas/${config.replicaId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching replica:', error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to fetch replica',
      details: error.response?.data
    });
  }
});

// Create conversation
app.post('/api/tavus/conversation', authenticate, async (req, res) => {
  try {
    const { personaId } = req.body;
    const payload = { replica_id: config.replicaId };
    
    // Only add persona_id if explicitly provided and not empty
    if (personaId && personaId.trim() !== '') {
      payload.persona_id = personaId;
    } else if (config.defaultPersonaId && config.defaultPersonaId.trim() !== '') {
      // Only use default persona_id if it's a valid non-empty string
      payload.persona_id = config.defaultPersonaId;
    }
    // If no valid persona_id is provided, Tavus will use the replica's default persona

    console.log('=== DEBUG: Conversation Creation ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('API Key Source:', process.env.TAVUS_API_KEY ? 'Environment Variable' : 'Hardcoded Fallback');
    console.log('API Key Preview:', config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : 'None');
    console.log('Replica ID:', config.replicaId);
    console.log('Payload:', payload);
    console.log('=====================================');

    const response = await tavusApi.post('/conversations', payload);
    console.log('Conversation created successfully:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('=== DEBUG: Conversation Creation Error ===');
    console.error('Environment:', process.env.NODE_ENV);
    console.error('API Key Source:', process.env.TAVUS_API_KEY ? 'Environment Variable' : 'Hardcoded Fallback');
    console.error('API Key Preview:', config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : 'None');
    console.error('Full error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        headers: { ...error.config?.headers, 'x-api-key': '***masked***' }
      }
    });
    console.error('==========================================');
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to create conversation';
    const details = error.response?.data || error.message;
    
    res.status(status).json({
      message,
      details,
      debug: {
        replicaId: config.replicaId,
        hasApiKey: !!config.tavusApiKey,
        apiKeySource: process.env.TAVUS_API_KEY ? 'env' : 'fallback',
        apiKeyLength: config.tavusApiKey ? config.tavusApiKey.length : 0,
        apiKeyPreview: config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : 'None'
      }
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

module.exports = app;
