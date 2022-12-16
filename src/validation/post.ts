import Joi from "joi";

export const createPostValidation = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().required(),
});
