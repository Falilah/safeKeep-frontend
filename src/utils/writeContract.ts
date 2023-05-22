import { ethers } from 'ethers';
import { CONTRACT_ADDRESS as contractAddress } from '@config/app';
import toastTxn, { toastNotification } from '@components/toast';

async function getEvents(input) {
  const { transactionHash, contractABI, eventName, contractAddress } = input;

  const rpcUrl = process.env.NEXT_PUBLIC_RPC;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const receipt = await provider.getTransactionReceipt(transactionHash);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const filter = contract.filters[eventName]();

  const logs = receipt.logs.filter((log) => filter.topics.includes(log.topics[0]));
  const events = logs.map((log) => contract.interface.parseLog(log));
  const ev = events?.[0]?.args.map((i) => i.toString());
  return ev;
}

async function writeContract(inputData, state) {
  const { abi, value, data, functionName, eventName } = inputData;
  const { setIsPending, setIsSuccess } = state;

  if (!window?.ethereum) return;
  const providerSigner = new ethers.providers.Web3Provider(window.ethereum);
  const signer = providerSigner.getSigner();
  setIsPending?.(false);
  setIsSuccess?.(false);

  try {
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const own = await contract?.[functionName](...data, {
      ...(value && { value: ethers.utils.parseEther(value) }),
    });

    setIsPending?.(true);

    const hash = own?.hash;
    toastTxn(hash);
    const wait = await own.wait();
    if (wait.status !== 1) {
      setIsPending?.(false);
      toastTxn(hash, 'Transaction Failed, Try Again');
      return;
    }
    const eventData = { transactionHash: hash, contractABI: abi, eventName, contractAddress };
    const [vaultAddress] = await getEvents(eventData);
    toastTxn(hash, 'Transaction Completed Successffully');
    // console.log(v, 'VAULT DETAILS');
    // console.log(vaultAddres, msgSender, 'EVENT DETAILS');
    setIsSuccess?.(true);
    setIsPending?.(false);
    return vaultAddress;
    // const owner = await signer.getAddress();
    // if (owner == msgSender) {
    // }
  } catch (error) {
    const msg = error?.message.split('(');

    if (msg?.[0].includes('user rejected tra')) {
      toastNotification('error', msg?.[0]);
    }
    toastNotification('error', 'An Error Occurred');
    console.error('Error sending transaction:', error);
  }
}

export default writeContract;
