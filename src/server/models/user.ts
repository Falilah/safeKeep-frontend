import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const userScheme = {
  name: {
    type: String,
  },
  vaults: [],
  address: {
    type: String,
    required: 'Wallet address is required',
  },
  currentNonce: {
    type: String,
  },
};

const userSchema = new Schema({ ...userScheme }, { timestamps: true });
const users = mongoose.models.user || mongoose.model('user', userSchema, 'user');
export default users;
