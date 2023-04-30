const express = require('express');
const router = express.Router();

router.use('/users');
router.use('/posts');
//USE THIS LINK FOR COMMENTS WHEN COMMENTS ARE MADE
// router.use('/comments');

module.exports = router;