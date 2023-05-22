import { Dispatch, SetStateAction } from 'react';
export interface IChild {
  children: React.ReactNode;
}

const input = {
  _func: 'counter()',
  returnArr: ['uint256'],
  value: [],
  typeArr: [],
};

export interface IContractInput {
  _func: string;
  returnArr?: string[];
  typeArr: string[];
  valueArr: Array<any>;
}
// address[] calldata _inheritors,
// uint256[] calldata _weiShare,
// uint256 _startingBal,
// address _backupAddress
type EthereumAddress = string & { __brand: 'ethereumAddress' };
export interface IContractCreateVault {
  _inheritors: [EthereumAddress];
  _weiShare: [string];
  _startingBal: number;
  _backupAddress: EthereumAddress;
}
export interface IToken {
  address: string;
  iat: number;
  exp: number;
  nonce: string;
  expired?: boolean;
}
export interface ICreateVault {
  vaultName: string;
  owner?: string;
  vaultAddress: string;
  backupName: string;
  backupAddress: string;
  vaultId: number;
}

export interface ICreateUser {
  address: string;
}
export interface ISlide {
  id?: number;
  title: string;
  description: string;
  image: string;
}

export interface ICreateInhFormData {
  address: string[];
  amount: string[];
  name?: string[];
  email: string[];
}

export interface FormStepProps {
  setStep: Dispatch<SetStateAction<string | number>>;
}
