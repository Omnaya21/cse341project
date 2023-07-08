// prettier-ignore
import {
  dbGetComment,
  dbInsertComment,
  dbUpdateComment,
  dbDeleteComment,
} from '../dataAccess/comment';
import { Request, Response } from 'express';

export const getCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const comment = await dbGetComment(commentId);
  res.status(200).send(comment);
};

export const insertComment = async (req: Request, res: Response) => {
  const comment = await dbInsertComment(req.body);
  res.status(201).send(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const comment = await dbUpdateComment(commentId, req.body);
  res.status(202).send(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  await dbDeleteComment(commentId);
  res.status(200).send();
};
