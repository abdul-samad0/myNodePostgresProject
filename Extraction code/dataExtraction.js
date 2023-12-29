// const express = require("express");
// const mongoose = require('mongoose');
// const axios = require('axios');
// const dotenv = require("dotenv");
// const { Movies } = require("./models/moviesModel");
// const { GenreMovie } = require("./models/genreModel");
// const { TvShows } = require("./models/tvShowsModel");

// const app = express();
// dotenv.config();

// const MongoDb_Connection = process.env.DB_CONNECTION;
// const PORT = process.env.PORT;
// const API = process.env.API_KEY;

// mongoose.connect(MongoDb_Connection);

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDb is failed to Connect"))
// db.once('open', () => {
//     console.log("  MongoDB  is connect Successfully");
// })

// async function fetchandstore(url, collection, typeOfMovie) {
//     try {
//         const response = await axios.get(url);
//         const movies = response.data.results;
//         console.log(response);

//         const moviesType=movies.map((movie)=>({
//             ...movie,
//             type:typeOfMovie,
//     }))

//         await collection.insertMany(moviesType);
//         console.log(`Data stored for the ${moviesType}`);
//     }
//     catch (error) {
//         console.error(`Error fetching or storing data: ${error.message}`);
//     }
// }


// app.get('/populateMovies', async (res, req) => {

//     try {
//         await fetchandstore('https://api.themoviedb.org/3/movie/upcoming?api_key=2e4fcfa9d62eb3540cd75c8673bac45c', Movies, "Upcoming");
//         await fetchandstore('https://api.themoviedb.org/3/movie/top_rated?api_key=2e4fcfa9d62eb3540cd75c8673bac45c', Movies, "Top Rated");
//         await fetchandstore('https://api.themoviedb.org/3/movie/popular?api_key=2e4fcfa9d62eb3540cd75c8673bac45c', Movies, "Popular");
//         await fetchandstore('https://api.themoviedb.org/3/movie/now_playing?api_key=2e4fcfa9d62eb3540cd75c8673bac45c', Movies, "Now Playing");

//         console.log("Successfully populate the data");
//     } catch (error) {
//         console.error(`Failed Populate the data ${error.message}`);
//     }
// })


// async function genrePopulate(url, collection) {
//     try {
//         const response = await axios.get(url);
//         const genres = response.data.genres;
//         for(let tvgenre of genres){
//             const exited=await collection.findOne({id:tvgenre.id})
//             if(!exited){
//                 await collection.create(tvgenre);
//             }
//             else{
//                 console.log(`Already Present in DataBase ${tvgenre}`);
//             }
//         }

//         console.log("Successfully Upload the Genre", genres)
//     }
//     catch (error) {
//         console.log(`Failed to upload the Genre ${error.message}`)
//     }

// }

// app.get('/genrePopulate', async (req, res) => {
//     try {

//         await genrePopulate("https://api.themoviedb.org/3/genre/tv/list?api_key=2e4fcfa9d62eb3540cd75c8673bac45c", GenreMovie);

//         console.log("Successfully Upload the Genre" );
//     }
//     catch (error) {
//         console.error(`Did not Upload the Genre ${error.message}`);
//     }
// })


// app.get("/movies/titles", async (req, res) => {
//     try {
//         const upcoming = await UpcomingMovie.find({}, 'original_title');
//         const topRated = await TopRatedMovie.find({}, 'original_title');
//         const popular = await UpcomingMovie.find({}, 'original_title');
//         const nowplaying = await NowPlayingMovie.find({}, 'original_title');
//         console.log(nowplaying);

//         const allMovies = [...upcoming, ...topRated, ...popular, ...nowplaying];
//         const movieTitles = allMovies.map((movie) => movie.original_title)
//         res.json({ movieTitles });
//         console.log("Successfully get and showing the data");

//     } catch (error) {
//         console.log(`Failed to fetcht he data ${error.message}`);
//     }
// })

// async function fetchAndStoreTvShows(url, collection, typeOfTvshows) {
//    try {
//     const response = await axios.get(url);
//     const tvShows = response.data.results;

//     const tvShowsType = tvShows.map((tvshow) => ({
//         ...tvshow,
//         type: typeOfTvshows
//     }))

//     await collection.insertMany(tvShowsType);

//     console.log(`Successfully Upload Data ${tvShowsType}`);

//    } catch (error) {
//     console.error(`Failed to Upload data ${error.message}`);
//    }
    
// }

// app.get("/populateTvshows", async (req, res) => {
//     try {
//         await fetchAndStoreTvShows("https://api.themoviedb.org/3/tv/airing_today?api_key=2e4fcfa9d62eb3540cd75c8673bac45c&page=2", TvShows, "Airing Today")
//         await fetchAndStoreTvShows("https://api.themoviedb.org/3/tv/on_the_air?api_key=2e4fcfa9d62eb3540cd75c8673bac45c&page=2", TvShows, "On The Air")
//         await fetchAndStoreTvShows("https://api.themoviedb.org/3/tv/popular?api_key=2e4fcfa9d62eb3540cd75c8673bac45c&page=2", TvShows, "Popular")
//         await fetchAndStoreTvShows("https://api.themoviedb.org/3/tv/top_rated?api_key=2e4fcfa9d62eb3540cd75c8673bac45c&page=2", TvShows, "Top Rated")
   
//         console.log("Successfully Uploaded the Tvshows");
//     } catch (error) {
//         console.error(`Failed to Call Fetch And Store Function ${error.message}`);
//     }
// })

// app.get('/', (req, res) => {
//     res.send("Hello World");
// })

// app.listen(2000, () => {
//     console.log("Server is running on port 2000")
// })


