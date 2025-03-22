import { EventEmitter } from "events";
import { assert } from "chai";
import { apiService } from "./api-app-service.js";
import { woodland, testCategories, admin, adminCredentials } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

  // declare admin user
  let adminUser = null;

  setup(async () => {
    apiService.clearAuth();
    await apiService.createUser(admin);
    await apiService.authenticate(adminCredentials);
    await apiService.deleteAllUsers();
    adminUser = await apiService.createUser(admin);
    await apiService.authenticate(adminCredentials);
    await apiService.deleteAllCategories();


  });

  teardown(async () => {
    apiService.clearAuth();

  });

  test("create category", async () => {
    const returnedCategory = await apiService.createCategory(woodland);
    assert.isNotNull(returnedCategory);
  });

  test("delete a category", async () => {
    const category = await apiService.createCategory(woodland);
    const response = await apiService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await apiService.getCategory(category._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await apiService.createCategory(testCategories[i]);
    }
    let returnedLists = await apiService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await apiService.deleteAllCategories();
    returnedLists = await apiService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await apiService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No category with this id", "Incorrect Response Message");
    }
  });
});