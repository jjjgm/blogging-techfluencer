const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');

const { Post } = require('../../models')

//GET ALL POSTS
//WORKS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET BY ID
//WORKS
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//CREATE NEW POST
//WORKS
router.post('/', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.session.user_id;

        const newPost = await Post.create({
            title,
            content,
            user_id,
        });

        res.status(201).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//DELETE POST BY ID
//WORKS
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedPost) {
            res.status(404).json({ message: 'This post was not found' });
            return;
        }
        res.status(200).json({ message: 'Post was deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;