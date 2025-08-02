# 🚀 Render (Backend) + Netlify (Frontend) Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **MongoDB Atlas Account** - For database (see MONGODB_SETUP.md)
3. **Render Account** - For backend deployment
4. **Netlify Account** - For frontend deployment

## 🔧 Step 1: Set Up MongoDB Atlas

Follow the instructions in `MONGODB_SETUP.md` to:
- Create a MongoDB Atlas cluster
- Set up database user
- Get your connection string
- Configure network access

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account

### 2.2 Deploy Backend Service
1. **Click "New +"** → **"Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `linkedin-clone-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
   - **Plan**: Free

### 2.3 Set Environment Variables
In your Render service settings, add these environment variables:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/linkedin-clone?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
PORT=10000
```

### 2.4 Get Backend URL
After deployment, Render will provide a URL like:
`https://linkedin-clone-backend.onrender.com`

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account

### 3.2 Deploy Frontend
1. **Click "New site from Git"**
2. **Choose GitHub** and select your repository
3. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)

### 3.3 Set Environment Variables
In Netlify site settings → Environment variables, add:

```
VITE_API_URL=https://linkedin-clone-backend.onrender.com/api
```

### 3.4 Update CORS Settings
Update your backend CORS configuration in `server/server.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.netlify.app']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

Replace `your-app-name.netlify.app` with your actual Netlify domain.

## 🔄 Step 4: Update Configuration Files

### 4.1 Update netlify.toml
Update the `VITE_API_URL` in `netlify.toml`:

```toml
[build.environment]
  VITE_API_URL = "https://your-backend-name.onrender.com/api"
```

### 4.2 Update render.yaml
Make sure your `render.yaml` has the correct service name:

```yaml
services:
  - type: web
    name: your-backend-name
    # ... rest of configuration
```

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend
Visit your backend URL + `/api/health`:
```
https://your-backend-name.onrender.com/api/health
```
Should return: `{"status": "Server is running"}`

### 5.2 Test Frontend
Visit your Netlify URL and test:
- [ ] User registration
- [ ] User login
- [ ] Post creation
- [ ] Media uploads
- [ ] Profile updates

## 🔧 Step 6: Custom Domain (Optional)

### 6.1 Backend Custom Domain
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS

### 6.2 Frontend Custom Domain
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Configure DNS records

## 🚨 Troubleshooting

### Common Issues

#### Backend Issues
1. **Build Failures**
   - Check if all dependencies are in `server/package.json`
   - Verify Node.js version compatibility

2. **MongoDB Connection Issues**
   - Verify connection string format
   - Check network access settings in MongoDB Atlas
   - Ensure IP whitelist includes Render IPs

3. **CORS Errors**
   - Update CORS origin to include your Netlify domain
   - Check if credentials are enabled

#### Frontend Issues
1. **API Connection Errors**
   - Verify `VITE_API_URL` environment variable
   - Check if backend is running
   - Test API endpoints directly

2. **Build Failures**
   - Check for TypeScript errors
   - Verify all dependencies are installed
   - Check Vite configuration

### Debug Commands

```bash
# Test backend locally with production settings
cd server
NODE_ENV=production npm start

# Test frontend build
npm run build

# Check environment variables
echo $VITE_API_URL
```

## 📊 Monitoring

### Render Monitoring
- Check service logs in Render dashboard
- Monitor resource usage
- Set up alerts for downtime

### Netlify Monitoring
- Check build logs
- Monitor form submissions
- Set up analytics

## 🔒 Security Checklist

- [ ] JWT secret is strong and unique
- [ ] MongoDB connection uses environment variables
- [ ] CORS is properly configured
- [ ] HTTPS is enabled on both services
- [ ] Environment variables are not exposed in client code
- [ ] Database user has minimal required permissions

## 🎉 Success!

Your LinkedIn clone is now deployed with:
- **Backend**: Render (Node.js + Express)
- **Frontend**: Netlify (React + Vite)
- **Database**: MongoDB Atlas
- **Authentication**: JWT tokens

Your app URLs:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend-name.onrender.com` 