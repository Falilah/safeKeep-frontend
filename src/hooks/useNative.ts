import { useNetwork } from 'wagmi';

const useNativeToken = () => {
  const { chain } = useNetwork();

  return chain?.nativeCurrency?.symbol ?? 'Et';
};

export default useNativeToken;
