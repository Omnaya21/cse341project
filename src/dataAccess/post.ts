import Post, { IPost } from '../models/Post';
import User from '../models/User';
import { dbGetTagByName, dbInsertTag, dbGetTagById } from './tag';
import { dbGetCommentById, dbInsertComment, dbUpdateComment, dbGetCommentsByPostId, dbDeleteComment } from './comment';
import { IComment } from '../models/Comment';

export const dbGetPostById = async (postId: string) => {
  return await Post.findById(postId).populate(['author', 'comments', 'tags']);
};

export const dbGetPostByTitle = async (title: string) => {
  return await Post.findOne({ title });
};

export const dbGetPostsByUsername = async (displayName: string) => {
  const user = await User.findOne({ displayName });
  if (user) {
    return await Post.find({ author: user._id }).populate(['author', 'comments', 'tags']);
  } else {
    throw new Error('Author not found. Please check the spelling.');
  }
};

export const dbGetPostsByTagName = async (tagName: string) => {
  const tag = await dbGetTagByName(tagName);
  if (tag) {
    return await dbGetPostsByTagId(tag._id);
  } else {
    throw new Error('Tag not found. Please check the spelling.');
  }
};

export const dbGetPostsByTagId = async (tagId: string) => {
  return await Post.find({ tags: tagId }).populate(['author', 'comments', 'tags']);
};

export const dbGetPosts = async () => {
  return await Post.find().populate(['author', 'comments', 'tags']);
};

export const dbUpdatePostById = async (postId: string, post: IPost) => {
  post.updatedAt = new Date();

  const { author, tags } = post;
  if (!author) {
    // If user doesn't exist, throw error.
    console.log('No Author');
    throw new Error('Blog post must have an Author.');
  }
  // If user exists, get user Id and add it to the Post object.
  if (typeof post.author === 'string') {
    const user = await User.findOne({ displayName: author });
    if (!user) {
      // If user doesn't exist, throw error.
      console.log('User not found.');
      throw new Error('User not found.');
    }
    post.author = user?._id;
  }

  let postTags = [];
  // Check if there are any tags
  if (tags && tags.length > 0) {
    // If there are tags, loop through tags
    for (let tag of tags) {
      // Check if tag already exists in the db
      let existing;
      if (tag.name) {
       existing = await dbGetTagByName(tag.name);
      } else {
        existing = await dbGetTagById(tag.toString());
      }
      // If the tag already exists, use the tagId with the Post object
      if (existing) {
        postTags.push(existing._id);
      } else {
        // If the tag does not exist, create it, and use the tagId with the Post object
        const newTag = await dbInsertTag(tag);
        postTags.push(newTag._id);
      }
    }
  }
  post.tags = postTags;

  await Post.updateOne({ _id: postId }, post, { upsert: true });

  return await dbGetPostById(postId);
};

export const dbDeletePostById = async (postId: string) => {
  const comments = await dbGetCommentsByPostId(postId);
  if (comments) {
    for (let comment of comments) {
      await dbDeleteComment(comment._id);
    }
  }
  return await Post.deleteOne({ _id: postId });
};

export const dbInsertPost = async (post: IPost) => {
  // Get User
  const { author, tags, comments } = post;
  if (!author) {
    // If user doesn't exist, throw error.
    console.log('No Author');
    throw new Error('New blog post must have an Author.');
  }
  // If user exists, get user Id and add it to the Post object.
  const user = await User.findOne({ displayName: author });
  if (!user) {
    // If user doesn't exist, throw error.
    console.log('User not found.');
    throw new Error('User not found.');
  }
  post.author = user?._id;

  let postTags = [];
  // Check if there are any tags
  if (tags && tags.length > 0) {
    // If there are tags, loop through tags
    for (let tag of tags) {
      // Check if tag already exists in the db
      const existing = await dbGetTagByName(tag.name);
      // If the tag already exists, use the tagId with the Post object
      if (existing) {
        postTags.push(existing._id);
      } else {
        // If the tag does not exist, create it, and use the tagId with the Post object
        const newTag = await dbInsertTag(tag);
        postTags.push(newTag._id);
      }
    }
  }
  post.tags = postTags;

  let postComments = [];
  // Check if there are any comments and loop through them
  if (comments && comments.length > 0) {
    for (let comment of comments) {
      // insert them and get the Ids for the Post object
      const commentToInsert = {
        author: comment.author,
        comment: comment.comment,
      } as IComment;
      const newComment = await dbInsertComment(commentToInsert);
      postComments.push(newComment._id);
    }
  }
  post.comments = postComments;

  const newPost = await Post.create(post);

  // Get the post Id and update the comments with the post id
  for (let commentId of postComments) {
    const comment = await dbGetCommentById(commentId);
    if (comment) {
      comment.post = newPost._id;
      await dbUpdateComment(comment._id, comment);
    }
  }

  // return the post
  return await dbGetPostById(newPost._id);
};
