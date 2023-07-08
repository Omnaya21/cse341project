import Post, { IPost } from '../models/Post';

export const dbGetPost = async (postId: string) => {
  return await Post.findById(postId);
};

export const dbGetPostByUserId = async (userId: string) => {
  return await Post.findOne({ author: userId });
};

export const dbGetPostsByTagId = async (tagId: string) => {
  return await Post.find({ tag: tagId });
};

export const dbInsertPost = async (post: IPost) => {
  return await Post.findOrCreate(post);
};

export const dbGetPosts = async () => {
  return await Post.find();
};

export const dbUpdatePostById = async (id: string, post: IPost) => {
  return await Post.updateOne({ _id: id }, post, { upsert: true });
};

export const dbDeletePostById = async (id: string) => {
  return await Post.deleteOne({ _id: id });
};
