const express = require('express');
const router = express.Router();
//IMPORT ALL MODELS
const db = require ('../../models')



// GET USER'S BLOGPOSTS BY ID
// router.get('./users/:id', async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.params.id)
//         ;
//         const user = userData.get({ plain: true })
//         //GET 200 FIRST THEN RENDER
//         // res.render('dashboard', { user });
//         res.status(200).json({ user });
//     } catch (err) {
//         console.log(err);
//         res.json(err);
//     }
//     });

//CREATE NEW USER
router.post('/users', async (req, res) => {
    try {
        const newUser = await db.User.create({
            username: req.body.username,
            password: req.body.password,
            user_id: req.session.user.id
        });
        res.redirect(`/homepage/${newUser.id}`);
    } catch (err) {
        res.redirect(`/landing`)
    }
});



    module.exports = router;
