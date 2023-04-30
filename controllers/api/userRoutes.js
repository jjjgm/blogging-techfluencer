const express = require('express');
const router = express.Router();
//IMPORT ALL MODELS
const db = require ('../../models')




//CREATE NEW USER
router.post('/', async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);

        req.session.save(()=> {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;

            res.status(200).json(newUser)
    });
} catch (err) {
    console.log(err);
    // 400 STATUS FOR UNAUTHORIZED ACCESS/AUTHENTICATION
    res.status(400).json(err);
}
});

//LOGIN USER SESSION
router.post('/login', async (req, res) => {
    try {
    const users = await db.User.findOne({ where :  {
        username: req.body.username
    } });

    if (!users) {
        res.status(400).json('Incorrect login credintials. Try again.');
        return;
    }

    const validateLogin = await users.checkPassword(req.body.password);

    if (!validateLogin) {
        //400 ERR STAT FOR UNAUTHORIZED ACCESS/AUTHENTICATION
        res.status(400).json('Incorrect password. Please input a valid password.');
        return;
    }
    req.session.save(()=> {
        req.session.logged_in = true;
        req.session.username = users.username;
        req.session.user_id= users.id;

        res.json({ user: users, message: 'Login successful' });
});
} catch (err) {
    res.status(400).json(err);
}
});


    module.exports = router;
