import Comment, { IComment } from '../models/Comment';

export const dbGetComment = async (commentId: string) => {
  return await Comment.findById(commentId);
};

export const dbInsertComment = async (comment: IComment) => {
  return await Comment.findOrCreate(comment);
};

export const dbUpdateComment = async (commentId: string, comment: IComment) => {
  return await Comment.updateOne({ _id: commentId }, comment, { upsert: true });
};

export const dbDeleteComment = async (commentId: string) => {
  return await Comment.deleteOne({ _id: commentId });
};
