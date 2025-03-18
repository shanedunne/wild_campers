import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
    categoryName: String,
});

export const Category = Mongoose.model("Category", categorySchema);
