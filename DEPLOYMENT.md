# 🚀 Deployment Guide

## Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Create a new repository for backend
   mkdir linkedin-clone-backend
   cd linkedin-clone-backend
   
   # Copy server files
   cp -r ../server/* .
   
   # Initialize git
   git init
   git add .
   git commit -m "Initial backend commit"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/linkedin-clone-backend.git
   git push -u origin main
   ```

3. **Connect to Railway**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your backend repository

4. **Set Environment Variables**
   - Go to your project settings
   - Add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app-name.railway.app`
   - Copy this URL

### Step 2: Deploy Frontend to Vercel

1. **Update API Configuration**
   ```bash
   # Update src/lib/api.ts
   # Change the base URL to your Railway backend URL
   const API_BASE_URL = 'https://your-app-name.railway.app';
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   
   # Or connect your GitHub repo to Vercel
   # Go to vercel.com and import your repository
   ```

3. **Update Vercel Configuration**
   - Update `vercel.json` with your actual backend URL
   - Replace `your-backend-url.railway.app` with your Railway URL

## Option 2: Netlify (Frontend) + Render (Backend)

### Backend on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Create new Web Service
   - Connect your backend repository
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables

### Frontend on Netlify

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your GitHub repository

## Option 3: Full Stack on Railway

1. **Create Monorepo Structure**
   ```bash
   linkedin-clone/
   ├── frontend/     # React app
   ├── backend/      # Node.js server
   └── railway.json  # Railway configuration
   ```

2. **Railway Configuration**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "cd backend && npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

## Environment Variables Setup

### MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Add to environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
   ```

### JWT Secret
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test post creation
- [ ] Test media uploads
- [ ] Test profile updates
- [ ] Test responsive design
- [ ] Check CORS settings
- [ ] Verify environment variables
- [ ] Test API endpoints

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS configuration in server
   - Add your frontend domain to allowed origins

2. **MongoDB Connection Issues**
   - Check connection string format
   - Verify network access settings

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Environment Variables**
   - Ensure all variables are set correctly
   - Check for typos in variable names

## Support

If you encounter issues:
1. Check the deployment platform logs
2. Verify environment variables
3. Test locally with production settings
4. Check network connectivity 