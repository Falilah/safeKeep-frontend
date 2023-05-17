import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VaultSchema = new Schema(
  {
    vaultName: {
      type: String,
    },
    owner: {
      type: String,
    },
    backupAddress: {
      type: String,
    },
    vaultAddress: {
      type: String,
    },
    backupName: {
      type: String,
    },
    vaultId: {
      type: Number,
    },
    totalWeiAllocated: {
      type: Number,
      default: 0,
    },
    assets: [],
    inheritors: [],
  },

  { timestamps: true }
);
const Vaults = mongoose.models.vault || mongoose.model('vault', VaultSchema, 'vault');
export default Vaults;
