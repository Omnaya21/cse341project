// prettier-ignore
import {
  dbGetComment,
  dbInsertComment,
  dbUpdateComment,
  dbDeleteComment,
} from '../dataAccess/comment';
import { Request, Response } from 'express';

export const getCommentById = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a comment by its id.',
      schema: { $ref: '#/definitions/Comment'}
    }
  */
  const commentId = req.params.commentId;
  const comment = await dbGetComment(commentId);
  res.status(200).send(comment);
};

export const insertComment = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Create a new comment',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Comment'}
    }
  */
  const comment = await dbInsertComment(req.body);
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
  */
  const commentId = req.params.commentId;
  const comment = await dbUpdateComment(commentId, req.body);
  res.status(202).send(comment);
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
