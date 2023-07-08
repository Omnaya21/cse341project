// prettier-ignore
import {
  dbGetTag,
  dbInsertTag,
  dbUpdateTag,
  dbDeleteTag,
} from '../dataAccess/tag';
import { Request, Response } from 'express';

export const getTagById = async (req: Request, res: Response) => {
  const tagId = req.params.tagId;
  const tag = await dbGetTag(tagId);
  res.status(200).send(tag);
};

export const insertTag = async (req: Request, res: Response) => {
  const tag = await dbInsertTag(req.body);
  res.status(201).send(tag);
};

export const updateTag = async (req: Request, res: Response) => {
  const tagId = req.params.tagId;
  const tag = await dbUpdateTag(tagId, req.body);
  res.status(202).send(tag);
};

export const deleteTag = async (req: Request, res: Response) => {
  const tagId = req.params.tagId;
  await dbDeleteTag(tagId);
  res.status(200).send();
};
