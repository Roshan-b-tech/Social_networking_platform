#!/bin/bash

echo "🚀 Starting Render Deployment Process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for Render deployment"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo "git push -u origin main"
fi

echo "✅ Repository is ready for Render deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New +' and select 'Blueprint'"
echo "4. Connect your GitHub repository"
echo "5. Render will automatically detect the render.yaml file"
echo "6. Set your environment variables:"
echo "   - MONGODB_URI: Your MongoDB Atlas connection string"
echo "   - JWT_SECRET: Your JWT secret key"
echo "7. Deploy!"
echo ""
echo "🔧 Environment Variables to set in Render:"
echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone"
echo "JWT_SECRET=your-super-secret-jwt-key-here"
echo ""
echo "🌐 Your app will be available at:"
echo "Frontend: https://linkedin-clone-frontend.onrender.com"
echo "Backend: https://linkedin-clone-backend.onrender.com" 