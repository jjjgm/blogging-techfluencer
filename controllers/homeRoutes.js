const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
// IMPORT ALL MODELS WITH OWN VAR NAME AS A CONST
const db = require ('../models')


//SIGN UP
router.get('/signup', async (req, res) => {
    if (req.session.logeed_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


//LOGIN
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//HOMEPAGE
router.get('/', async (req, res) => {
    try {
        const userData = await db.User.findByPk({
            include: [ attributes ['username'] ]
        });
        res.render('homepage', {logged_in: req.session.logeed_in});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//DASHBOARD VIEW
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const myDashboard = await db.Post.findAll({
            include: [{ model: db.User, attributes: ['username'] }]
        });
        // GET POSTS TO DASHBOARD
        const posts = myDashboard.map((post) => post.get({ plain: true }));
    // RENDER DASHBOARD WHEN LOGGED IN
    res.render('dashboard', { posts, logged_in: req.session.logged_in, username: req.session.username });
} catch (err) {
    console.log(err)
    res.status(500).json(err);
}
});


//GET ALL USERS
router.get('/users', async (req, res) => {
    try {
        const users = await db.User.findAll({
            username: req.body.username
        });
        res.render(`/homepage`);
    } catch (err) {
        res.redirect(`/login`)
    }
});


//GET ALL POSTS
router.get('/posts', async (req, res) => {
    try {
        const post = await db.Post.findAll({
            title: req.body.title,
            blog: req.body.blog,
        });
        res.render(`/dashboard`);
    } catch (err) {
        res.redirect(`/login`)
    }
});

//GET ALL COMMENTS


module.exports = router;