const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../models/user');

//reigster

const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;

    try{
        const hashPassword  = await bcrypt.hash(password,12);
        const newUser = new user ({
            username,email,password:hashPassword,
        })

        await newUser.save();
        res.status(200).json({
            success : true,
            message:'Registrstion successful'

        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:'some error occured'
        })
    }
}


//login

const login = async (req,res)=>{
    const{email,password} = req.body;

    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:'some error occured'
        })
    }


}



//logout



//auth middleware

module.exports = {registerUser};