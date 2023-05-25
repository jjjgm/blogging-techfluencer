const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const format_date = require('../utils/helpers');

const { Post, User, Comment } = require('../models')



//POSTS WOULD BE HOMEPAGE
//HOMEPAGE
router.get('/', async (req, res) => {
    try {
        const post = await Post.
            findAll({
                include: [{ model: User }, { model: Comment }]
            });
        const postData = post.map((Post) => Post.get({
            plain: true
        }));

        res.render('homepage', { logged_in: req.session.logged_in, posts: postData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//SIGN UP
//WORKS
router.get('/signup', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//LOGIN
//WORKS
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});


//SINGLE POST
//WORKS
router.get('/post/:id', async (req, res) => {
    // try {
    const postData = await Post.findByPk(req.params.id,
        {
            include:
                [{ model: User }, { model: Comment }],
        });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('post', {
        ...post,
        comments: post.comments,
        logged_in: req.session.logged_in
    });
});


// DASHBOARD
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const myDashboard = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Post },
                { model: Comment }
            ],
        });
        const user = myDashboard.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;