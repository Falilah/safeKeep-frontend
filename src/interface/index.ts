import { Dispatch, SetStateAction } from 'react';
export interface IChild {
  children: React.ReactNode;
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
  amount:string [];
  name?: string[];
  email:string[]
  
}

export interface FormStepProps {
  setStep: Dispatch<SetStateAction<string | number>>;
}
