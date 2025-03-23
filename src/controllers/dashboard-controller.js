import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const categoryId = request.query.categoryId;
      const user = request.auth.credentials;
      let locations;
      if (categoryId) {
        locations = await db.locationStore.getLocationsByCategoryId(categoryId);
      } else {
        locations = await db.locationStore.getAllLocations();
      }
      const categories = await db.categoryStore.getAllCategories();

      const viewData = {
        title: "Wild Campers Dashboard",
        locations: locations,
        categories: categories,
        selectedCategory: categoryId || "",
        user: user
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
      try {
        const name = request.payload.name;
        const categoryId = request.payload.categoryId;
        const latitude = request.payload.latitude;
        const longitude = request.payload.longitude;
        const locationDescription = request.payload.locationDescription;
        const locationImage = request.payload.locationImage;
        let img = null;
        if (locationImage && Object.keys(locationImage).length > 0) {
          const url = await imageStore.uploadImage(locationImage);
          img = url;
        }
        const loggedInUser = request.auth.credentials;
        await db.locationStore.addLocation({
          name: name,
          categoryId: categoryId,
          latitude: latitude,
          longitude: longitude,
          locationDescription: locationDescription,
          img: img,
          userId: loggedInUser._id
        });
        return h.redirect("/dashboard");
      } catch(error) {
        console.error("error adding location", error)
      }
      
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

};
