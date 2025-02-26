import userModel from "../models/userModel.js";

//Add Items to user Cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    console.log(userData, "cart data");
    console.log(req.body);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // let cartData = await userData.cartData;
    let cartData = { ...userData.cartData };
    console.log(cartData, "item");

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Failed to Add" });
  }
};

//remove Items from user Cart
const removeFromCart = async (req, res) => {
  try {
    // 🔹 Step 1: Find the user in the database
    let userData = await userModel.findOne({ _id: req.body.userId });

    // 🔹 Step 2: Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 🔹 Step 3: Clone the cart data
    let cartData = { ...userData.cartData };

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Error" });
  }
};

//Get Cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "error" });
  }
};

export { addToCart, getCart, removeFromCart };
