# 🛠️ ZEO AI Troubleshooting Guide

## Current Issue: 500 Internal Server Error

### **Problem Description**
You're seeing a 500 error when trying to create conversations with the Tavus API. This indicates a server-side configuration issue rather than the previous "Invalid persona_id" error.

### **Quick Diagnostic Steps**

#### **1. Check Tavus API Configuration**

**Test your Tavus API setup:**
```bash
# Test backend health
curl https://zeo-backend.onrender.com/api/health

# Test Tavus API connectivity
curl https://zeo-backend.onrender.com/api/tavus/health
```

#### **2. Verify Environment Variables**

**Check your Render dashboard for these variables:**

**Backend Environment Variables (zeo-backend):**
- [ ] `NODE_ENV=production`
- [ ] `PORT=3001`
- [ ] `TAVUS_API_KEY=your_actual_tavus_api_key` ⚠️ **CRITICAL**
- [ ] `TAVUS_API_URL=https://tavusapi.com/v2`
- [ ] `TAVUS_REPLICA_ID=your_actual_replica_id` ⚠️ **CRITICAL**
- [ ] `TAVUS_DEFAULT_PERSONA_ID=` (leave empty or use actual persona ID)

**Frontend Environment Variables (zeo-frontend):**
- [ ] `VITE_API_BASE_URL=https://zeo-backend.onrender.com/api`
- [ ] `VITE_TAVUS_API_KEY=your_actual_tavus_api_key`
- [ ] `VITE_TAVUS_REPLICA_ID=your_actual_replica_id`
- [ ] `VITE_TAVUS_DEFAULT_PERSONA_ID=` (leave empty or match backend)
- [ ] `VITE_ENABLE_TAVUS=true`
- [ ] `VITE_ENABLE_AUTH=false`

### **How to Get Correct Values**

#### **Tavus API Key**
1. Go to [Tavus Dashboard](https://dashboard.tavus.io)
2. Navigate to **API Keys** section
3. Copy your **Production API Key**

#### **Tavus Replica ID**
1. In Tavus Dashboard, go to **Replicas**
2. Find your replica (should be trained and ready)
3. Copy the **Replica ID** (format: `rXXXXXXXX`)

#### **Tavus Persona ID** (Optional)
1. In Tavus Dashboard, go to **Personas**
2. If you have personas created, copy the **Persona ID**
3. Leave empty to use replica's default persona

### **Deployment Verification**

#### **Step 1: Update Environment Variables**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your **zeo-backend** service
3. Go to **Environment** tab
4. Update all Tavus-related variables with real values
5. **Save changes** and **restart** the service

#### **Step 2: Test the Fix**
```bash
# Test the new health endpoint
curl https://zeo-backend.onrender.com/api/tavus/health

# Should return success if everything is configured correctly
```

#### **Step 3: Verify Frontend**
1. Open your live site: `https://zeo-p8vd.onrender.com`
2. Try starting a session
3. Check browser console for any remaining errors

### **Common Issues & Solutions**

#### **Issue 1: "Invalid API Key"**
**Solution:**
- Verify `TAVUS_API_KEY` is correctly set in both backend and frontend
- Ensure it's the **Production** key, not Development
- Check for extra spaces or quotes in the key

#### **Issue 2: "Replica Not Found"**
**Solution:**
- Verify `TAVUS_REPLICA_ID` matches exactly what's in Tavus dashboard
- Ensure replica is **trained** and **ready** (not in training)
- Check replica belongs to your account

#### **Issue 3: "Persona Not Found"**
**Solution:**
- Leave `TAVUS_DEFAULT_PERSONA_ID` empty to use default
- Or use a valid persona ID from your Tavus account

#### **Issue 4: CORS Errors**
**Solution:**
- Verify `VITE_API_BASE_URL` points to correct backend URL
- Check backend CORS settings allow your frontend domain

### **Emergency Fallback**

If Tavus API continues to fail, you can temporarily disable Tavus integration:

**Frontend:**
```bash
VITE_ENABLE_TAVUS=false
```

### **Support Resources**

- **Tavus Documentation**: [docs.tavus.io](https://docs.tavus.io)
- **Tavus Support**: support@tavus.io
- **Render Documentation**: [docs.render.com](https://docs.render.com)

### **Next Steps**

1. **Update your environment variables** with real Tavus values
2. **Restart both services** in Render dashboard
3. **Test the new `/api/tavus/health` endpoint**
4. **Verify the fix** by starting a session on your live site

The enhanced error logging I've added will provide detailed information about what's failing, making it easier to identify the exact configuration issue.