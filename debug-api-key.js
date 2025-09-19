#!/usr/bin/env node

/**
 * Debug script to check which Tavus API key is being used
 * Run with: cd server && npm install && cd .. && node debug-api-key.js
 */

// Simple debug without external dependencies
console.log('🚀 Tavus API Key Debug Tool\n');

// Check local configuration
console.log('📊 Local Configuration:');
try {
  const config = require('./server/config.js');
  console.log('Environment:', config.nodeEnv);
  console.log('API Key Source:', process.env.TAVUS_API_KEY ? 'Environment Variable' : 'Hardcoded Fallback');
  console.log('API Key Preview:', config.tavusApiKey ? `${config.tavusApiKey.substring(0, 8)}...` : 'None');
  console.log('API Key Length:', config.tavusApiKey ? config.tavusApiKey.length : 0);
  console.log('Replica ID:', config.replicaId);
  console.log('');
  
  if (process.env.TAVUS_API_KEY) {
    console.log('✅ Using environment variable API key locally');
  } else {
    console.log('⚠️  WARNING: Using fallback hardcoded API key locally!');
    console.log('   Set TAVUS_API_KEY in server/.env');
  }
} catch (error) {
  console.error('❌ Error loading local config:', error.message);
}

console.log('\n💡 How to check which key is being used:');
console.log('1. Visit: https://zeo-backend.onrender.com/api/debug/config');
console.log('2. Look for "apiKeySource" - should be "environment" not "fallback"');
console.log('3. Compare "apiKeyPreview" with your actual key');
console.log('');

console.log('🔧 To fix if using fallback:');
console.log('1. Go to https://dashboard.render.com');
console.log('2. Select your backend service');
console.log('3. Settings → Environment Variables');
console.log('4. Add: TAVUS_API_KEY=your_real_key_here');
console.log('5. Click "Save" and then "Manual Deploy"');
console.log('');

console.log('🧪 Manual test commands:');
console.log('curl https://zeo-backend.onrender.com/api/debug/config');
console.log('curl https://zeo-backend.onrender.com/api/tavus/health');