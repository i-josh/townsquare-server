import Joi from "joi";

export const createPostValidation = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().required(),
});

export const updatePostValidation = Joi.object({
  postId: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string().required(),
});
