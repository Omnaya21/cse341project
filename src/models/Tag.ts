import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITag extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagModel extends Model<ITag> {
  findOrCreate: (user: ITag) => Promise<ITag>;
}

const TagSchema: Schema = new Schema({
  name: {
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

TagSchema.statics.findOrCreate = async function (tag: ITag) {
  const existingTag = await this.findOne({ _id: tag.id });
  if (existingTag) {
    return existingTag;
  } else {
    return this.create(tag);
  }
};

export default mongoose.model<ITag, ITagModel>('Tag', TagSchema);
