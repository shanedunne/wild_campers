import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { apiService } from "./api-app-service.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    apiService.clearAuth();
    await apiService.createUser(maggie);
    await apiService.authenticate(maggieCredentials);
    await apiService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await apiService.createUser(testUsers[i]);
    }
    await apiService.createUser(maggie);
    await apiService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await apiService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await apiService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await apiService.deleteAllUsers();
    await apiService.createUser(maggie);
    await apiService.authenticate(maggieCredentials);
    returnedUsers = await apiService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await apiService.getUser(users[0]._id);
    assertSubset(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await apiService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await apiService.deleteAllUsers();
    await apiService.createUser(maggie);
    await apiService.authenticate(maggieCredentials);
    try {
      const returnedUser = await apiService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});