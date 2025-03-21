import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  name: String,
  latitude: String,
  longitude: String,
  locationDescription: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
