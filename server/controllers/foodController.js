import cloudinary from "cloudinary";
import fs from "fs";
import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
  console.log("🔥 Request Headers:", req.headers);
  console.log("🔥 Request Body:", req.body);
  console.log("🔥 Uploaded Files:", req.files); // Debugging

  // ✅ If no file is uploaded, return an error
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      receivedBody: req.body,
      receivedFiles: req.files,
    });
  }

  const imageFile = req.files.image;
  const tempFilePath = imageFile.tempFilePath;

  if (!imageFile) {
    return res.status(400).json({
      message: "Image is required",
      receivedFiles: req.files,
    });
  }

  try {
    // ✅ Upload file to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "food_images",
      }
    );

    fs.unlinkSync(tempFilePath);

    console.log("🔥 Cloudinary Upload:", uploadResult);

    const { name, description, price, category } = req.body;

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: uploadResult.secure_url, // ✅ Store Cloudinary URL in DB
    });

    await food.save();
    res.status(200).json({ success: true, message: "Food Added", food });
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    res
      .status(500)
      .json({ success: false, message: "Fail to create Listing", error: err });
  }
};

//all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.status(200).json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: "Fail to fetch listings" });
  }
};

//remove food item

const removeFood = async (req, res) => {
  try {
    const deleteFoodItem = await foodModel.findByIdAndDelete(req.body.id);
    if (!deleteFoodItem) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Food Removed", data: deleteFoodItem });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Failed to remove Food" });
  }
};

export { addFood, listFood, removeFood };
