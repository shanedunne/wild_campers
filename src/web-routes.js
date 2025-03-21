import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [

    // Account controller routes
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    {method: "GET", path: "/account", config: accountsController.getAccountInfo},

    // Dashboard controller routes
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },

    { method: "GET", path: "/dashboard/category", config: dashboardController.index },


    // Location controller routes
    {method: "GET", path: "/location/{id}", config: locationController.index },

    // Admin controller routes
    {method: "GET", path: "/admin", config: adminController.index },
    { method: "GET", path: "/admin/deletecategory/{id}", config: adminController.deleteCategory },
    { method: "POST", path: "/admin/addcategory", config: adminController.addCategory },
    { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },

    // wild card
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];
