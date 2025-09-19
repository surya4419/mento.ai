#!/usr/bin/env node

/**
 * ZEO Deployment Validation Script
 * This script validates your Tavus API configuration before deployment
 */

const axios = require('axios');

// Configuration
const config = {
  TAVUS_API_KEY: process.env.TAVUS_API_KEY,
  TAVUS_REPLICA_ID: process.env.TAVUS_REPLICA_ID || 'r6ae5b6efc9d',
  TAVUS_API_URL: 'https://tavusapi.com/v2'
};

async function validateTavusConfig() {
  console.log('🔍 Validating Tavus API Configuration...\n');

  // Check if API key is provided
  if (!config.TAVUS_API_KEY || config.TAVUS_API_KEY.length < 20) {
    console.log('❌ INVALID: TAVUS_API_KEY is missing or appears to be a placeholder');
    console.log('   Current value:', config.TAVUS_API_KEY || 'NOT SET');
    console.log('   Please set a valid Tavus API key in your environment variables');
    return false;
  }

  console.log('✅ API Key format looks valid');

  // Test API connectivity
  try {
    console.log('🔌 Testing Tavus API connection...');
    
    const response = await axios.get(
      `${config.TAVUS_API_URL}/replicas/${config.TAVUS_REPLICA_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${config.TAVUS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      console.log('✅ Tavus API connection successful');
      console.log('   Replica ID:', response.data.replica_id);
      console.log('   Replica Name:', response.data.replica_name);
      console.log('   Status:', response.data.status);
      
      if (response.data.status !== 'completed') {
        console.log('⚠️  WARNING: Replica status is not "completed"');
        console.log('   This may cause issues with conversation creation');
      }
      
      return true;
    }
  } catch (error) {
    console.log('❌ Tavus API connection failed');
    
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Error:', error.response.data.message || error.response.data);
      
      if (error.response.status === 401) {
        console.log('   🔧 Fix: Check your TAVUS_API_KEY - it appears to be invalid');
      } else if (error.response.status === 404) {
        console.log('   🔧 Fix: Check your TAVUS_REPLICA_ID - replica not found');
      }
    } else {
      console.log('   Network error:', error.message);
    }
    
    return false;
  }
}

async function validateAll() {
  console.log('🚀 ZEO Deployment Validation\n');
  
  const isValid = await validateTavusConfig();
  
  if (isValid) {
    console.log('\n🎉 All checks passed! Your deployment should work correctly.');
    console.log('\n📋 Next steps:');
    console.log('   1. Deploy your application to Render');
    console.log('   2. Set the following environment variables in Render:');
    console.log('      - TAVUS_API_KEY=<your-real-api-key>');
    console.log('      - TAVUS_REPLICA_ID=r6ae5b6efc9d');
  } else {
    console.log('\n❌ Validation failed. Please fix the issues above before deploying.');
  }
  
  return isValid;
}

// Run validation if called directly
if (require.main === module) {
  validateAll().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { validateTavusConfig, validateAll };