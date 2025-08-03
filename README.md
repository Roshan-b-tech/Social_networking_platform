# 🚀 LinkedIn-like Community Platform

A full-stack social media platform built with React, Node.js, and MongoDB that mimics LinkedIn's core features and design. Users can create profiles, share posts, upload media, and interact with other users in a professional networking environment.

## ✨ Live Demo

- **Frontend**: [https://social-networkingapp.netlify.app](https://social-networkingapp.netlify.app)
- **Backend**: [https://social-networking-platform-1.onrender.com](https://social-networking-platform-1.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development for better code quality
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for SPA
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Beautiful icon library
- **Netlify** - Frontend hosting and CDN

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing and security
- **Render** - Backend hosting platform

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript** - Type checking and IntelliSense

## 🚀 Features

### 🔐 Authentication & User Management
- **User Registration** - Secure email/password registration
- **User Login** - JWT-based authentication
- **Profile Management** - Custom profile images and banner uploads
- **Session Management** - Persistent login with token storage

### 📱 Social Features
- **Post Creation** - Text posts with media uploads (images/videos)
- **Interactive Feed** - Like, comment, and share posts
- **Real-time Updates** - Live post interactions
- **Media Support** - Image and video uploads with preview
- **File Validation** - Size and type restrictions for uploads

### 👤 User Profiles
- **Custom Profile Images** - Upload and display profile pictures
- **Banner Images** - Custom cover photos for profiles
- **Bio & Information** - Editable user information
- **Post History** - View user's post timeline

### 🎨 Modern UI/UX
- **LinkedIn-inspired Design** - Professional color scheme and layout
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Components** - Hover effects, animations, and transitions
- **Custom Notifications** - In-app notification system
- **Modal Dialogs** - Professional event and celebration modals
- **Mobile Hamburger Menu** - Responsive navigation for mobile devices

### 📊 Advanced Features
- **Base64 Media Storage** - Efficient image/video handling
- **Real-time Comments** - Live comment system
- **Like System** - Interactive post engagement
- **Search Functionality** - Placeholder for advanced search
- **CORS Configuration** - Secure cross-origin requests

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Roshan-b-tech/Social_networking_platform.git
   cd Social_networking_platform
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/linkedin-clone
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (in server directory)
   cd server
   npm run dev
   
   # Start frontend server (in root directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🚀 Production Deployment

### Backend Deployment (Render)
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
5. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-atlas-connection-string`
   - `JWT_SECRET=your-jwt-secret`
   - `PORT=10000`

### Frontend Deployment (Netlify)
1. Go to [netlify.com](https://netlify.com)
2. Create "New site from Git"
3. Connect your GitHub repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Set environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`

## 👤 Demo User Credentials

### Test Account 1
- **Email**: `demo@example.com`
- **Password**: `demo123`
- **Full Name**: `Demo User`

### Test Account 2
- **Email**: `test@example.com`
- **Password**: `test123`
- **Full Name**: `Test User`

### Create Your Own Account
You can also register a new account with any email and password.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Hamburger menu navigation
- Touch-friendly buttons
- Optimized layouts for small screens
- Full-width action buttons

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:postId` - Update post
- `DELETE /api/posts/:postId` - Delete post
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comments` - Add comment
- `GET /api/posts/:postId/comments` - Get comments

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  fullName: String (required),
  bio: String,
  avatarUrl: String,
  profileImage: String (base64),
  bannerImage: String (base64),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  content: String (required),
  author: ObjectId (ref: User),
  likes: [ObjectId] (ref: User),
  comments: [{
    content: String,
    author: ObjectId (ref: User),
    createdAt: Date
  }],
  mediaUrl: String,
  mediaType: String (enum: 'image', 'video'),
  mediaData: String (base64),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for password security
- **CORS Protection** - Configured for production domains
- **Input Validation** - Server-side validation
- **File Upload Limits** - Size and type restrictions
- **Environment Variables** - Secure configuration management

## 🎨 Design System

### Colors
- **Primary Blue**: `#0a66c2` (LinkedIn blue)
- **Dark Blue**: `#004182`
- **Background**: `#f3f2ef`
- **Text**: `#191919`
- **Gray**: `#666666`

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Sizes**: Responsive scaling
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold)

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Blue primary, gray secondary
- **Inputs**: Clean borders with focus states
- **Modals**: Centered with backdrop blur

## 🚀 Performance Optimizations

- **Code Splitting** - React Router lazy loading
- **Image Optimization** - Base64 encoding for small images
- **Bundle Optimization** - Vite build optimization
- **CDN Delivery** - Netlify global CDN
- **Caching** - Browser and CDN caching

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Post creation with text and media
- [ ] Like and comment functionality
- [ ] Profile image and banner upload
- [ ] Responsive design on all devices
- [ ] Mobile navigation menu
- [ ] Search functionality
- [ ] Error handling and notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LinkedIn** - Design inspiration and UX patterns
- **React Team** - Amazing frontend framework
- **Node.js Community** - Backend ecosystem
- **MongoDB** - Database solution
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library

## 📞 Support

If you encounter any issues or have questions:
1. Check the [troubleshooting guide](DEPLOYMENT-NETLIFY-RENDER.md)
2. Review the [MongoDB setup guide](MONGODB_SETUP.md)
3. Open an issue on GitHub
4. Contact the development team

---

**Built with ❤️ using React, Node.js, and MongoDB** 