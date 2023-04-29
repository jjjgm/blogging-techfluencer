// REQ SEQUELIZE WHICH IS IN CONFIG/CONNECTION FILE
const sequelize = require ('../config/connection');

// USER MODEL & SEED DATA
const { User } = require ('../models/user')
const { Post } = require ('../models/post')
const userData = require ('../seeds/userSeed.json')


//FUNCTION TO BEGIN TO SEED DATA
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //CREATE MORE USERS IN DB - W/ HASHED PW
    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

// SEEDS DB
seedDatabase();