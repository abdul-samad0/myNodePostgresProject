const mongoose=require("mongoose");
const { Movies } = require("./moviesModel");
const {TvShows} = require('./tvShowsModel')

const userSchema= new mongoose.Schema({

    email: {type:String, required:true, trim: true, unique:true },
    password: {type:String, required:true },
    likedMovie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Movies'
    }],
    likedTvShows:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TvShows',
    }]
})
const User=mongoose.model("User", userSchema);

module.exports={
    User
}   