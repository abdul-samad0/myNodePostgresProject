
const bcrypt = require('bcrypt');
const {generateToken, authenticate}=require("../authmiddleware/auth")
const { client } =require("../db");

exports.userRegister =async (req, res) => {
    const { email, password } = req.body;

    try {
       
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        // Email dupication check 
        const duplicateEmail = await client.query("SELECT * FROM users WHERE email=$1", [email]);
        if (duplicateEmail.rowCount>0) {
            return res.status(409).json({ status:'conflict',message:"This email is already in use"});
        }
        const hashpassword = await bcrypt.hash(password, 10);

        await client.query("INSERT INTO users (email,password) VALUES($1, $2)",[email, hashpassword])
        res.json({ status: 'ok', message: "User created" })
    }
    catch (error) {
        res.status(400).json({
            status: 'error', message: `this is ths error : ${error.message}`,
        });
    }
}

exports.userLogin =async(req, res)=>{
    const{email, password}=req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }
        const user=await client.query("SELECT * FROM users WHERE email=$1", [email]);

        if(user.rowCount>0 && bcrypt.compareSync(password,user.rows[0].password)){
            const token=generateToken(user.id);
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