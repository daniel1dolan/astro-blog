import { v2 } from "cloudinary";
import fs from "fs";

export const saveImage = async (imageUrl: string, name: string) => {
  try {
    v2.config({
      cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
      api_key: import.meta.env.CLOUDINARY_API_KEY,
      api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    });

    const localPath = await fetch(imageUrl)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((buffer) => {
        fs.writeFileSync(`${name}.jpeg`, Buffer.from(buffer));
        return name + ".jpeg";
      });

    const resUpload = await v2.uploader.upload(localPath, { public_id: name });

    console.log(resUpload);
    return resUpload;
  } catch (err) {
    console.error("error saving image", err);
  }
};
