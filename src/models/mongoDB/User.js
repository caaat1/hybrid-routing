// src\services\auth\mongoDB\model\User.js
import {hash, compare} from 'bcrypt';
import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  username: {type: String, required: true},
  passwordHash: {type: String, required: true}, // Use passwordHash instead of password
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash') || this.isNew) {
    this.passwordHash = await hash(this.passwordHash, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return compare(password, this.passwordHash);
};

export default model('User', userSchema);
