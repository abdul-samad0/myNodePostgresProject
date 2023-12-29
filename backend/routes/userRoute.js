const express =require('express')
const {userRegister, userLogin} =require('../controllers/userControllers')
const userRoute=express.Router();


userRoute.post('/register',userRegister);
userRoute.post('/login', userLogin )

module.exports= {
    userRoute
}