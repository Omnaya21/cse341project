import Joi from 'joi';

export const PostSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string(),
  content: Joi.string(),
  createdAt: Joi.date().optional().allow(''),
  updatedAt: Joi.date().optional().allow(''),
  image: Joi.string().optional().allow(''),
  comments: Joi.array().items(Joi.string()).optional().allow(''),
  tags: Joi.array().items(Joi.string()).optional().allow(''),
});

export const CommentSchema = Joi.object({
  author: Joi.string(),
  comment: Joi.string(),
  createdAt: Joi.date().optional().allow(''),
  updatedAt: Joi.date().optional().allow(''),
});

export const TagSchema = Joi.object({
  tag: Joi.string(),
  createdAt: Joi.date().optional().allow(''),
});
