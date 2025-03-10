import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LocationSpec = {
  name: Joi.string().min(10).max(40).required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  locationDescription: Joi.string().min(50).max(1000).required()

};