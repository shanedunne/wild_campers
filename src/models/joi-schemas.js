import Joi from "joi";

// ID SPEC
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// USER SCHEMAS


export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    role: Joi.string().optional()
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),

}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


// LOCATION SCHEMAS
export const LocationSpec = Joi.object({
  name: Joi.string().min(10).max(40).required(),
  categoryId: IdSpec.required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  locationDescription: Joi.string().min(50).max(1000).required(),
  locationImage: Joi.alternatives().try(
      Joi.binary().meta({ swaggerType: 'file' }),
      Joi.array().items(Joi.binary().meta({ swaggerType: 'file' }))
  ).optional().description('File buffer or array of file buffers for upload'),
  accessibleByVehicle: Joi.boolean().default(false),
  petFriendly: Joi.boolean().default(false),
  swimming: Joi.boolean().default(false),
  hiking: Joi.boolean().default(false),
  closeToTown: Joi.boolean().default(false),
  greatViews: Joi.boolean().default(false),
}).label("LocationCreatePayload");


export const LocationSpecPlus = Joi.object({
  _id: IdSpec.required(),
  name: Joi.string().min(10).max(40).required(),
  categoryId: IdSpec.required(), // Consider if this should be an object if populated
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  locationDescription: Joi.string().min(50).max(1000).required(),
  locationImages: Joi.array().items(Joi.string().uri()).optional().description('Array of Cloudinary image URLs'), // PLURAL
  accessibleByVehicle: Joi.boolean().default(false),
  petFriendly: Joi.boolean().default(false),
  swimming: Joi.boolean().default(false),
  hiking: Joi.boolean().default(false),
  closeToTown: Joi.boolean().default(false),
  greatViews: Joi.boolean().default(false),
  userId: IdSpec.optional(), // Consider if this should be an object if populated
  __v: Joi.number(),
}).label("LocationResponseDetails");


export const LocationArray = Joi.array().items(LocationSpecPlus).label("LocationArray");

// CATEGORY SCHEMAS
export const CategorySpec = Joi.object()
  .keys({
    categoryName: Joi.string().min(3).max(25).example("Beach").required(),
    _id: IdSpec,
  })
  // added to allow for locations
  .unknown(true)
  .label("CategoryDetails");

export const CategoryArray = Joi.array().items(CategorySpec).label("CategoryArray");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  locations: Joi.array().items(Joi.object()).optional()
}).label("CategoryDetailsPlus");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    role: Joi.string().required().example("USER"),

  })
  .label("JwtAuth");
