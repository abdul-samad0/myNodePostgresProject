const {allowedTypes} = require("./staticValues/staticValuesforBackend")
const {client } = require('../db');
const {mongoose} =require("mongoose");


exports.tvShowsController = async (req, res) => {

    try {
        const { type } = req.query;

        if (!type) {
            const result = await client.query("SELECT * FROM tvshows");
            return res.status(200).json({ message: "All TvShows", movies: result.rows });
        }

        if(type && !allowedTypes.includes(type)){
            return res.status(400).json({ error: 'Invalid type parameter. Allowed values: Airing Today, Popular, Top Rated, On The Air' })
        }
        const query = type ? { type } : {};
        const tvshows = await client.query("SELECT * FROM tvshows WHERE type=$1", [type])

        res.send(tvshows.rows);
    } catch (error) {
        console.error(`Failed to fetch TvShows: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.tvShowsGenreController =async (req,res) => {
try {
    const {name} =req.query;

    if (!name){
        const allTvshows=await client.query("SELECT * FROM tvshows")
        return res.status(200).json(allTvshows);
    }
    const genre = await client.query("SELECT id from genre WHERE name=$1", [name]);

    if(genre.rowCount===0){
        return res.status(404).json({ error: 'Genre not found' });
    }

    const genreId = genre.rows[0].id;
    const getTvShowsByGenre =await client.query("SELECT tvshow_id FROM genres_tvshows WHERE genre_id=$1 ", [genreId]);

    if (getTvShowsByGenre.rowCount===0){
        return res.status(404).json({ error: `Not Found Tv Shows of ${name}` });
    }
    else{
        const tvshowsIDs= getTvShowsByGenre.rows.map(row=>row.tvshow_id);
        const getTvshows=await client.query("SELECT * FROM tvshows WHERE _id=ANY($1)", [tvshowsIDs] )
        console.log( "Get TvShows =",getTvshows);
        res.json(getTvshows.rows);
       
    }
     
} catch (error) {
    console.error(`Failed to fetch TV Shows by Genre: ${error.message}`);
    res.status(500).json({ status: "error", error: 'Internal Server Error' });
}
}

exports.addTvShowsController= async (req,res)=>{
    try {
        const {userId, tvShowsId}= req.params;

        if ( !mongoose.Types.ObjectId.isValid(tvShowsId)) {
            return res.status(401).json({ message: 'Invalid User ID or TvShow ID. Give Valid IDs' })
        }

        const user = await client.query("SELECT * FROM users WHERE id=$1", [userId]);
        const tvshows = await client.query("SELECT * FROM tvshows WHERE _id=$1",[tvShowsId]);
        if(user.rowCount===0){
            return res.status(401).json({ message:"User Not Found!" });
        }
        if(tvshows.rowCount===0){
            return res.status(401).json({message:"TvShow not Found"});
        }

        const readyPresentTvshow = await client.query("SELECT user_id, tvshow_id FROM liked_tvshows WHERE user_id=$1 AND tvshow_id=$2",[userId, tvShowsId])
        if (readyPresentTvshow.rowCount>0) {
            return res.status(409).json({message:'This TvShow has already been added'});
        }
        else{
            await client.query("INSERT INTO liked_tvshows (user_id,tvshow_id) VALUES($1, $2)",[userId, tvShowsId]);
            res.status(200).json({message:"Tv Show add to User List", tvshows})
        }
    
    } catch (error) {
        console.error(`Failed to add movie: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

exports.removeTvShowsController= async (req, res)=>{
    try {
        const {userId, tvShowsId}= req.params;
        const user = await client.query("SELECT * FROM users WHERE id=$1", [userId]);
        const tvshows = await client.query("SELECT * FROM tvshows WHERE _id=$1",[tvShowsId]);
        if(user.rowCount===0){
            return res.status(401).json({ message:"User Not Found!" });
        }
        if(tvshows.rowCount===0){
            return res.status(401).json({message:"TvShow not Found"});
        }

        const notPresentTvshow = await client.query("SELECT user_id, tvshow_id FROM liked_tvshows WHERE user_id=$1 AND tvshow_id=$2",[userId, tvShowsId])
        if (notPresentTvshow.rowCount===0) {
            return res.status(409).json({message:'This TvShow has not been Found'});
        }
        else {
            await client.query('DELETE FROM liked_tvshows WHERE user_id = $1 AND tvshow_id = $2',
                [userId, tvShowsId]);
            res.status(200).json({message:"Tv Shows Removed from User List", tvshows})
        }
    
    } catch (error) {
        console.error(`Failed to Removed movie: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
    }
}