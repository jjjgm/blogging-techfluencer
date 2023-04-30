const router = require ('express').Router();

// ALL API FOLDER ROUTES  WILL BEGIN W /API
// ALL HOME / DASHBOARD ROUTES WILL BEGIN W /
const apiRoutes = require ('./api')
const homeRoutes = require ('./')

router.use( './api' , apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
