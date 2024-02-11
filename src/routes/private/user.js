const express = require('express');
const router = express.Router();

const DATA_USER_DB = require('../../models/user');
const authenticate = require('../../middleware/auth')

router.use(authenticate)
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await DATA_USER_DB.find();
        const userToken = req.user.name
        res.status(200).json({
            user: userToken,
            status: 200,
            users
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await DATA_USER_DB.findById(req.params.id);
        const userToken = req.user.name
        res.status(200).json({
            access: userToken,
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const userToken = req.user.name
        const user = await DATA_USER_DB.create(req.body);
        res.status(200).json({
            access: userToken,
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    try {
        const userToken = req.user.name
        const user = await DATA_USER_DB.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            access: userToken,
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const userToken = req.user.name
        const user = await DATA_USER_DB.findByIdAndDelete(req.params.id);
        res.status(200).json({
            access: userToken,
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
})








router.get('/:id/posts', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        const userToken = req.user.name;
        const user = await DATA_USER_DB.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'Usuario no encontrado'
            });
        }

        const posts = user.posts || [];

        res.status(200).json({
            access: userToken,
            status: 200,
            posts
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.get('/:userId/posts/:postId', authenticate, async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const userToken = req.user.name;
        const user = await DATA_USER_DB.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'Usuario no encontrado'
            });
        }
        const post = user.posts.find(post => post._id == postId);

        if (!post) {
            return res.status(404).json({
                status: 404,
                error: 'Post no encontrado'
            });
        }

        res.status(200).json({
            access: userToken,
            status: 200,
            post
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.post('/:id/post', authenticate, async (req, res) => {
    try {
        const userToken = req.user.name;
        const { title, content, media } = req.body;

        const newPost = {
            title,
            content,
            ...(media && { media }),
            timestamp: new Date(),
            likes: [],
            comments: []
        };

        const user = await DATA_USER_DB.findByIdAndUpdate(
            req.params.id,
            { $push: { posts: newPost } },
            { new: true }
        );

        res.status(200).json({
            access: userToken,
            status: 200,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});

router.delete('/:userId/posts/:postId', authenticate, async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const userToken = req.user.name;
        const user = await DATA_USER_DB.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'Usuario no encontrado'
            });
        }

        const postIndex = user.posts.findIndex(post => post._id == postId);

        if (postIndex === -1) {
            return res.status(404).json({
                status: 404,
                error: 'Post no encontrado'
            });
        }

        user.posts.splice(postIndex, 1);

        await user.save();

        res.status(200).json({
            access: userToken,
            status: 200,
            message: 'Post eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            error: error.message
        });
    }
});




module.exports = router;