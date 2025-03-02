// src\models\mongoDB\User.ts

import bcrypt from 'bcrypt'
import {Schema, model, type Document} from 'mongoose'

// Define an interface representing a user document in MongoDB
export interface IUser extends Document {
  username: string
  password: string
  passwordHash: string
  comparePassword(_password: string): Promise<boolean>
}

const userSchema: Schema<IUser> = new Schema({
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
})

// Define a constant for the salt rounds
const SALT_ROUNDS = 10

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('passwordHash') || this.isNew) {
    const hashedPassword = await bcrypt.hash(this.passwordHash, SALT_ROUNDS)
    this.passwordHash = hashedPassword
  }
  next()
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  this: IUser,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash)
}

export const User = model<IUser>('User', userSchema)
