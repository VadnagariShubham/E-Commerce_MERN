const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name:"dmkc0mq5j",
    api_key:"322335454695747",
    api_secret:"oKFtMNBYv-zEkLDJUBLd9i9Ux5E",
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto",
    });

    return result;
}

const upload = multer({storage});

module.exports= {upload,ImageUploadUtil};