import { db } from "../models/db.js";


export const locationController = {

    // render location view
    index: {
      handler: async function (request, h) {
        const location = await db.locationStore.getLocationById(request.params.id);
        const category = await db.categoryStore.getCategoryById(location.categoryId);
        const viewData = {
          title: "Location",
          location: location,
          category: category,
        };
        return h.view("location-view", viewData);
      },
    },
}