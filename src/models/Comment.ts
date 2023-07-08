import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IPost } from './Post';

export interface IComment extends Document {
  post: IPost;
  author: IUser;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICommentModel extends Model<IComment> {
  findOrCreate: (user: IComment) => Promise<IComment>;
}

const CommentSchema: Schema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

CommentSchema.statics.findOrCreate = async function (comment: IComment) {
  const existingComment = await this.findOne({ _id: comment.id });
  if (existingComment) {
    return existingComment;
  } else {
    return this.create(comment);
  }
};

export default mongoose.model<IComment, ICommentModel>('Comment', CommentSchema);
