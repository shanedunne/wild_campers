import { db } from "../models/db.js";


export const locationController = {

    // render location view
    index: {
      handler: async function (request, h) {
        const location = await db.locationStore.getLocationById(request.params.id);
        const viewData = {
          title: "Location",
          location: location,
        };
        return h.view("location-view", viewData);
      },
    },
}