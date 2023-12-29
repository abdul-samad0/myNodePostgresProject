const { TvShows } =  require("../models/tvShowsModel");
const { GenreMovie} =require("../models/genreModel");
const {allowedTypes} = require("./staticValues/staticValuesforBackend")
const { User} = require('../models/userModel');
const {mongoose } = require('mongoose');

exports.tvShowsController = async (req, res) => {

    try {
        const { type } = req.query;
        if(type && !allowedTypes.includes(type)){
            return res.status(400).json({ error: 'Invalid type parameter. Allowed values: Airing Today, Popular, Top Rated, On The Air' })
        }
        const query = type ? { type } : {};
        const tvshows = await TvShows.find(query)

        res.send(tvshows);
    } catch (error) {
        console.error(`Failed to fetch TvShows: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.tvShowsGenreController =async (req,res) => {
try {
    const {name} =req.query;

    if (!name){
        const allTvshows=await TvShows.find();
        return res.status(200).json(allTvshows);
    }
    const genre =await GenreMovie.findOne({name});

    if(!genre){
        return res.status(404).json({ error: 'Genre not found' });
    }
    const getTvShowsByGenre =await TvShows.find({genre_ids:genre.id});
    if (getTvShowsByGenre.length===0){
        return res.status(404).json({ error: `Not Found Tv Shows of ${name}` });
    }
    else{
        res.json(getTvShowsByGenre);
    }
     
} catch (error) {
    console.error(`Failed to fetch TV Shows by Genre: ${error.message}`);
    res.status(500).json({ status: "error", error: 'Internal Server Error' });
}
}

exports.addTvShowsController= async (req,res)=>{
    try {
        const {userId, tvShowsId}= req.params;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(tvShowsId)) {
            return res.status(401).json({ message: 'Invalid User ID or TvShow ID. Give Valid IDs' })
        }

        const user=await User.findById(userId);
        const tvshows=await TvShows.findById(tvShowsId);

        if(!user){
            return res.status(401).json({ message:"User Not Found!" });
        }
        if(!tvshows){
            return res.status(401).json({message:"TvShow not Found"});
        }
        if (user.likedTvShows.includes(tvshows._id)) {
            return res.status(409).json({message:'This TvShow has already been added'});
        }
        else{
            user.likedTvShows.push(tvshows)
            await user.save();
            res.status(200).json({message:"Tv Show add to User List", tvshows})
        }
    
    } catch (error) {
        console.error(`Failed to add movie: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.removeTvShowsController= async (req, res)=>{
    try {
        const {userId, tvShowsId}= req.params;
        const user=await User.findById(userId);
        const tvshows=await TvShows.findById(tvShowsId);
        if(!user){
            return res.status(401).json({ message:"User Not Found!" });
        }
        if(!tvshows){
            return res.status(401).json({message:"TvShow not Found"});
        }
        if (!user.likedTvShows.includes(tvshows._id)) {
            return res.status(409).json({message:'This TvShow has not been Found'});
        }
        else {
            user.likedTvShows.pull(tvshows)
            await user.save();
            res.status(200).json({message:"Tv Shows Removed from User List", tvshows})
        }
    
    } catch (error) {
        console.error(`Failed to Removed movie: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
    }
}