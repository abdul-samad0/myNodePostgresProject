const mongoose=require("mongoose");

const movieSchema= new mongoose.Schema({
    type: {type:String, required:true},
    original_title:{type:String, required :true},
    original_language:{type:String, required :true},
    overview:{type:String, required :false},
    poster_path:{type:String, required :true},
    backdrop_path:{type:String, required:false},
    genre_ids:{type:[Number], required:true}
})

const Movies=mongoose.model("Movies", movieSchema)

module.exports={
    Movies
}