import toast from 'react-hot-toast';
import { getNetwork } from '@wagmi/core';

const customToast = (message = 'sample msg', hash = 'has') => {
  const { chain } = getNetwork();
  console.log(chain?.blockExplorers?.default?.url, 'CAIN TOAST');
  return toast((t) => `${message}\n\n <a href=${hash}> Click here for more details </a>.`, {
    duration: 6000,
    style: {},
  });
};

export default customToast;
