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
    display_name: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'username'
        }
    },
    blog: {
        type: DataTypes.TEXT,
        validate : {
            //MIN OF 20 and MAX of 10000 CHAR
            len: [20, 9000]
        }
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'user',
    //         key: 'id'
    //     }
    // },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'post'
}
);

module.exports = Post ;