const express = require('express');
const router = express.Router();


// ALL API FOLDER ROUTES  WILL BEGIN W /API
// ALL HOME / DASHBOARD ROUTES WILL BEGIN W /
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// http://localhost:3001/api
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
