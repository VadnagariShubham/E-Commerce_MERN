const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

//reigster

const registerUser = async(req,res)=>{
    const {userName,email,password} = req.body;

    try{
      const cheakUser = await User.findOne({email});

      if(cheakUser)
        return res.json({
       success:false,
       message:"User is already registered",

      });
        const hashPassword  = await bcrypt.hash(password,12);
        const newUser = new User ({
            userName,email,password:hashPassword,
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

const loginUser = async (req,res)=>{
    const{email,password} = req.body;

    try{
        const cheakUser = await User.findOne({email});
        if(!cheakUser) return res.json({
            success: false,
            message:"user doesn't exist Please register first"
        })

        const cheakPassword = await bcrypt.compare(password,cheakUser.password);
        if(!cheakPassword) return res.json({
            success:false,
            message:"Incorrect password"
        });

        const token = jwt.sign({
            id:cheakUser._id,
            role:cheakUser.role,
            email:cheakUser.email,
            userName:cheakUser.userName,
        },"CLIENT_SECRET_KEY",{expiresIn:"60m"})


        res.cookie("token",token,{httpOnly:true,secure:false}).json({
            success:true,
            message:"logged in successfully",
            user:{
                email:cheakUser.email,
                role:cheakUser.role,
                id:cheakUser._id,
                userName:cheakUser.userName,
            }
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:'some error occured'
        })
    }


}



//logout

const logoutUser = (req,res)=>{
    res.clearCookie("token").json({
        success:true,
        message:"logged out successfully!",
    });
};



//auth middleware

const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message:"Unauthorized user!"
    });

    try{
        const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
        req.user = decoded;
        next()
    } catch(error){
        res.status(401).json({
            success:false,
            message:"Unauthorized user!"

        });

    }
}

module.exports = {registerUser,loginUser,logoutUser,authMiddleware};