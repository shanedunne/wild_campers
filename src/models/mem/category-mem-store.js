import { v4 } from "uuid";

let categorys = [];

export const categorytMemStore = {
  async getAllCategorys() {
    return categorys;
  },

  async addcategory(category) {
    category._id = v4();
    categorys.push(category);
    return category;
  },

  async getCategoryById(id) {
    return categorys.find((category) => category._id === id);
  },

  async deleteCategoryById(id) {
    const index = categorys.findIndex((category) => category._id === id);
    categorys.splice(index, 1);
  },

  async deleteAllCategorys() {
    categorys = [];
  },
};
