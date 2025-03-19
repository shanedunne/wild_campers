import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";
import { apiService } from "./api-app-service.js";

suite("User API tests", () => {
  setup(async () => {
    await apiService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await apiService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await apiService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await apiService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await apiService.deleteAllUsers();
    returnedUsers = await apiService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    const returnedUser = await apiService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await apiService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  test("get a user - deleted user", async () => {
    await apiService.deleteAllUsers();
    try {
      const returnedUser = await apiService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });
});