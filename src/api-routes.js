import { categoryApi } from "./api/category-api.js";
import { locationApi } from "./api/location-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
    // user api routes
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

    // location api routes
    { method: "GET", path: "/api/locations", config: locationApi.find },
    { method: "POST", path: "/api/locations", config: locationApi.create },
    { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
    { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
    { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },


    // category api routes
    { method: "GET", path: "/api/categories", config: categoryApi.find },
    { method: "POST", path: "/api/categories", config: categoryApi.create },
    { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
    { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
    { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
];