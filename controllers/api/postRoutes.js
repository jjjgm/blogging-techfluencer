const express = require('express');
const router = express.Router();
//IMPORT ALL MODELS
const { Post } = require('../../models')


//CREATE A NEW BLOGPOST
router.post('/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            blog: req.body.blog,
            user_id: req.session.user.id
        });
        // res.redirect(`/dashboard/${newPost.id}`);
    } catch (err) {
        // res.redirect(`/login`)
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;