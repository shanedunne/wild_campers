import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { apiService } from "./api-app-service.js";
import { testLocations, achill, maggie, woodland, admin, adminCredentials, maggieCredentials } from "../fixtures.js";

suite("Location API tests", () => {
    let user = null;
    let adminUser = null;
    let category = null;
    setup(async () => {

        apiService.clearAuth();
        adminUser = await apiService.createUser(admin);
        await apiService.authenticate(adminCredentials);

        await apiService.deleteAllLocations();
        await apiService.deleteAllUsers();


        user = await apiService.createUser(maggie);
        await apiService.authenticate(maggieCredentials);

        adminUser = await apiService.createUser(admin)
        await apiService.authenticate(adminCredentials)

        category = await apiService.createCategory(woodland);

        achill.userId = user._id;
        achill.categoryId = category._id;
    });

    teardown(async () => { });

    test("create location", async () => {
        const returnedLocation = await apiService.createLocation(achill);
        assert.isNotNull(returnedLocation);
        assertSubset(achill, returnedLocation);
    });

    test("create Multiple locations", async () => {
        for (let i = 0; i < testLocations.length; i += 1) {
            testLocations[i].userId = user._id;
            testLocations[i].categoryId = category._id;
            // eslint-disable-next-line no-await-in-loop
            await apiService.createLocation(testLocations[i]);
        }
        const returnedLocations = await apiService.getAllLocations();
        assert.equal(returnedLocations.length, testLocations.length);
        for (let i = 0; i < returnedLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const location = await apiService.getLocation(returnedLocations[i]._id);
            assertSubset(location, returnedLocations[i]);
        }
    });

    test("Delete location Api", async () => {
        for (let i = 0; i < testLocations.length; i += 1) {

            testLocations[i].userId = user._id;
            testLocations[i].categoryId = category._id;

            // eslint-disable-next-line no-await-in-loop
            await apiService.createLocation(testLocations[i]);
        }
        let returnedLocations = await apiService.getAllLocations();
        assert.equal(returnedLocations.length, testLocations.length);
        for (let i = 0; i < returnedLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const location = await apiService.deleteLocation(returnedLocations[i]._id);
        }
        returnedLocations = await apiService.getAllLocations();
        assert.equal(returnedLocations.length, 0);
    });
});