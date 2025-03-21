import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const apiService = {
  serviceUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.serviceUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.serviceUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.serviceUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.serviceUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.serviceUrl}/api/categories`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.serviceUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.serviceUrl}/api/categories/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.serviceUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.serviceUrl}/api/categories/${id}`);
    return res.data;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.serviceUrl}/api/locations`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.serviceUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const res = await axios.delete(`${this.serviceUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.serviceUrl}/api/locations/${id}`);
    return res.data;
  },

  async deleteLocation(id) {
    const res = await axios.delete(`${this.serviceUrl}/api/locations/${id}`);
    return res.data;
  },
};