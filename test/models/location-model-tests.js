import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, achill, woodland } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Location model tests", () => {

  let forest = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.categoryStore.deleteAllCategories();
    forest = await db.categoryStore.addCategory(woodland);
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(testLocations[i]);
    }
  });

  test("create a location", async () => {
    const location = await db.locationStore.addLocation(forest._id, achill);
    assertSubset(achill, location);
    assert.isDefined(location._id);
  });

  test("delete all locations", async () => {
    let returnedlocations = await db.locationStore.getAllLocations();
    assert.equal(returnedlocations.length, 3);
    await db.locationStore.deleteAllLocations();
    returnedlocations = await db.locationStore.getAllLocations();
    assert.equal(returnedlocations.length, 0);
  });

  test("get a location - success", async () => {
    const location = await db.locationStore.addLocation(achill);
    const returnedlocation = await db.locationStore.getLocationById(location._id);
    assertSubset(achill, returnedlocation);
  });

  test("delete one location - success", async () => {
    const id = testLocations[0]._id;
    await db.locationStore.deleteLocationById(id);
    const returnedlocations = await db.locationStore.getAllLocations();
    assert.equal(returnedlocations.length, testLocations.length - 1);
    const deletedlocation = await db.locationStore.getLocationById(id);
    assert.isNull(deletedlocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete One location - fail", async () => {
    await db.locationStore.deleteLocationById("bad-id");
    const alllocations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, alllocations.length);
  });
});


