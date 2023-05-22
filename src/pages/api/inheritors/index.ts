import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import connectDB from '@server/config/db';
import inheritorsDb from '@server/models/inheritors';
import vaultDb from '@server/models/vault';
import assetsDb from '@server/models/asset';
import { isAuthenticated } from '@lib/auth';

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const { data: tokenInfo, status, reason } = await isAuthenticated(req);
  const tokenData = await tokenInfo;

  if (tokenData.expired) {
    return res.status(401).json({
      error: 'token expired, login again',
    });
  }
  const { vaultId, inheritorArray } = req.body;

  const updatedDocuments = inheritorArray.map((doc) => {
    return {
      ...doc,
      vaults: [+vaultId],
      createdBy: tokenData?.address,
      ethShare: doc.amount,
    };
  });
  try {
    await inheritorsDb.insertMany(updatedDocuments);
    // create assets /find
    // const asset = await assetsDb.findOne({ vaultId, beneficiary: address });
    // let currentAsset;
    // const assets = {
    //   allocated: asset ? +asset._doc.allocated + +amount : 0,
    //   address: tokenAddress,
    //   type: assetType,
    //   inheritor: address,
    //   vaultId,
    //   createdBy: tokenData?.address,
    // };
    // if (!asset) {
    //   currentAsset = await assetsDb.create(assets);
    // } else {
    //   currentAsset = await assetsDb.updateOne(
    //     { address },
    //     {
    //       $set: {
    //         amount: +asset._doc.amount + +amount,
    //       },
    //     }
    //   );
    // }

    // // check if assets is already in vault, add or update it
    const findVault = await vaultDb.findOne({ vaultId: +vaultId });
    if (!findVault?._doc?._id) {
      // vault not available
      res.status(404).json({
        error: 'vault not found',
      });
    }

    // link inheritor to vault
    await vaultDb.updateOne(
      { vaultId },
      {
        $push: {
          inheritors: { $each: updatedDocuments, $position: 0 },
        },
        $set: {
          totalWeiAllocated:
            +findVault._doc.totalWeiAllocated +
            updatedDocuments.reduce((accumulator, current) => accumulator + +current.amount, 0),
        },
      }
    );

    return res.status(201).json({
      message: 'Resource created',
      status: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Server Error',
      error: e,
      status: false,
    });
  }
});
router.get(async (req, res) => {
  try {
    // @ts-ignore
    const users = await inheritorsDb.find({});
    return res.status(200).json({
      data: users,
      status: true,
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      status: false,
    });
  }
});

export default router.handler({
  // @ts-ignore
  onError: (err, req, res, next) => {
    console.error(err.stack, 'Error Stack');
    res.status(500).end('Something broke!' + err.stack);
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
