import Tag, { ITag } from '../models/Tag';

export const dbGetTagByName = async (tagName: string) => {
  return await Tag.findOne({ name: tagName });
};

export const dbGetTag = async (tagId: string) => {
  return await Tag.findById(tagId);
};

export const dbGetAllTags = async () => {
  return await Tag.find();
};

export const dbInsertTag = async (tag: ITag) => {
  return await Tag.findOrCreate(tag);
};

export const dbUpdateTag = async (tagId: string, tag: ITag) => {
  tag.updatedAt = new Date();
  return await Tag.updateOne({ _id: tagId }, tag, { upsert: true });
};

export const dbDeleteTag = async (tagId: string) => {
  return await Tag.deleteOne({ _id: tagId });
};
