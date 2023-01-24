import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from 'dotenv';
import { multer } from 'multer';
config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleUploadImage = async (image: string, folder: string) => {
  if (image !== '') {
    return await cloudinary.uploader.upload(image, {
      upload_preset: folder,
    });
  }
};

export default { cloudinary, handleUploadImage };
