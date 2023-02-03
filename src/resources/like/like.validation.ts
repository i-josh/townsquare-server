import Joi from "joi";

export const likePostValidation = Joi.object({
  userId: Joi.string().required(),
  postId: Joi.string(),
  commentId: Joi.string(),
  type: Joi.string().required(),
});
