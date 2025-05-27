import { Location } from "./location.js";
import { imageStore } from "../image-store.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().populate("categoryId").populate("userId").lean();
    return locations;
  },

  async addLocation(location, userCredentials) {
    const imageUrls = [];

    if(location.locationImage) {
      const imageFiles = Array.isArray(location.locationImage) ? location.locationImage : [ location.locationImage];
  
      for (const imageBuffer of imageFiles){
        if (Buffer.isBuffer(imageBuffer) && imageBuffer.length > 0){
          try {
            const url = await imageStore.uploadImage(imageBuffer);
            if(url){
              imageUrls.push(url);
            }
          } catch (error) {
            console.error("failed to upload image", error);
          }
        }
      }
    }
    const newLocationData = {
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      locationDescription: location.locationDescription,
      categoryId: location.categoryId,
      userId: userCredentials._id,
      locationImages: imageUrls,
      accessibleByVehicle: location.accessibleByVehicle || false,
      petFriendly: location.petFriendly || false,
      swimming: location.swimming || false,
      hiking: location.hiking || false,
      closeToTown: location.closeToTown || false,
      greatViews: location.greatViews || false,
    };
    const newLocation = new Location(newLocationData);
    const savedLocation = await newLocation.save();
    return savedLocation.toObject();
  },

  async getLocationsByCategoryId(id) {
    const locations = await Location.find({ categoryId: id }).lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updatelocation(location, updatedlocation) {
    const locationDoc = await Location.findOne({ _id: location._id });
    locationDoc.name = updatedlocation.name;
    locationDoc.latitude = updatedlocation.latitude;
    locationDoc.longitude = updatedlocation.longitude;
    locationDoc.locationDescription = updatedlocation.locationDescription;
    locationDoc.img = updatedlocation.img;
    await locationDoc.save();
  },
};