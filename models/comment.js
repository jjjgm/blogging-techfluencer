const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
    },
    post_id: {
        type: DataTypes. INTEGER,
        references: {
            model:'post',
            key: 'id',
        },
    },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: 'comment'
}
);

module.exports = Comment;