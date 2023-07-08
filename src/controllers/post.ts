// prettier-ignore
import {
  dbGetPost,
  dbInsertPost,
  dbUpdatePostById,
  dbGetPostByUserId,
  dbDeletePostById,
  dbGetPostsByTagId,
} from '../dataAccess/post';
import { dbGetTagByName } from '../dataAccess/tag';
import { Request, Response } from 'express';

export const getPostByPostId = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by its id.',
      schema: { $ref: '#/definitions/Post'}
    }
  */
  const postId = req.params.postId;
  const post = await dbGetPost(postId);
  res.status(200).send(post);
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by its author.',
      schema: { $ref: '#/definitions/Post'}
    }
  */
  const userId = req.params.userId;
  const post = await dbGetPostByUserId(userId);
  res.status(200).send(post);
};

export const getPostsByTag = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by a tag name.',
      schema: { $ref: '#/definitions/Post'}
    }
  */
  const tagName = req.query.tagName as string;
  if (tagName) {
    const tag = await dbGetTagByName(tagName);
    if (tag) {
      const post = await dbGetPostsByTagId(tag._id.toString());
      res.status(200).send(post);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } else {
    res.status(400).json({ error: 'Missing "tagName" parameter' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Create a new post',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Post'}
    }
  */
  const post = await dbInsertPost(req.body);
  res.status(201).send(post);
};

export const updatePost = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Update a post',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Post'}
    }
  */
  const postId = req.params.postId;
  const post = await dbUpdatePostById(postId, req.body);
  res.status(202).send(post);
};

export const deletePost = async (req: Request, res: Response) => {
  /*
    #swagger.responses[204] = {
      description: 'Post successfully deleted.',
    }
  */
  const postId = req.params.postId;
  await dbDeletePostById(postId);
  res.status(204).send();
};
