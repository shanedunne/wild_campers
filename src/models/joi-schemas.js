import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    role: Joi.string().optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");


export const UserArray = Joi.array().items(UserSpec).label("UserArray");


export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LocationSpec = Joi.object()
  .keys({
    name: Joi.string().min(10).max(40).example("Wicklow Mountains").required(),
    categoryId: IdSpec,
    latitude: Joi.string().example("53.0000").required(),
    longitude: Joi.string().example("-6.4000").required(),
    locationDescription: Joi.string().min(50).max(1000).example("Experience rugged landscapes and serene valleys ideal for camping and hiking").required(),
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

export const CategorySpec = Joi.object()
  .keys({
    categoryName: Joi.string().min(3).max(25).example("Beach").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("CategoryDetails");

export const CategoryArray = Joi.array().items(CategorySpec).label("CategoryArray");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  locations: Joi.array().items(Joi.object()).optional()
}).label("CategoryDetailsPlus");