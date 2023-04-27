const path = require('path');
const sequelize = require('.config/connection');
const express = require('express');
const routes = require('./controllers');

//LOCAL SERVER PORT
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync ({ force: false }).then (() => {
    Server.listen( PORT, () => console.log(`Server now listening on ${PORT}`));
});