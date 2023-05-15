const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    blog: {
        type: DataTypes.TEXT,
        validate : {
            //MIN OF 20 and MAX of 6000 CHAR
            len: [20, 6000]
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: 'post'
}
);

// EXPORT MODEL TABLE POST
module.exports = Post;