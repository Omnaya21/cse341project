// prettier-ignore
import {
  dbGetCommentsByAuthor,
  dbInsertCommentAfterPost,
  dbUpdateComment,
  dbDeleteComment,
} from '../dataAccess/comment';
import { Request, Response } from 'express';

export const getCommentsByAuthor = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a comment by its author.',
      schema: { $ref: '#/definitions/CommentResponse'}
    }
  */
  const displayName = req.query.author as string;
  if (displayName) {
    try {
      const comment = await dbGetCommentsByAuthor(displayName);
      res.status(200).send(comment);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Missing "author" parameter' });
  }
};

export const insertComment = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Create a new comment',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Comment'}
    }
    #swagger.responses[201] = {
      description: 'Comment successfully created.',
      schema: { $ref: '#/definitions/CommentResponse'}
    }
  */
  const comment = await dbInsertCommentAfterPost(req.body);
  res.status(201).send(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Update a comment',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Comment'}
    }
    #swagger.responses[200] = {
      description: 'Comment successfully updated.',
      schema: { $ref: '#/definitions/CommentResponse'}
    }
  */
  const commentId = req.params.commentId;
  const comment = await dbUpdateComment(commentId, req.body);
  res.status(200).send(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  /*
    #swagger.responses[204] = {
      description: 'Comment successfully deleted.',
    }
  */
  const commentId = req.params.commentId;
  await dbDeleteComment(commentId);
  res.status(204).send();
};
