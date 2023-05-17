import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inheritorSchema = new Schema(
  {
    networkId: {
      type: Number,
      default: 1,
    },
    createdBy: {
      type: String,
    },
    sigName: {
      type: String,
    },
    ethShare: {
      type: Number,
      default: 0,
    },
    vaults: [],
    address: {
      type: String,
      required: 'Inheritors address is required',
    },
    email: {
      type: String,
    },
  },

  { timestamps: true }
);
const inheritors = mongoose.models.inheritor || mongoose.model('inheritor', inheritorSchema, 'inheritor');
export default inheritors;
