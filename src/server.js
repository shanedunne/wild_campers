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
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { validate, validateAdmin } from "./api/jwt-utils.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add handlebars helper for filtering
Handlebars.registerHelper("eq", (a, b) => {
    if (typeof a === "undefined" || typeof b === "undefined") {
        return false;
    } return a.toString() === b.toString()
});

const swaggerOptions = {
    info: {
        title: "Wild Campers API",
        version: "0.1"
    },
    securityDefinitions: {
        jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },
    security: [{ jwt: [] }]
};



async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: "localhost",
    });
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    await server.register(Cookie);
    await server.register(jwt);
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
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.default("session");

    // jwt strategy
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] }
    });

    // jwt admin strategy
    server.auth.strategy("admin", "jwt", {
        key: process.env.cookie_password,
        validate: validateAdmin,
        verifyOptions: { algorithms: ["HS256"] }
    });


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
    db.init("mongo");

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
