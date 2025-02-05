import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });
    await server.register(Vision);
    await server.register(Inert);

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

    // route for static css doc
    server.route({
        method: "GET",
        path: "/public/{param*}",
        handler: {
            directory: {
                path: path.join(__dirname, "public"),
            },
        },
    });

    // route for webroutes
    server.route(webRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
