// prettier-ignore
import {
  dbGetTagById,
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
      schema: [{ $ref: '#/definitions/TagResponse'}]
    }
  */
  const tags = await dbGetAllTags();
  res.status(200).send(tags);
};

export const getTagById = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a tag by its id.',
      schema: { $ref: '#/definitions/TagResponse'}
    }
  */
  const tagId = req.params.tagId;
  const tag = await dbGetTagById(tagId);
  res.status(200).send(tag);
};

export const getTagByName = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      description: 'Get a tag by its name.',
      schema: { $ref: '#/definitions/TagResponse'}
    }
  */
  const tagName = req.query.tagName as string;
  if (tagName) {
    const tag = await dbGetTagByName(tagName);
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
    #swagger.responses[200] = {
      description: 'Post successfully created.',
      schema: { $ref: '#/definitions/TagResponse'}
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
    #swagger.responses[200] = {
      description: 'Post successfully updated.',
      schema: { $ref: '#/definitions/TagResponse'}
    }
  */
  const tagId = req.params.tagId;
  const tag = await dbUpdateTag(tagId, req.body);
  res.status(200).send(tag);
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
