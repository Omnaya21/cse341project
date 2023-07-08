import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IComment } from './Comment';
import { ITag } from './Tag';

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  image?: string;
  comments?: IComment[];
  tags?: ITag[];
}

export interface IPostModel extends Model<IPost> {
  findOrCreate: (user: IPost) => Promise<IPost>;
}

const PostSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
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
  image: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
});

PostSchema.statics.findOrCreate = async function (post: IPost) {
  const existingPost = await this.findOne({ title: post.title });
  if (existingPost) {
    return existingPost;
  } else {
    return this.create(post);
  }
};

export default mongoose.model<IPost, IPostModel>('Post', PostSchema);
