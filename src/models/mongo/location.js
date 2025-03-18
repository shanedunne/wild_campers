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
});

export const Location = Mongoose.model("Location", locationSchema);
