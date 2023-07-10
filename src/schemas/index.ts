import Joi from 'joi';

export const UserSchema = Joi.string().required();

export const CommentSchema = Joi.object({
  author: UserSchema.required(),
  comment: Joi.string().required(),
  postTitle: Joi.string().optional().allow(''),
  createdAt: Joi.date().optional().allow(''),
  updatedAt: Joi.date().optional().allow(''),
});

export const TagSchema = Joi.object({
  name: Joi.string().required(),
  createdAt: Joi.date().optional().allow(''),
  updatedAt: Joi.date().optional().allow(''),
});

export const PostSchema = Joi.object({
  title: Joi.string().required(),
  author: UserSchema.required(),
  content: Joi.string().required(),
  createdAt: Joi.date().optional().allow(''),
  updatedAt: Joi.date().optional().allow(''),
  image: Joi.string().optional().allow(''),
  comments: Joi.array().items(CommentSchema).optional().allow(''),
  tags: Joi.array().items(TagSchema).optional().allow(''),
});
