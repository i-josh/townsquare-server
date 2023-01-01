import Joi from "joi";

export const addCommentValidation = Joi.object({
  postId: Joi.string().required(),
  comment: Joi.string().required(),
  reply: Joi.string(),
});

export const getCommentsValidation = Joi.object({
  postId: Joi.string().required(),
});
