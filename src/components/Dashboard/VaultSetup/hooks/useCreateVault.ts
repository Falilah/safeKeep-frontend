import writeContract from '@utils/writeContract';
import { useState } from 'react';
import vaultSpawnAbi from '../../../../abi/vaultSpawner.json';

export const useData = (func, preConfig = {}) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const state = {
    setIsPending,
    setIsSuccess,
  };
  async function callData(input) {
    const totalInput = {
      ...preConfig,
      ...input,
    };
    setLoading(true);
    setIsError(false);
    try {
      const re = await func(totalInput, state);
      setLoading(false);
      return re;
    } catch (e) {
      setIsError(e);
      setIsPending(false);
      setIsSuccess(false);
      setLoading(false);
    }
  }

  return { callData, loading, setLoading, isError, setIsError, isPending, isSuccess };
};
export const useCreateVault = () => {
  const preConfig = {
    functionName: 'createVault',
    abi: vaultSpawnAbi,
    eventName: 'VaultCreated',
  };
  const returnData = useData(writeContract, preConfig);

  return returnData;
};
