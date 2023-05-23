const express = require('express');
const router = express.Router();
//IMPORT ALL MODELS
const { User } = require('../../models')

//GET ALL USERS
//WORKS
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET BY ID
//WORKS
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'User was not found' });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//CREATE NEW USER
// WORKS
// http://localhost:3001/api/users/
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
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

//DELETE USER BY ID
//WORKS
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletedUser) {
            res.status(404).json({ message: 'That user was not found. Please enter a valid User id' });
            return;
        }
        res.status(200).json({ message: 'User was deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN USER SESSION
// http://localhost:3001/api/users/login
router.post('/login', async (req, res) => {
    console.log(req.body)
    // try {
    const users = await User.findOne({
        where: {
            username: req.body.username
        }
    });

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
    req.session.save(() => {
        req.session.logged_in = true;
        req.session.username = users.username;
        req.session.user_id = users.id;

        res.json({ user: users, message: 'Login successful' });
    });
    // } catch (err) {
    //     res.status(400).json(err);
    // }
});

//SIGN UP
//http://localhost:3001/api/users/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password)
        if (password.length < 8) {
            throw new Error('Password is too short')
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user, message: 'A new User was created successfully' });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
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
