import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { apiRoutes } from "./api-routes.js";
import Cookie from "@hapi/cookie";
import 'dotenv/config'
import { accountsController } from "./controllers/accounts-controller.js";
import Joi from "joi";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add handlebars helper for filtering
Handlebars.registerHelper("filterByCategory", (a, b) => a.toString() === b.toString());


async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });
    await server.register(Vision);
    await server.register(Inert);
    await server.register(Cookie);
    server.validator(Joi);


    // setup handlebars
    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: __dirname,
        path: "./views",
        layoutPath: "./views/layouts",
        partialsPath: "./views/partials",
        layout: true,
        isCached: false,
    });


    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.COOKIE_NAME,
            password: process.env.COOKIE_KEY,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.default("session");


    // route for static css doc
    server.route({
        method: "GET",
        path: "/public/{param*}",
        options: { auth: false },
        handler: {
            directory: {
                path: path.join(__dirname, "public"),
            },
        },
    });

    // initialise database
    db.init("json");

    // route for webroutes
    server.route(webRoutes);
    server.route(apiRoutes)
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
