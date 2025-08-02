import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 200
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  bannerImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);