import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const locations = await db.locationStore.getAllLocations();
      const categories = await db.categoryStore.getAllCategories();

      const viewData = {
        title: "Wild Campers Dashboard",
        locations: locations,
        categories: categories
      }
      return h.view("dashboard-view", viewData);
    },
  },

  addLocation: {
    validate: {
      options: { abortEarly: false },
      payload: LocationSpec,
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Error adding location", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const locationName = request.payload.locationName;
      const categoryId = request.payload.categoryId;
      const latitude = request.payload.latitude;
      const longitude = request.payload.longitude;
      const locationDescription = request.payload.locationDescription;
      await db.locationStore.addLocation({
        name: locationName,
        categoryId: categoryId,
        latitude: latitude,
        longitude: longitude,
        locationDescription: locationDescription
      });
      return h.redirect("/dashboard");
    },
  },

};
