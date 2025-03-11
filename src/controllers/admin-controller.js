import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";

export const adminController = {
    // render admin view listing users and categories, with ability to add a category
    index: {
        handler: async function (request, h) {
            const users = await db.userStore.getAllUsers();
            const categories = await db.categoryStore.getAllCategories();

            const viewData = {
                title: "Admin Dashboard",
                users: users,
                categories: categories
            }
            return h.view("admin-view", viewData);
        },
    },

    // function to add category
    addCategory: {
        validate: {
            options: { abortEarly: false },
            payload: CategorySpec,
            failAction: function (request, h, error) {
                return h.view("admin-view", { title: "Error adding category", errors: error.details }).takeover().code(400);
            },
        },

        handler: async function (request, h) {
            const category = request.payload.categoryName;
            await db.categoryStore.addCategory({
                category: category,
            });
            return h.redirect("/admin-view");
        },
    },

    // function to delete category
    deleteCategory: {
        validate: {
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("admin-view", { title: "Error deleting category", errors: error.details }).takeover().code(400);
            },
        },

        handler: async function (request, h) {
            const category_id = request.params.id;
            await db.categoryStore.deleteCategoryById(category_id);
            return h.redirect("/admin-view");
        },
    },

     // function to delete user
     deleteUser: {
        validate: {
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("admin-view", { title: "Error deleting user", errors: error.details }).takeover().code(400);
            },
        },

        handler: async function (request, h) {
            const user_id = request.params.id;
            await db.userStore.deleteUserById(user_id);
            return h.redirect("/admin-view");
        },
    },

};
