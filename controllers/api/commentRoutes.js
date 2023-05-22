const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');

//IMPORT Comment & Post MODELS
const { Comment } = require('../../models');

// GET ALL COMMENTS
//WORKS
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET COMMENT BY ID
//WORKING
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//POST COMMENT
//WORKING
router.post('/', withAuth, async (req, res) => {
    try {
        const { comment_text } = req.body;
        const user_id = req.session.user_id;
        const post_id = req.params.post_id;

        const newComment = await Comment.create({
            comment_text,
            post_id,
            user_id,
        });

        res.status(201).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//DELETE COMMENT
//WORKING
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedComment) {
            res.status(404).json({ message: 'This comment was not found' });
            return;
        }
        res.status(200).json({ message: 'Comment was deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
