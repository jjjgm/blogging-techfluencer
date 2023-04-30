const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const authRoutes = require('./authRoutes');
// const commentRoutes = require('./')

router.use('/authRoutes', authRoutes)
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

//USE THIS LINK FOR COMMENTS WHEN COMMENTS ARE MADE
// router.use('/comments');

module.exports = router;