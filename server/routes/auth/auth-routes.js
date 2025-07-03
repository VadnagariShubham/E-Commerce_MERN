const express = require("express");
const router = express.Router();
const {registerUser,loginUser,logoutUser,authMiddleware} = require("../../controllers/auth/auth-controller")

// router.post("/register",registerUser); ana lidhe error aavti hati jordar
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/cheak-auth").get(authMiddleware,(req,res)=>{
    const user = req.user;

    res.status(200).json({
        success:true,
        message:"Authentcated user!",
        user,
    });
});

module.exports = router;