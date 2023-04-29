const sequelize = require ('../config/connection.js')

const { Post } = require ('./post')
const { User } = require ('./user')

Post.belongsTo(User, {
    foreignKey: 'username'
});

User.hasMany(Post, {
    foreignKey: 'username'
});

module.exports = { User, Post }