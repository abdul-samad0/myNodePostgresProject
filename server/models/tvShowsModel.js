const mongoose=require("mongoose");

const tvShowsSchema= new mongoose.Schema({
    type: {type:String, required:true},
    original_name:{type:String, required :false},
    original_language:{type:String, required :true},
    overview:{type:String, required :false},
    poster_path:{type:String, required :true},
    backdrop_path:{type:String, required:false},
    genre_ids:{type:[Number], required:true}
})
const TvShows=mongoose.model("Tvshows", tvShowsSchema);

module.exports={
    TvShows
}