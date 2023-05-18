const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// const commentRoutes = require('./')

// http:localhost:3001/api/users
router.use('/users', userRoutes);
// http:localhost:3001/api/posts
router.use('/posts', postRoutes);

//USE THIS LINK FOR COMMENTS WHEN COMMENTS ARE MADE
// router.use('/comments');

module.exports = router;