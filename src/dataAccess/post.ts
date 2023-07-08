import Post, { IPost } from '../models/Post';

export const dbGetPost = async (postId: string) => {
  return await Post.findById(postId).populate(['author', 'comments', 'tags']);
};

export const dbGetPostByUserId = async (userId: string) => {
  return await Post.findOne({ author: userId }).populate(['author', 'comments', 'tags']);;
};

export const dbGetPostsByTagId = async (tagId: string) => {
  return await Post.find({ tag: tagId }).populate(['author', 'comments', 'tags']);;
};

export const dbGetPosts = async () => {
  return await Post.find().populate(['author', 'comments', 'tags']);
};

export const dbInsertPost = async (post: IPost) => {
  return await Post.findOrCreate(post);
};

export const dbUpdatePostById = async (id: string, post: IPost) => {
  return await Post.updateOne({ _id: id }, post, { upsert: true });
};

export const dbDeletePostById = async (id: string) => {
  return await Post.deleteOne({ _id: id });
};
