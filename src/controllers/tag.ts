// prettier-ignore
import {
  dbGetTag,
  dbInsertTag,
  dbUpdateTag,
  dbDeleteTag,
  dbGetTagByName,
  dbGetAllTags,
} from '../dataAccess/tag';
import { Request, Response } from 'express';

export const getAllTags = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get all tags.',
      schema: [{ $ref: '#/definitions/Tag'}]
    }
  */
  const tags = await dbGetAllTags();
  res.status(200).send(tags);
};

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

export const getTagByName = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a tag by its name.',
      schema: { $ref: '#/definitions/Tag'}
    }
  */
  const tagName = req.query.tagName as string;
  if (tagName) {
    const tag = await dbGetTagByName(tagName);
    console.log({ tag });
    res.status(200).send(tag);
  } else {
    res.status(401).send({ error: 'Missing "tagName" parameter' });
  }
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
