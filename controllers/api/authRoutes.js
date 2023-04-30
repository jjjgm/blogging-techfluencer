const express = require('express');
const router = express.Router();
const db = require('../../models');

//SIGN UP






//LOGIN
router.get('/landing', (req, res) => {
    res.render('auth/login');
});



//EXPORT 
module.exports = router;