import express from 'express';
import Post from '../models/Post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'fullName')
            .populate('likes', 'fullName')
            .populate('comments.author', 'fullName')
            .sort({ createdAt: -1 })
            .limit(50);

        const formattedPosts = posts.map(post => ({
            id: post._id,
            content: post.content,
            createdAt: post.createdAt,
            author: {
                id: post.author._id,
                fullName: post.author.fullName
            },
            likes: post.likes ? post.likes.length : 0,
            isLiked: post.likes ? post.likes.some(like => like._id.toString() === req.user._id.toString()) : false,
            comments: post.comments ? post.comments.map(comment => ({
                id: comment._id,
                content: comment.content,
                createdAt: comment.createdAt,
                author: {
                    id: comment.author._id,
                    fullName: comment.author.fullName
                }
            })) : [],
            mediaUrl: post.mediaUrl || '',
            mediaType: post.mediaType || '',
            mediaData: post.mediaData || ''
        }));

        res.json(formattedPosts);
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get posts by user
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId })
            .populate('author', 'fullName')
            .populate('likes', 'fullName')
            .populate('comments.author', 'fullName')
            .sort({ createdAt: -1 });

        const formattedPosts = posts.map(post => ({
            id: post._id,
            content: post.content,
            createdAt: post.createdAt,
            author: {
                id: post.author._id,
                fullName: post.author.fullName
            },
            likes: post.likes ? post.likes.length : 0,
            isLiked: post.likes ? post.likes.some(like => like._id.toString() === req.user._id.toString()) : false,
            comments: post.comments ? post.comments.map(comment => ({
                id: comment._id,
                content: comment.content,
                createdAt: comment.createdAt,
                author: {
                    id: comment.author._id,
                    fullName: comment.author.fullName
                }
            })) : [],
            mediaUrl: post.mediaUrl || '',
            mediaType: post.mediaType || '',
            mediaData: post.mediaData || ''
        }));

        res.json(formattedPosts);
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create post
router.post('/', auth, async (req, res) => {
    try {
        const { content, mediaData, mediaType } = req.body;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ error: 'Post content is required' });
        }

        const post = new Post({
            content: content.trim(),
            author: req.user._id,
            mediaData: mediaData || '',
            mediaType: mediaType || ''
        });

        await post.save();
        await post.populate('author', 'fullName');

        res.status(201).json({
            id: post._id,
            content: post.content,
            createdAt: post.createdAt,
            author: {
                id: post.author._id,
                fullName: post.author.fullName
            },
            mediaData: post.mediaData,
            mediaType: post.mediaType
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Like/Unlike post
router.post('/:postId/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const likeIndex = post.likes ? post.likes.indexOf(req.user._id) : -1;

        if (likeIndex > -1) {
            // Unlike
            post.likes.splice(likeIndex, 1);
        } else {
            // Like
            if (!post.likes) post.likes = [];
            post.likes.push(req.user._id);
        }

        await post.save();

        res.json({
            liked: likeIndex === -1,
            likeCount: post.likes ? post.likes.length : 0
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add comment to post
router.post('/:postId/comments', auth, async (req, res) => {
    console.log('Add comment route hit:', req.params.postId, req.body);
    try {
        const { content } = req.body;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ error: 'Comment content is required' });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comment = {
            content: content.trim(),
            author: req.user._id
        };

        if (!post.comments) post.comments = [];
        post.comments.push(comment);
        await post.save();
        await post.populate('comments.author', 'fullName');

        const newComment = post.comments[post.comments.length - 1];

        res.status(201).json({
            id: newComment._id,
            content: newComment.content,
            createdAt: newComment.createdAt,
            author: {
                id: newComment.author._id,
                fullName: newComment.author.fullName
            }
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get comments for a post
router.get('/:postId/comments', auth, async (req, res) => {
    console.log('Get comments route hit:', req.params.postId);
    try {
        const post = await Post.findById(req.params.postId)
            .populate('comments.author', 'fullName');

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comments = post.comments ? post.comments.map(comment => ({
            id: comment._id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: {
                id: comment.author._id,
                fullName: comment.author.fullName
            }
        })) : [];

        res.json(comments);
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update post
router.put('/:postId', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this post' });
        }

        post.content = content.trim();
        await post.save();
        await post.populate('author', 'fullName');

        res.json({
            id: post._id,
            content: post.content,
            createdAt: post.createdAt,
            author: {
                id: post.author._id,
                fullName: post.author.fullName
            }
        });
    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete post
router.delete('/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(req.params.postId);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Debug route to catch all unmatched requests
router.use('*', (req, res) => {
    console.log('Unmatched route:', req.method, req.originalUrl);
    res.status(404).json({ error: 'Route not found' });
});

export default router; 