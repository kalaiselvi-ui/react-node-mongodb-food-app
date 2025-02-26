import express from "express";
import {
  addFood,
  editFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
const foodRouter = express.Router();

foodRouter.post("/add", addFood);

foodRouter.get("/list", listFood);

foodRouter.put("/edit", editFood);

foodRouter.post("/remove", removeFood);

export default foodRouter;
