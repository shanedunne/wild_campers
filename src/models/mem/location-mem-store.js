import { v4 } from "uuid";

let locations = [];

export const locationtMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(location) {
    location._id = v4();
    locations.push(location);
    return location;
  },

  async getLocationsByCategoryId(id) {
    return locations.filter((location) => location.categoryId === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async deleteLocationById(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },
};
