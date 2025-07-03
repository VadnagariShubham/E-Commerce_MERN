const { ImageUploadUtil } = require("../../helper/cloudinary");
const product = require("../../models/product");
const Product = require("../../models/product");



const handleImageUpload = async(req,res)=>{
    try{

        const b64  = Buffer.from(req.file.buffer).toString("base64");
        const url  = "data:" + req.file.mimetype + ";base64,"+b64;
        const result = await ImageUploadUtil(url);

        res.json({
            success:true,
            result,
        });

    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error occured",
        });

    }
};

//add a new product

const addProduct = async (req,res)=>{
    try{
       

        const {image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,} = req.body;

        const newlyCreatedProduct = new product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,

        })

        await newlyCreatedProduct.save();
        res.status(201).json({
            success:true,
            data:newlyCreatedProduct,
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured",

        });

    };
};

//fetch a produuct

const fetchAllProducts = async(req,res)=>{
    try{

        const listOfProducts = await product.find({});
        res.status(200).json({
            success:true,
            data:listOfProducts,
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured",

        });

    };
}


//edit a prouct

const editProduct = async(req,res)=>{
    try{

        const {id} = req.params;
        const {image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,} = req.body;
        
        let findProduct  = await product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"product not found",
             });

        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.brand = brand || findProduct.brand;
        findProduct.salePrice =  salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.image = image || findProduct.image;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({
            success:true,
            data:findProduct,
        });

        

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured",

        });

    };
}
//delete a prodduct

const deleteProduct = async(req,res)=>{
    try{

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found",
            });

        }

        res.status(200).json({
            success:true,
            message:"product successfullt deleted",
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured",

        });

    };
}



module.exports={handleImageUpload,addProduct,fetchAllProducts,deleteProduct,editProduct };