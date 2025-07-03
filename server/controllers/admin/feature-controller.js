const Feature  = require("../../models/feature");

const addFeatureImages = async(req,res)=>{
    try{

        const {image} = req.body;
        const featureImages = new Feature({
            image
        })

        await featureImages.save();

        res.status(201).json({
            success : true,
            data : featureImages,
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error ocured!!!",
        });
    }
}

const getFeatureImages = async(req,res)=>{
    try{
        const images = await Feature.find()
        res.status(200).json({
            success:true,
            data:images,
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error ocured!!!",
        });
    }
}


module.exports = {addFeatureImages, getFeatureImages};