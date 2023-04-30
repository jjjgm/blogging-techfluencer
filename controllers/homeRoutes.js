const express = require('express');
const router = express.Router();


const db = require ('../models')



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