// REQ SEQUELIZE WHICH IS IN CONFIG/CONNECTION FILE
const sequelize = require ('../config/connection');

// USER MODEL & SEED DATA
const { User, Post, Comment } = require('../models')
const userData = require ('../seeds/userSeed.json')
const postData = require ('../seeds/postSeed.json');
const commentData = require ('../seeds/commentSeed.json');


//FUNCTION TO BEGIN TO SEED DATA
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //CREATE MORE USERS IN DB - W/ HASHED PW
    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // CREATE POSTS
    const post = await Post.bulkCreate(postData, {
        returning: true,
        ignoreDuplicates: true,
    });
    // CREATE COMMENTS
    const comment = await Comment.bulkCreate(commentData, {
        returning: true,
    });

    process.exit(0);
};

// SEEDS DB
seedDatabase();