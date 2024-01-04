
const { allowedTypes } = require("./staticValues/staticValuesforBackend");
const { mongoose } = require("mongoose");

const { client } = require('../db');

exports.moviesController = async (req, res) => {

    try {
        const { type } = req.query;

        if (!type) {
            const result = await client.query("SELECT * FROM movies");
            return res.status(200).json({ message: "All Movies", movies: result.rows });
        }

        if (type && !allowedTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid type parameter. Allowed values: Upcoming, Popular, Top Rated, Now Playing' })
        }
        const query = type ? { type } : {};
        const movies = await client.query('SELECT * FROM movies WHERE type = $1', [type]);

        res.send(movies.rows);
    } catch (error) {
        console.error(`Failed to fetch Movies: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.moviesGenreController = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const result = await client.query("SELECT * FROM movies");
            return res.status(200).json({ message: "All Movies", movies: result.rows });
        }
        const genre = await client.query("SELECT * from genre WHERE name=$1", [name]);

        if (genre.rowCount === 0) {
            return res.status(404).json({ error: 'Genre not found. Give the Right Genre' });
        }

        const genreId = genre.rows[0].id;

        // console.log("Genre ID =", genreId);

        const getMoviebyGenre = await client.query("SELECT movie_id FROM genres_movies WHERE genre_id=$1 ", [genreId]);
        // console.log("getting the movie",getMoviebyGenre);

        if (getMoviebyGenre.rowCount === 0) {
            return res.status(404).json({ error: `Not Found Movie of ${name}` });
        }
        else {
            const moviesIDs = getMoviebyGenre.rows.map(row => row.movie_id);
            const getMovies = await client.query("SELECT * FROM movies WHERE _id=ANY($1)", [moviesIDs])
            res.json(getMovies.rows);

        }


    } catch (error) {
        console.error(`Failed to fetch Movie by Genre: ${error.message}`);
        res.status(500).json({ status: "error", error: 'Internal Server Error' });
    }
}

exports.addMoviesController = async (req, res) => {

    try {


        const { userId, movieId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(401).json({ message: 'Invalid User ID or Movie ID. Give Valid IDs' })
        }

        const user = await client.query("SELECT * FROM users WHERE id=$1", [userId]);
        const movie = await client.query("SELECT * FROM movies WHERE _id=$1", [movieId]);

        if (user.rowCount === 0) {
            return res.status(401).json({ message: "User Not Found!" });
        }

        if (movie.rowCount === 0) {
            return res.status(401).json({ message: "Movie not Found" });
        }

        const readyPresentMovie = await client.query("SELECT user_id, movie_id FROM liked_movies WHERE user_id=$1 AND movie_id=$2", [userId, movieId])

        if (readyPresentMovie.rowCount > 0) {
            return res.status(409).json({ message: 'This Movie has already been added' });
        }
        else {
            await client.query("INSERT INTO liked_movies (user_id,movie_id) VALUES($1, $2)", [userId, movieId]);
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
        const user = await client.query("SELECT * FROM users WHERE id=$1", [userId]);
        const movie = await client.query("SELECT * FROM movies WHERE _id=$1", [movieId]);

        if (user.rowCount === 0) {
            return res.status(401).json({ message: "User Not Found!" });
        }

        if (movie.rowCount === 0) {
            return res.status(401).json({ message: "Movie not Found" });
        }

        const notPresentMovie = await client.query("SELECT user_id, movie_id FROM liked_movies WHERE user_id=$1 AND movie_id=$2", [userId, movieId])

        if (notPresentMovie.rowCount === 0) {
            return res.status(409).json({ message: 'This Movie has not been Found' });
        } else {
            await client.query('DELETE FROM liked_movies WHERE user_id = $1 AND movie_id = $2',
                [userId, movieId]);

            res.status(200).json({ message: "Movie Removed from User List", movie })
        }

    } catch (error) {
        console.error(`Failed to Remove movie: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

