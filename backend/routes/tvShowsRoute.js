const express =require('express')
const { tvShowsController, tvShowsGenreController,addTvShowsController, removeTvShowsController } = require('../controllers/tvShowsControllers') 
const { authenticate } = require('../authmiddleware/auth');

const tvShowsRoute = express.Router();

tvShowsRoute.get('/tvshows', tvShowsController)
tvShowsRoute.get('/tvshows/bygenre', tvShowsGenreController)
tvShowsRoute.post('/addTvshows/:userId/:tvShowsId',authenticate, addTvShowsController)
tvShowsRoute.post('/removeTvshows/:userId/:tvShowsId',authenticate, removeTvShowsController)

module.exports = {
    tvShowsRoute
}
