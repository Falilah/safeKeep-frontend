import mongoose from 'mongoose';
const Schema = mongoose.Schema;

enum assetType {
  'erc20' = 'erc20',
  'erc721' = 'erc721',
  'erc1155' = 'erc1155',
}

const assetSchema = new Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    decimal: {
      default: 18,
    },
    allocated: { type: Number, default: 0 },
    inheritor: {
      type: String,
    },
    createdBy: { type: String },
    type: {
      type: assetType,
    },
    address: {
      type: String,
      required: 'address is required',
    },
  },

  { timestamps: true }
);
const asset = mongoose.models.asset || mongoose.model('asset', assetSchema, 'asset');
export default asset;
