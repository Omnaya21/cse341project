import Comment, { IComment } from '../models/Comment';
import User from '../models/User';
import { dbGetPostByTitle, dbUpdatePostById } from './post';

export interface CommentBody {
  postTitle: string;
  author: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export const dbInsertCommentAfterPost = async (commentBody: CommentBody) => {
  const post = await dbGetPostByTitle(commentBody.postTitle);
  if (post) {
    const author = await User.findOne({ displayName: commentBody.author });
    if (author) {
      const comment = {
        post: post._id,
        author: author._id,
        comment: commentBody.comment,
        createdAt: new Date(),
      };
      const newComment = await Comment.create(comment);
      if (post.comments) {
        post.comments.push(newComment._id);
      } else {
        post.comments = [newComment._id];
      }
      await dbUpdatePostById(post._id, post);
    } else {
      throw new Error('Author not found. Please check the spelling.');
    }
  } else {
    throw new Error('Could not add comment to blog post.');
  }
};

export const dbUpdateComment = async (commentId: string, comment: IComment) => {
  comment.updatedAt = new Date();

  if (!comment.author) {
    // If user doesn't exist, throw error.
    console.log('No Author');
    throw new Error('Comment must have an Author.');
  }
  // If user exists, get user Id and add it to the Post object.
  if (typeof comment.author === 'string') {
    const user = await User.findOne({ displayName: comment.author });
    if (!user) {
      // If user doesn't exist, throw error.
      console.log('User not found.');
      throw new Error('User not found.');
    }
    comment.author = user?._id;
  }
  await Comment.updateOne({ _id: commentId }, comment, { upsert: true });
  return await dbGetCommentById(commentId);
};

export const dbDeleteComment = async (commentId: string) => {
  return await Comment.deleteOne({ _id: commentId });
};
