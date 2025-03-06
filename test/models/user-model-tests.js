import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User model tests", () => {
    setup(async () => {
        db.init("json");
        await db.userStore.deleteAll();
        for (let i = 0; i < testUsers.length; i++) {
            testUsers[i] = await db.userStore.addUser(testUsers[i]);
        };
    });

    test("Create a user", async () => {
        const newUser = await db.userStore.addUser(maggie);
        assertSubset(newUser, maggie);
    });

    test("create a user", async () => {
        const newUser = await db.userStore.addUser(maggie);
        assertSubset(newUser, maggie);
    });

    test("delete all userApi", async () => {
        let returnedUsers = await db.userStore.getAllUsers();
        assert.equal(returnedUsers.length, 3);
        await db.userStore.deleteAll();
        returnedUsers = await db.userStore.getAllUsers();
        assert.equal(returnedUsers.length, 0);
    });

    test("get a user - success", async () => {
        const user = await db.userStore.addUser(maggie);
        const returnedUser1 = await db.userStore.getUserById(user._id);
        assert.deepEqual(user, returnedUser1);
        const returnedUser2 = await db.userStore.getUserByEmail(user.email);
        assert.deepEqual(user, returnedUser2);
    });

    test("delete One User - success", async () => {
        await db.userStore.deleteUserById(testUsers[0]._id);
        const returnedUsers = await db.userStore.getAllUsers();
        assert.equal(returnedUsers.length, testUsers.length - 1);
        const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
        assert.isNull(deletedUser);
    });

    test("get a user - failures", async () => {
        assert.isNull(await db.userStore.getUserByEmail(""));
        assert.isNull(await db.userStore.getUserById(""));
        assert.isNull(await db.userStore.getUserById());
    });

    test("get a user - bad params", async () => {
        let nullUser = await db.userStore.getUserByEmail("");
        assert.isNull(nullUser);
        nullUser = await db.userStore.getUserById("");
        assert.isNull(nullUser);
        nullUser = await db.userStore.getUserById();
        assert.isNull(nullUser);
    });

    test("delete One User - fail", async () => {
        await db.userStore.deleteUserById("bad-id");
        const allUsers = await db.userStore.getAllUsers();
        assert.equal(testUsers.length, allUsers.length);
    });
})