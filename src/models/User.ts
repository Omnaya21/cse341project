import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  githubId: string;
  displayName?: string;
  oAuthProvider?: string;
  createdAt: Date;
}

export interface IUserModel extends Model<IUser> {
  findOrCreate: (user: IUser) => Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  githubId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  oAuthProvider: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.statics.findOrCreate = async function (user: IUser) {
  const existingUser = await this.findOne({ githubId: user.githubId });
  if (existingUser) {
    return existingUser;
  } else {
    return this.create(user);
  }
};

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
