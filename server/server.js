import cloudinary from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "./config/db.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoutes.js";

// App Config
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
// ✅ Apply `express-fileupload` first before other middleware
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// ✅ Apply JSON and CORS Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to Database
connectDB();

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.post("/test-upload", (req, res) => {
  console.log("🔥 Files:", req.files);
  res.json({ receivedFiles: req.files || "No files received" });
});

app.listen(port, () => {
  console.log(`🔥 App is running on ${port}`);
});
