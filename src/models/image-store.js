import { v2 as cloudinaryV2 } from "cloudinary"; // Preferred import for v2
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};

if (credentials.cloud_name && credentials.api_key && credentials.api_secret) {
  cloudinaryV2.config(credentials);
  console.log("Cloudinary configured using v2.");
} else {
  console.error("CRITICAL: Cloudinary credentials missing or incomplete. Check .env and environment variable names.");
}

export const imageStore = {
  getAllImages: async function () {

    if (!credentials.cloud_name) return [];
    const result = await cloudinaryV2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imageBuffer) {
    if (!credentials.cloud_name) {
        console.error("Cloudinary not configured. Cannot upload image.");
        return null;
    }


    if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
      console.warn("uploadImage: Invalid or empty buffer provided. Will not upload.");
      return null;
    }

    console.log(`uploadImage: Valid buffer received (length: ${imageBuffer.length}). Attempting upload...`);
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinaryV2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload stream error:", error);
            reject(error);
          } else if (result && result.url) {
            console.log("Cloudinary upload successful. URL:", result.url);
            resolve(result.url);
          } else {

            console.error("Cloudinary upload failed without an explicit error object or result.url. Full result:", result);
            reject(new Error("Cloudinary upload failed: No URL returned."));
          }
        }
      );
      Readable.from(imageBuffer).pipe(uploadStream);
    });
  },

  deleteImage: async function (publicId) { 
    if (!credentials.cloud_name) {
        console.error("Cloudinary not configured. Cannot delete image.");
        return;
    }
    if (!publicId) {
      console.warn("deleteImage: No publicId provided.");
      return;
    }
    try {
      console.log(`deleteImage: Attempting to delete image with public_id: ${publicId}`);
      await cloudinaryV2.uploader.destroy(publicId, {});
      console.log(`deleteImage: Successfully deleted image with public_id: ${publicId}`);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }
};