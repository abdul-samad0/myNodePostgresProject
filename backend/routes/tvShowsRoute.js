const express =require('express')
const { tvShowsController, tvShowsGenreController,addTvShowsController, removeTvShowsController } = require('../controllers/tvShowsControllers') 
const { authenticate } = require('../authmiddleware/auth');

const tvShowsRoute = express.Router();

tvShowsRoute.get('/tvshows', tvShowsController)
tvShowsRoute.get('/tvshows/bygenre', tvShowsGenreController)
tvShowsRoute.put('/addTvshows/:userId/:tvShowsId',authenticate, addTvShowsController)
tvShowsRoute.put('/removeTvshows/:userId/:tvShowsId',authenticate, removeTvShowsController)

module.exports = {
    tvShowsRoute
}
