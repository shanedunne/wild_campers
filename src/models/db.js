import { userMemStore } from "./mem/user-mem-store.js";
import { locationtMemStore } from "./mem/location-mem-store.js";
import { categorytMemStore } from "./mem/category-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  categoryStore: null,


  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.categoryStore = categoryJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationtMemStore;
        this.categoryStore = categorytMemStore
    }

  },
};
