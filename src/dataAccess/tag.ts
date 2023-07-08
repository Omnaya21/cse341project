import Tag, { ITag } from '../models/Tag';

export const dbGetTagByName = async (tagName: string) => {
  return await Tag.findOne({ tag: tagName });
};
