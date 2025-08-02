import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Backend GET user data:', {
      profileImageLength: user.profileImage ? user.profileImage.length : 0,
      bannerImageLength: user.bannerImage ? user.bannerImage.length : 0
    });

    res.json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      profileImage: user.profileImage,
      bannerImage: user.bannerImage,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { fullName, bio, profileImage, bannerImage } = req.body;

    console.log('Backend received profile update:', {
      fullName,
      bio,
      profileImageLength: profileImage ? profileImage.length : 0,
      bannerImageLength: bannerImage ? bannerImage.length : 0
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, bio, profileImage, bannerImage },
      { new: true, runValidators: true }
    ).select('-password');

    console.log('Backend saved user data:', {
      profileImageLength: user.profileImage ? user.profileImage.length : 0,
      bannerImageLength: user.bannerImage ? user.bannerImage.length : 0
    });

    res.json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      profileImage: user.profileImage,
      bannerImage: user.bannerImage
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;