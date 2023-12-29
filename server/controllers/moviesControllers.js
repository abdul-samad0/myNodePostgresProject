const { Movies } = require('../models/moviesModel')
const { GenreMovie } = require('../models/genreModel');
const { User } = require('../models/userModel');
const { allowedTypes } = require("./staticValues/staticValuesforBackend");

const { mongoose } = require('mongoose');

exports.moviesController = async (req, res) => {

    try {
        const { type } = req.query;

        if (type && !allowedTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid type parameter. Allowed values: Upcoming, Popular, Top Rated, Now Playing' })
        }
        const query = type ? { type } : {};
        const movies = await Movies.find(query)

        res.send(movies);
    } catch (error) {
        console.error(`Failed to fetch Movies: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.moviesGenreController = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const allMovies = await Movies.find();
            return res.status(200).json(allMovies);
        }
        const genre = await GenreMovie.findOne({ name });

        if (!genre) {
            return res.status(404).json({ error: 'Genre not found. Give the Right Genre' });
        }

        const getMoviebyGenre = await Movies.find({ genre_ids: genre.id });
        if (getMoviebyGenre.length === 0) {
            return res.status(404).json({ error: `Not Found Movie of ${name}` });
        }
        else {
            res.json(getMoviebyGenre);
        }

    } catch (error) {
        console.error(`Failed to fetch Movie by Genre: ${error.message}`);
        res.status(500).json({ status: "error", error: 'Internal Server Error' });
    }
}

exports.addMoviesController = async (req, res) => {

    try {


        const { userId, movieId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(401).json({ message: 'Invalid User ID or Movie ID. Give Valid IDs' })
        }

        const user = await User.findById(userId);
        const movie = await Movies.findById(movieId);
        if (!user) {
            return res.status(401).json({ message: "User Not Found!" });
        }

        if (!movie) {
            return res.status(401).json({ message: "Movie not Found" });
        }

        if (user.likedMovie.includes(movie._id)) {
            return res.status(409).json({ message: 'This Movie has already been added' });
        }
        else {
            user.likedMovie.push(movie)
            await user.save();
            res.status(200).json({ message: "Movie add to User List", movie })
        }



    } catch (error) {
        console.error(`Failed to add movie: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.removeMoviesController = async (req, res) => {

    try {
        const { userId, movieId } = req.params;
        const user = await User.findById(userId);
        const movie = await Movies.findById(movieId);
        if (!user) {
            return res.status(401).json({ message: "User Not Found!" });
        }
        if (!movie) {
            return res.status(401).json({ message: "Movie not Found" });
        }

        if (!user.likedMovie.includes(movie._id)) {
            return res.status(409).json({ message: 'This Movie has not been Found' });
        } else {
            user.likedMovie.pull(movie)
            await user.save();
            res.status(200).json({ message: "Movie Removed from User List", movie })
        }

    } catch (error) {
        console.error(`Failed to Remove movie: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

