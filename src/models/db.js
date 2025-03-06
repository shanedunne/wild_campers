import { userMemStore } from "./mem/user-mem-store.js";
import { locationtMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
export const db = {
  userStore: null,
  locationStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationtMemStore;
    }

  },
};
