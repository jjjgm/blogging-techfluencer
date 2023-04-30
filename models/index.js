const sequelize = require ('../config/connection.js')

const Post = require('./post');
const User = require('./user');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

module.exports = { User, Post } 