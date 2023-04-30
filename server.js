const path = require('path');
const sequelize = require('./config/connection');
const express = require('express');
const routes = require('./controllers');
const http = require('http');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//LOCAL SERVER PORT
const app = express();
const PORT = process.env.PORT || 3001;

const Server = http.createServer(app);

// SESSION STORE 
const sess = {
    secret: 'secret secret',
    cookie: {
        httpOnly: true,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// EXPRESS USE ROUTES
app.use(routes);

// START SERVER
sequelize.sync({ force: false }).then(() => {
    Server.listen(PORT, () => console.log(`Server now listening on ${PORT}`));
});