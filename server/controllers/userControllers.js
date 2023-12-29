const {User} =require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateToken, authenticate}=require("../authmiddleware/auth")


exports.userRegister =async (req, res) => {
    const { email, password } = req.body;

    try {
       
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        // Email dupication check 
        const duplicateEmail = await User.findOne({email})
        if (duplicateEmail) {
            return res.status(409).json({ status:'conflict',message:"This email is already in use"});
        }
        const hashpassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashpassword,
        })
        res.json({ status: 'ok', message: "User created" })
    }
    catch (error) {
        res.status(400).json({
            status: 'error', message: error.message
        });
    }
}

exports.userLogin =async(req, res)=>{
    const{email, password}=req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }
        const user=await User.findOne({email});
        if(user && bcrypt.compareSync(password,user.password )){
            const token=generateToken(user._id);
            console.log(token);
            res.status(200).json({ status: 'ok', message: "User Found", token:token })
        }
        else{
            return   res.status(401).json({message: "User Does not match" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error', message: error.message
        })
    }
}