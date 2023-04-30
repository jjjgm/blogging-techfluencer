const express = require('express');
const router = express.Router();

// IMPORT ALL MODELS WITH OWN VAR NAME AS A CONST
const db = require ('..models/models')


//GET ALL USERS
router.get('/users', async (req, res) => {
    try {
        const user = await db.User.findAll({
            username: req.body.username
        });
        res.redirect(`/homepage`);
    } catch (err) {
        res.redirect(`/landing`)
    }
});


//GET ALL POSTS
router.get('/posts', async (req, res) => {
    try {
        const post = await db.Post.findAll({
            title: req.body.title,
            blog: req.body.blog,
        });
        res.redirect(`/dashboard`);
    } catch (err) {
        res.redirect(`/landing`)
    }
});

//GET ALL COMMENTS


module.exports = router;