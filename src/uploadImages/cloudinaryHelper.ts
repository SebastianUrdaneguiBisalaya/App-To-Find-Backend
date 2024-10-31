import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/config';

const { 
  CLOUDINARY_API_KEY, 
  CLOUDINARY_API_SECRET, 
  CLOUDINARY_CLOUD_NAME 
} = config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export async function handleUpload(fileBuffer: Buffer): Promise<CloudinaryResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result as CloudinaryResponse); 
    });

    uploadStream.end(fileBuffer);
  });
}
