import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://kalaichandran:kalai@cluster0.p1jof.mongodb.net/tomato-food-app?retryWrites=true&w=majority"
    )
    .then(() => console.log("Mongodb connected"));
};
