# 🚀 LinkedIn-like Community Platform

A full-stack social media platform built with React, Node.js, and MongoDB that mimics LinkedIn's core features and design.

## ✨ Features

### 🔐 Authentication
- **User Registration & Login** - Secure JWT-based authentication
- **Profile Management** - Custom profile images and banner uploads
- **Session Management** - Persistent login with token storage

### 📱 Social Features
- **Post Creation** - Text posts with media uploads (images/videos)
- **Interactive Feed** - Like, comment, and share posts
- **Real-time Updates** - Live post interactions
- **Media Support** - Image and video uploads with preview

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

### 📊 Advanced Features
- **File Upload Validation** - Size and type restrictions
- **Base64 Media Storage** - Efficient image/video handling
- **Real-time Comments** - Live comment system
- **Like System** - Interactive post engagement
- **Search Functionality** - Placeholder for advanced search

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Type checking

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkdin-template
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
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
linkdin-template/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── AuthForm.tsx    # Login/Register form
│   │   ├── Layout.tsx      # Main layout with navigation
│   │   ├── PostCard.tsx    # Individual post display
│   │   ├── PostComposer.tsx # Post creation form
│   │   ├── ProfileCard.tsx # User profile display
│   │   ├── ProfileImage.tsx # Reusable profile image component
│   │   ├── EventModal.tsx  # Event creation modal
│   │   ├── CelebrateModal.tsx # Celebration modal
│   │   └── NotificationDisplay.tsx # Notification system
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── NotificationContext.tsx # Notification state
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Main feed page
│   │   └── Profile.tsx     # Profile page
│   ├── lib/                # Utility libraries
│   │   └── api.ts          # API client
│   └── main.tsx            # App entry point
├── server/                 # Backend source code
│   ├── models/             # Database models
│   │   ├── User.js         # User schema
│   │   └── Post.js         # Post schema
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── users.js        # User management routes
│   │   └── posts.js        # Post management routes
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # JWT authentication middleware
│   └── server.js           # Express server setup
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── server/package.json     # Backend dependencies
└── README.md              # This file
```

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
- `GET /api/posts/user/:userId` - Get user's posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:postId` - Update post
- `DELETE /api/posts/:postId` - Delete post
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comments` - Add comment
- `GET /api/posts/:postId/comments` - Get post comments

## 🎯 Key Features Explained

### Profile Image System
- **Upload Support**: Users can upload profile and banner images
- **Base64 Storage**: Images are stored as base64 strings in MongoDB
- **Size Validation**: Profile images (5MB), Banner images (10MB)
- **Fallback Design**: Shows initials when no image is uploaded
- **Consistent Display**: Profile images appear everywhere in the app

### Media Upload System
- **Image & Video Support**: Upload images and videos to posts
- **File Validation**: Size and type restrictions
- **Preview System**: Real-time media preview before posting
- **Base64 Encoding**: Efficient storage and retrieval

### Notification System
- **Custom Notifications**: LinkedIn-style in-app notifications
- **Multiple Types**: Success, error, warning, and info notifications
- **Auto-dismiss**: Notifications automatically close after 5 seconds
- **Action Support**: Notifications can include action buttons

### Interactive Components
- **Event Modal**: Create LinkedIn-style event posts
- **Celebration Modal**: Share achievements and celebrations
- **Like System**: Interactive post engagement
- **Comment System**: Real-time commenting on posts

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Update frontend API base URL

### Database Setup
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in environment variables

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt password encryption
- **Input Validation** - Server-side validation for all inputs
- **File Upload Security** - File type and size validation
- **CORS Configuration** - Cross-origin resource sharing setup

## 🎨 Design System

### Colors
- **Primary Blue**: `#0a66c2` (LinkedIn blue)
- **Dark Blue**: `#004182` (Hover states)
- **Background**: `#f3f2ef` (LinkedIn background)
- **Text**: `#000000` (Primary), `#666666` (Secondary)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Blue primary buttons with hover effects
- **Inputs**: Clean borders with focus states
- **Avatars**: Circular profile images with fallback initials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **LinkedIn** - Design inspiration and feature reference
- **React Team** - Amazing frontend framework
- **Express.js** - Robust backend framework
- **MongoDB** - Flexible database solution
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using modern web technologies** 