// Simple Tavus API Key Validator
// Usage: node test-tavus-key.js YOUR_API_KEY YOUR_REPLICA_ID

const https = require('https');

function testTavusCredentials(apiKey, replicaId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'tavusapi.com',
      path: `/v2/replicas/${replicaId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve({
              success: true,
              replica: response,
              message: '✅ API Key and Replica ID are valid!'
            });
          } else {
            resolve({
              success: false,
              status: res.statusCode,
              error: response.message || 'Authentication failed',
              message: '❌ Invalid API Key or Replica ID'
            });
          }
        } catch (e) {
          reject({
            success: false,
            error: 'Invalid JSON response',
            raw: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
        error: error.message
      });
    });

    req.end();
  });
}

// If called with arguments
if (process.argv.length >= 4) {
  const apiKey = process.argv[2];
  const replicaId = process.argv[3];
  
  console.log(`Testing Tavus credentials...\n`);
  console.log(`API Key: ${apiKey.substring(0, 8)}...`);
  console.log(`Replica ID: ${replicaId}\n`);
  
  testTavusCredentials(apiKey, replicaId)
    .then(result => {
      console.log(result.message);
      if (result.success) {
        console.log('Replica Name:', result.replica.replica_name);
        console.log('Status:', result.replica.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
} else {
  console.log('Usage: node test-tavus-key.js YOUR_API_KEY YOUR_REPLICA_ID');
  console.log('\nExample:');
  console.log('node test-tavus-key.js tv_your_real_key_here r6ae5b6efc9d');
}