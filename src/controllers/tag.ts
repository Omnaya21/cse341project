// prettier-ignore
import {
  dbGetTag,
  dbInsertTag,
  dbUpdateTag,
  dbDeleteTag,
} from '../dataAccess/tag';
import { Request, Response } from 'express';

export const getTagById = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a tag by its id.',
      schema: { $ref: '#/definitions/Tag'}
    }
  */
  const tagId = req.params.tagId;
  const tag = await dbGetTag(tagId);
  res.status(200).send(tag);
};

export const insertTag = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Create a new tag',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Tag'}
    }
  */
  const tag = await dbInsertTag(req.body);
  res.status(201).send(tag);
};

export const updateTag = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Update a tag',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Tag'}
    }
  */
  const tagId = req.params.tagId;
  const tag = await dbUpdateTag(tagId, req.body);
  res.status(202).send(tag);
};

export const deleteTag = async (req: Request, res: Response) => {
  /*
    #swagger.responses[204] = {
      description: 'Tag successfully deleted.',
    }
  */
  const tagId = req.params.tagId;
  await dbDeleteTag(tagId);
  res.status(204).send();
};
