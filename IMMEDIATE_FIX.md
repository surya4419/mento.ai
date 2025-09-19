# 🚨 IMMEDIATE FIX: 500 Internal Server Error

## **CRITICAL ISSUE FOUND**

Your server is using a **placeholder API key** that is causing the 500 error:

```
TAVUS_API_KEY = "5f50263c80654c5bb8613a0e7a90f029"  ❌ INVALID
```

## **IMMEDIATE ACTION REQUIRED**

### **Step 1: Get Your Real Tavus Credentials**

1. **Go to [Tavus Dashboard](https://dashboard.tavus.io)**
2. **Navigate to API Keys**
3. **Copy your Production API Key** (starts with something like `sk_live_...`)
4. **Verify your Replica ID** should be: `r6ae5b6efc9d` (replica "Anna")

### **Step 2: Update Render Environment Variables**

**Go to [Render Dashboard](https://dashboard.render.com)** → Select **zeo-backend** → **Environment** tab → **Add/Update these variables:**

```bash
# Update these immediately:
TAVUS_API_KEY=your_real_tavus_api_key_here
TAVUS_REPLICA_ID=r6ae5b6efc9d
TAVUS_DEFAULT_PERSONA_ID=

# Keep these as-is:
NODE_ENV=production
PORT=3001
TAVUS_API_URL=https://tavusapi.com/v2
```

### **Step 3: Restart Your Services**

1. **Click "Manual Deploy"** in Render dashboard
2. **Wait 2-3 minutes** for deployment
3. **Test the fix:**
   ```bash
   # Test the health endpoint
   curl https://zeo-backend.onrender.com/api/tavus/health
   
   # Should return success
   ```

### **Step 4: Verify Frontend**

**Go to [zeo-p8vd.onrender.com](https://zeo-p8vd.onrender.com)** and try starting a session.

## **Expected Result**

After updating with real credentials, the 500 error will disappear and sessions will start successfully.

## **Still Need Help?**

1. **Check the validation script:**
   ```bash
   cd server
   node validate-deployment.js
   ```

2. **Verify your Tavus account:**
   - Ensure your replica "Anna" is **completed** and **ready**
   - Ensure your API key has **production access**

3. **Contact support:**
   - Tavus: support@tavus.io
   - Include your replica ID: `r6ae5b6efc9d`

## **Quick Checklist**

- [ ] Real Tavus API key obtained from dashboard
- [ ] Render environment variables updated
- [ ] Backend service restarted
- [ ] Frontend service restarted
- [ ] Test session creation on live site

**This is the exact fix needed - no code changes required, just environment variable updates!**