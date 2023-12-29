
const express =require('express')

const {moviesController, moviesGenreController, addMoviesController, removeMoviesController} =require('../controllers/moviesControllers')
const { authenticate } = require('../authmiddleware/auth');
const moviesRoute=express.Router();

moviesRoute.get('/movies', moviesController );
moviesRoute.get('/movies/bygenre', moviesGenreController);
moviesRoute.post('/addMovie/:userId/:movieId', authenticate, addMoviesController);
moviesRoute.post('/removeMovie/:userId/:movieId', authenticate, removeMoviesController);

module.exports={
moviesRoute
}