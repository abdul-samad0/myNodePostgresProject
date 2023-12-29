const express = require('express');
const { userRoute } = require('./routes/userRoute');
const { moviesRoute } = require('./routes/moviesRoute');
const { tvShowsRoute } = require('./routes/tvShowsRoute');

const router = express.Router();

router.use(userRoute);
router.use(moviesRoute);
router.use(tvShowsRoute);


module.exports = router;
