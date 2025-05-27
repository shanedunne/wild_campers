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
  locationImages: [String],
  accessibleByVehicle: Boolean,
  petFriendly: Boolean,
  swimming: Boolean,
  hiking: Boolean,
  closeToTown: Boolean,
  greatViews: Boolean,
});

export const Location = Mongoose.model("Location", locationSchema);
