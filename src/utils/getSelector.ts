import { ethers } from 'ethers';

function getSelector(_func) {
  // const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(_func));
  // const re = ethers.utils.id(_func).substring(0, 10);
  const hash = ethers.utils.hexDataSlice(ethers.utils.id(_func), 0, 4);
  return hash;
}

export default getSelector;
