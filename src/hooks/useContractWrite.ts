import { useContractWrite as useCWrite, usePrepareContractWrite, useFeeData } from 'wagmi';
import safekeepAbi from '../abi/safekeep.json';
import vaultSpawnerAbi from '../abi/vaultSpawner.json';
import { CONTRACT_ADDRESS } from '../config/app';
import { ethers } from 'ethers';

const sampleInh = ['0x00Bd2208E8eAA79e1771bd1EAF0b7c0469deF169'];
const sampleWei = ['20000000000'];
const sampleBack = '0x590dfed9e8c54c48bcbf006645380fe76b00b608';
const sampleE = '1000000000000000000';
const sampleData = [sampleInh, sampleWei, sampleE, sampleBack];

const useContractWrite = ({ enabled = false, functionName, args = [] }) => {
  const { data: { gasPrice = '0' } = {} } = useFeeData();
  // const providerSigner = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = providerSigner.getSigner();
  // const contract = new ethers.Contract(CONTRACT_ADDRESS, vaultSpawnerAbi, signer);
  // const own = contract.createVault(...sampleData).then((d) => console.log(d, 'Data Vault'));

  // console.log(own, 'own cecked', contract);

  const { config, error } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: vaultSpawnerAbi,
    functionName,
    enabled,
    overrides: {
      value: ethers.utils.parseEther('1'),
    },
    args,
    chainId: 11155111,
    onError(error) {
      console.log('Error', error);
    },
    onSuccess(data) {
      console.log('Success', data);
    },
  });

  console.log(config, 'CONFIG CHECK');

  const writeData = useCWrite(config);

  return { error, ...writeData };
};

export default useContractWrite;
