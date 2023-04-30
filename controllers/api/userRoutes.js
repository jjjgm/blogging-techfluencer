const router = require('express').Router();
const { User } = require('../../models/user');
const { Post } = require('../../models/post');


// GET USER'S BLOGPOSTS BY ID
router.get('/api/users/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user.id, {
            include: [{ model: Post }]
        });
        const user = userData.get({ plain: true })
        //GET 200 FIRST THEN RENDER
        // res.render('dashboard', { user });
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
    });
