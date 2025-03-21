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

export const LocationSpec = {
  locationName: Joi.string().min(10).max(40).required(),
  categoryId: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  locationDescription: Joi.string().min(50).max(1000).required()

};

export const CategorySpec = {
  categoryName: Joi.string().min(3).max(25).required(),
}