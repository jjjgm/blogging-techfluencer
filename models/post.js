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
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    blog: {
        type: DataTypes.TEXT,
        validate : {
            //MIN OF 20 and MAX of 10000 CHAR
            len: [20, 10,000]
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'post'
}
)

module.exports = Post ;