import { db } from "../models/db.js";

export const dashboardController = {
    index: {
      handler: async function (request, h) {
        const locations = await db.locationStore.getAllLocations();
        console.log(locations)

        const viewData = {
          title: "Wild Campers Dashboard",
          locations: locations
        }
        return h.view("dashboard-view", viewData);
      },
    },

    addLocation: {
      handler: async function (request, h) {
        const locationName = request.payload.locationName;
        await db.locationStore.addLocation({ name: locationName });
        return h.redirect("/dashboard");
      },
      validate: {
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("dashboard-view", {
            title: 'Error adding a location',
            errors: error.details
          }).takeover().code(400);
        },
      },
    },
    
  };
  