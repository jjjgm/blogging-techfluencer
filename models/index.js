const sequelize = require ('../config/connection.js')

// IMPORT MODELS
const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// EXPORT MODELS
module.exports = { User, Post, Comment } 