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
export const LocationSpec = Joi.object()
  .keys({
    name: Joi.string().min(10).max(40).example("Wicklow Mountains").required(),
    categoryId: IdSpec,
    latitude: Joi.string().example("53.0000").required(),
    longitude: Joi.string().example("-6.4000").required(),
    locationDescription: Joi.string().min(50).max(1000).example("Experience rugged landscapes and serene valleys ideal for camping and hiking").required(),
    locationImage: Joi.any().optional(), 
    userId: IdSpec,
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("LocationDetails");

export const LocationArray = Joi.array().items(LocationSpec).label("LocationArray");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationDetailsPlus");


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
  })
  .label("JwtAuth");
