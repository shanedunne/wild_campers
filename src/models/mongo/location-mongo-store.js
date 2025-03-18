import { Location } from "./location.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
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
    await locationDoc.save();
  },
};