// prettier-ignore
import {
  dbGetPostById,
  dbInsertPost,
  dbUpdatePostById,
  dbGetPostsByUsername,
  dbDeletePostById,
  dbGetPostsByTagName,
} from '../dataAccess/post';
import { Request, Response } from 'express';

export const getPostByPostId = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by its id.',
      schema: { $ref: '#/definitions/PostResponse'}
    }
  */
  const postId = req.params.postId;
  const post = await dbGetPostById(postId);
  res.status(200).send(post);
};

export const getPostsByUsername = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by its author.',
      schema: [{ $ref: '#/definitions/PostResponse'}]
    }
  */
  const displayName = req.query.author as string;
  if (displayName) {
    try {
      const post = await dbGetPostsByUsername(displayName);
      res.status(200).send(post);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Missing "author" parameter' });
  }
};

export const getPostsByTag = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a post by a tag name.',
      schema: { $ref: '#/definitions/PostResponse'}
    }
  */
  const tagName = req.query.tagName as string;
  if (tagName) {
    try {
      const post = await dbGetPostsByTagName(tagName);
      res.status(200).send(post);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
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
    #swagger.responses[201] = {
      description: 'Post successfully created.',
      schema: { $ref: '#/definitions/PostResponse'}
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
    #swagger.responses[200] = {
      description: 'Post successfully updated.',
      schema: { $ref: '#/definitions/PostResponse'}
    }
  */
  const postId = req.params.postId;
  const post = await dbUpdatePostById(postId, req.body);
  res.status(200).send(post);
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
