# ZEO AI Deployment Guide - Render.com

This guide will walk you through deploying your ZEO AI application to Render.com, including both the backend API and frontend React application.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Tavus API Key**: Ensure you have your Tavus API credentials ready

## Overview

Your ZEO AI application consists of:
- **Backend**: Node.js Express server (`/server` directory)
- **Frontend**: React + Vite application (`/client` directory)
- **Monorepo**: Both services deployed from the same repository

## Step 1: Prepare Your Repository

### 1.1 Verify Your Files

Ensure your repository has the following structure:
```
ZEO/
├── client/          # React frontend
├── server/          # Node.js backend
├── render.yaml      # Render configuration
├── .renderignore    # Files to ignore during build
└── .env.render.example  # Environment variables template
```

### 1.2 Environment Variables

Copy `.env.render.example` to create your environment variables in the Render dashboard:

```bash
# Backend Environment Variables
NODE_ENV=production
PORT=3001
TAVUS_API_KEY=your_actual_tavus_api_key
TAVUS_API_URL=https://tavusapi.com/v2
TAVUS_REPLICA_ID=your_actual_replica_id
TAVUS_DEFAULT_PERSONA_ID=your_persona_id_if_available

# Frontend Environment Variables
VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
VITE_TAVUS_API_KEY=your_actual_tavus_api_key
VITE_TAVUS_REPLICA_ID=your_actual_replica_id
VITE_TAVUS_DEFAULT_PERSONA_ID=your_persona_id_if_available
VITE_ENABLE_TAVUS=true
VITE_ENABLE_AUTH=false
VITE_DEV_MODE=false
```

## Step 2: Deploy Backend (Node.js API)

### 2.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your Git repository
4. Configure the backend:

**Basic Settings:**
- **Name**: `zeo-backend` (or your preferred name)
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: main (or your deployment branch)

**Build Settings:**
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`

### 2.2 Configure Environment Variables

In your backend service settings, add these environment variables:

| Variable | Value | Required |
|----------|--------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | `3001` | Yes |
| `TAVUS_API_KEY` | Your Tavus API key | Yes |
| `TAVUS_API_URL` | `https://tavusapi.com/v2` | Yes |
| `TAVUS_REPLICA_ID` | Your Tavus replica ID | Yes |
| `TAVUS_DEFAULT_PERSONA_ID` | Your persona ID (optional) | No |

### 2.3 Deploy Backend

Click **Create Web Service** and wait for the deployment to complete. Note the URL (e.g., `https://zeo-backend.onrender.com`).

## Step 3: Deploy Frontend (React App)

### 3.1 Create New Static Site

1. In Render Dashboard, click **New** → **Static Site**
2. Connect the same Git repository
3. Configure the frontend:

**Basic Settings:**
- **Name**: `zeo-frontend` (or your preferred name)
- **Environment**: Static Site
- **Region**: Same as backend
- **Branch**: main (or your deployment branch)

**Build Settings:**
- **Build Command**: `cd client && npm install && npm run build`
- **Publish Directory**: `./client/dist`

### 3.2 Configure Environment Variables

In your frontend service settings, add these environment variables:

| Variable | Value | Required |
|----------|--------|----------|
| `VITE_API_BASE_URL` | `https://your-backend-url.onrender.com/api` | Yes |
| `VITE_TAVUS_API_KEY` | Your Tavus API key | Yes |
| `VITE_TAVUS_API_URL` | `https://tavusapi.com/v2` | Yes |
| `VITE_TAVUS_REPLICA_ID` | Your Tavus replica ID | Yes |
| `VITE_TAVUS_DEFAULT_PERSONA_ID` | Your persona ID (optional) | No |
| `VITE_ENABLE_TAVUS` | `true` | Yes |
| `VITE_ENABLE_AUTH` | `false` | Yes |
| `VITE_DEV_MODE` | `false` | Yes |

**Important**: Replace `your-backend-url.onrender.com` with your actual backend URL from Step 2.

### 3.3 Deploy Frontend

Click **Create Static Site** and wait for deployment.

## Step 4: Update CORS Configuration

After both services are deployed, you may need to update the CORS settings in your backend:

1. Go to your backend service in Render Dashboard
2. Click **Environment** tab
3. Add or update the CORS origins:

```javascript
// In server/server.js, the CORS configuration is already set to allow production origins
// The current setup allows all origins in production mode
```

## Step 5: Verify Deployment

### 5.1 Test Backend Health

Visit: `https://your-backend-url.onrender.com/api/health`

You should see: `{"status":"ok"}`

### 5.2 Test Frontend

Visit your frontend URL (e.g., `https://zeo-frontend.onrender.com`)

### 5.3 Test Full Integration

1. Open your frontend URL
2. Try creating a conversation with the AI
3. Verify the API calls are working correctly

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:

### 6.1 Backend Custom Domain

1. In your backend service settings, go to **Custom Domains**
2. Add your domain (e.g., `api.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update `VITE_API_BASE_URL` in your frontend environment variables

### 6.2 Frontend Custom Domain

1. In your frontend service settings, go to **Custom Domains**
2. Add your domain (e.g., `zeo.yourdomain.com`)
3. Follow DNS configuration instructions

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Symptoms**: Browser shows CORS errors in console
**Solution**: 
- Check that your frontend URL is allowed in backend CORS settings
- Verify `VITE_API_BASE_URL` points to the correct backend URL

#### 2. API Key Issues

**Symptoms**: 401 Unauthorized errors from Tavus API
**Solution**: 
- Verify `TAVUS_API_KEY` is correctly set in both services
- Check that the API key has the necessary permissions

#### 3. Build Failures

**Symptoms**: Build fails during deployment
**Solution**:
- Check build logs in Render dashboard
- Ensure all dependencies are listed in package.json files
- Verify Node.js version compatibility

#### 4. Environment Variables Not Loading

**Symptoms**: App behaves differently than expected
**Solution**:
- Double-check all environment variables are set correctly
- Restart the services after making changes

### Debug Commands

```bash
# Check backend health
curl https://your-backend-url.onrender.com/api/health

# Check frontend build
curl -I https://your-frontend-url.onrender.com
```

## Monitoring

### Render Analytics

Both services provide built-in analytics:
- Request logs
- Response times
- Error rates
- Bandwidth usage

### Health Checks

Set up health checks for your backend:
1. Go to backend service settings
2. Navigate to **Health Checks**
3. Set path: `/api/health`
4. Set interval: 5 minutes

## Updates and Maintenance

### Automatic Deployments

Enable automatic deployments:
1. In service settings, go to **Deploys**
2. Enable **Auto-Deploy** on push to main branch

### Manual Deploys

For manual deployments:
1. Go to your service in Render Dashboard
2. Click **Manual Deploy** → **Deploy latest commit**

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)
- **Tavus Documentation**: [docs.tavus.io](https://docs.tavus.io)

## Security Checklist

- [ ] Use strong, unique API keys
- [ ] Enable HTTPS for all services
- [ ] Review and limit CORS origins
- [ ] Set up rate limiting (already configured)
- [ ] Monitor API usage and logs
- [ ] Keep dependencies updated

## Next Steps

1. Set up monitoring alerts
2. Configure custom domains
3. Implement user authentication (optional)
4. Add analytics and error tracking
5. Optimize for performance

---

**Congratulations!** Your ZEO AI application is now deployed on Render.com. The application should be fully functional with both backend API and frontend React app running in production.