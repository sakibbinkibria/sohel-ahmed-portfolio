// netlify/functions/deleteImage.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "CLOUDINARY_CLOUD_NAME",
  api_key: "CLOUDINARY_API_KEY",
  api_secret: "CLOUDINARY_API_SECRET",
});

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { public_id } = JSON.parse(event.body);
    await cloudinary.uploader.destroy(public_id);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
