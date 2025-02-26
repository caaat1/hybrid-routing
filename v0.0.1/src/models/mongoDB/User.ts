// src\models\mongoDB\User.ts

import bcrypt from 'bcrypt';
import {Schema, Document, model} from 'mongoose';

// Define an interface representing a user document in MongoDB
export interface IUser extends Document {
  username: string;
  passwordHash: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('passwordHash') || this.isNew) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash);
};

export const User = model<IUser>('User', userSchema);
