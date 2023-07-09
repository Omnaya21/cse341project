import Comment, { IComment } from '../models/Comment';
import User from '../models/User';
import { dbGetPostByTitle, dbUpdatePostById } from './post';

export const dbGetCommentById = async (commentId: string) => {
  return await Comment.findById(commentId);
};

export const dbGetCommentsByAuthor = async (displayName: string) => {
  const user = await User.findOne({ displayName });
  if (user) {
    return await Comment.find({ author: user._id });
  } else {
    throw new Error('Author not found. Please check the spelling.');
  }
};

export const dbGetCommentsByPostId = async (postId: string) => {
  return await Comment.find({ post: postId });
};

export const dbInsertComment = async (comment: IComment) => {
  const user = await User.findOne({ displayName: comment.author });
  if (user) {
    comment.author = user._id;
    return await Comment.create(comment);
  } else {
    throw new Error('Author not found. Please check the spelling.');
  }
};

export const dbInsertCommentAfterPost = async (comment: IComment) => {
  const post = await dbGetPostByTitle(comment.post.title);
  if (post) {
    const newComment = await Comment.create(comment);
    if (post.comments) {
      post.comments.push(newComment._id);
    } else {
      post.comments = [newComment._id];
    }
    await dbUpdatePostById(post._id, post);
  } else {
    throw new Error('Could not add comment to blog post.');
  }
};

export const dbUpdateComment = async (commentId: string, comment: IComment) => {
  comment.updatedAt = new Date();
  return await Comment.updateOne({ _id: commentId }, comment, { upsert: true });
};

export const dbDeleteComment = async (commentId: string) => {
  return await Comment.deleteOne({ _id: commentId });
};
