import {v2 as cloudinary} from "cloudinary";
import fs from "fs"    //File system of node


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        //Upload file
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "Gmail"
        })
        console.log("File is uploaded on cloudinary", res.url);
        fs.unlinkSync(localFilePath);
        return res;
    }catch(error){
        console.error("Cloudinary Upload Error: ", error);
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)   //Delete the locally saved file as the upload operation got faile
        }
        return null;
    }
}

const deleteImage = async(imageUrl)=>{
    try {
        if(!imageUrl){
            return res.status(400).json({message: "Image URL is required", success: false});
        }
        // Extract Public ID from the URL
        const urlParts = imageUrl.split("/");
        const fileName = urlParts.pop().split(".")[0];  //Extract file name without extension
        const folder = urlParts.slice(-2, -1)[0];       // Extract folder if available
        
        const publicId = folder ? `${folder}/${fileName}` : fileName;  //publicID = folder/filename (if folder exist) else publicID = filename

        // Delete image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        return new res.status(200).json({message : "Image Deleted Successfully", success: true, result: result});
        
    } catch (error) {
        console.error("Deletion of file failed: ", error);
        throw error;
    }
}

export {uploadCloudinary, deleteImage};