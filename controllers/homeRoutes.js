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
        findAll({include: User,
            attribute: ['username']
        });
        const postData = post.map((Post) => Post.get({
            plain: true
        }));

        res.render('homepage', { logged_in: req.session.logeed_in, post:postData, commentData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//SIGN UP
router.get('/signup', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


//LOGIN
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // res.redirect('/');
        return;
    }
    // res.render('login');
    console.log(err);
        res.status(400).json(err);
});



//DASHBOARD VIEW
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const myDashboard = await Post.findAll({
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [User] }
            ]
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



//GET ALL COMMENTS


module.exports = router;