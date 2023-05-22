import toast from 'react-hot-toast';
import { getNetwork } from '@wagmi/core';
import { truncateWalletAddress } from '@utils/index';
import { CrossCircledIcon } from '@radix-ui/react-icons';

export const toastTxn = (
  hash = '0x0ef49ec7c279c8189a953d41066adf66d2be1181f6493f897d01ff0fa4b0036e',
  message = 'Transaction Submitted Successfully'
) => {
  const { chain } = getNetwork();
  const explorer = chain?.blockExplorers?.default?.url;
  return toast((t) => (
    <div className="relative">
      <div className="text-center mx-auto">
        <div>{message}</div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline my-2 text-[14px] text-safekeep-blue"
            href={`${explorer}/tx/${hash}`}
          >
            {' '}
            click here for details {truncateWalletAddress(hash)}
          </a>
        </div>
      </div>
      <button className="absolute -top-2 -right-4" onClick={() => toast.dismiss(t.id)}>
        <CrossCircledIcon />
      </button>
    </div>
  ));
};

export const toastNotification = (type = 'success', msg = 'An Error Occurred') => {
  return toast[type](msg);
};
export default toastTxn;
