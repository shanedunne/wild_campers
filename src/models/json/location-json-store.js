import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const locationJsonStore = {
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(location) {
    await db.read();
    location._id = v4();
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  async getLocationsByPlaylistId(id) {
    await db.read();
    let locations = db.data.locations.filter((location) => location.categoryId === id);
    if(locations === undefined) {
      locations = null;
    }
    return locations;
  },

  async getLocationById(id) {
    await db.read();
    const location = db.data.locations.find((location) => location._id === id);
    if (!location) {
      return null
    } else {
      return location;
    };
  },

  async getUserLocations(userid) {
    await db.read();
    return db.data.locations.filter((location) => location.userid === userid);
  },

  async deleteLocationById(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    if (index !== -1) {
      db.data.locations.splice(index, 1);
    }
    await db.write();
  },

  async deleteAllLocations() {
    db.data.locations = [];
    await db.write();
  },
};