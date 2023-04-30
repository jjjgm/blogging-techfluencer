const sequelize = require ('../config/connection.js')

// IMPORT MODELS
const Post = require('./post');
const User = require('./user');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

// EXPORT MODELS
module.exports = { User, Post } 