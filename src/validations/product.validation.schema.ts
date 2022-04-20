import * as Joi from 'joi';

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required()
});

export const productCreateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().required()
});
