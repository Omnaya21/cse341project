import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  author: IUser;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ICommentModel extends Model<IComment> {
  findOrCreate: (user: IComment) => Promise<IComment>;
}

const CommentSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
