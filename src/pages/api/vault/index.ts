import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import connectDB from '@server/config/db';
import vaultDb from '@server/models/vault';
import userDb from '@server/models/user';
import { ICreateVault } from 'interface';
import { isAuthenticated } from '@lib/auth';

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create vault
router.post(async (req, res) => {
  const { vaultName, vaultAddress, backupAddress, backupName } = req.body;

  if (!vaultName || !vaultAddress || !backupAddress || !backupName) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  const { data: tokenInfo, status, reason } = await isAuthenticated(req);
  const tokenData = await tokenInfo;

  try {
    if (!status) {
      return res.status(403).json({
        status: false,
        message: reason,
      });
    }

    // @ts-ignore
    const creatingVault = await vaultDb.findOne({ vaultAddress });
    if (creatingVault) {
      return res.status(423).send({ status: false, message: 'This vault already exists' });
    }
    const data: ICreateVault = {
      owner: tokenData?.address,
      vaultAddress: vaultAddress.toLowerCase(),
      vaultName: vaultName.toLowerCase(),
      backupAddress: backupAddress.toLowerCase(),
      backupName,
      vaultId: 1,
    };

    const created = new vaultDb({
      ...data,
    });
    await created.save();
    const userUpdates = await userDb?.findOneAndUpdate(
      {
        address: tokenData?.address?.toLocaleLowerCase(),
      },
      {
        $push: {
          vaults: {
            _id: created._doc._id,
            vaultName: vaultName.toLowerCase(),
            vaultAddress: vaultAddress.toLowerCase(),
          },
        },
      }
    );

    return res.status(200).json({
      status: true,
      message: `vault created successfully`,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

router.get(async (req, res) => {
  const { data: tokenData } = await isAuthenticated(req);

  const token = await tokenData;
  if (token.expired) {
    return res.status(401).json({
      error: 'token expired',
      status: false,
    });
  }
  // console.log(token, 'token~!!!');
  try {
    const vaults = await vaultDb.find({ owner: token.address });
    return res.status(200).json({
      data: vaults,
      status: true,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'server Error',
      status: false,
    });
  }
});
interface IQuery {
  type?: string | string[] | undefined;
  page?: number | string;
}
router.get(async (req, res) => {
  const { type }: IQuery = req.query;

  try {
    // @ts-ignore
    const users = await vaultDb.find({
      ...(!!type && { type }),
    });

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      error: 'server error',
    });
  }
});

export default router.handler({
  // @ts-ignore
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
