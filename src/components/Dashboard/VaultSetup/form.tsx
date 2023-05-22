import { useState, Dispatch, SetStateAction } from 'react';
import FormTwo from './formTwo';
import FormOne from './formOne';
import FormProvider from '@components/primitives/form-provider';
import FormThree from './formThree';
import VaultCreatedForm from './vaultCreatedForm';
import LoadingModal from './loadingModal';
import { useCreateVaultMutation } from '@services/api';
import { useCreateVault } from './hooks/useCreateVault';
import customToast from '@utils/customToast';
import mined from '@components/toast';

interface FormProps {
  setCreateVault: Dispatch<SetStateAction<boolean>>;
}

const sampleInh = ['0x00Bd2208E8eAA79e1771bd1EAF0b7c0469deF169'];
const sampleWei = ['20000000000'];
const sampleBack = '0x590dfed9e8c54c48bcbf006645380fe76b00b608';
const sampleE = '1000000000000000000';
const sampleData = [sampleInh, sampleWei, sampleE, sampleBack];

interface IFormData {
  vaultName?: string;
  backupAddress?: string;
  backupName?: string;
  _startingBal?: string;
}
const Form = ({ setCreateVault }: FormProps) => {
  const [step, setStep] = useState('step-one');
  const [formData, setFormData] = useState<IFormData>({});
  const [vaultCreatedAdd, setCreateAdd] = useState('');
  const {
    callData,
    loading: vaultCreateLoading,
    setLoading: vaultSetLoading,
    isError: valutCreateError,
    isPending,
  } = useCreateVault();
  const [createVaultMut, { ...actionStatus }] = useCreateVaultMutation();
  const vaultLoading = actionStatus?.isLoading;
  const vaultCreated = actionStatus?.isSuccess;

  const handleSubmit = async (e) => {
    setFormData((prevData) => ({ ...prevData, ...e }));
    if (step === 'step-one') {
      setStep('step-two');
      return;
    }
    if (step === 'step-two') {
      setStep('step-three');
      return;
    }

    const inputData = {
      value: formData._startingBal,
      data: [new Array(), new Array(), String(+formData._startingBal * 1e18), formData?.backupAddress],
    };
    try {
      const vaultAddress = await callData(inputData);

      if (vaultAddress) {
        setCreateAdd(vaultAddress);
        await createVaultMut({ ...formData, vaultAddress });
      }

      // console.log(vaultAddress, 'Response');
    } catch (e) {
      console.log(e, 'Error');
    }
  };

  const handleBackButton = (e) => {
    if (step === 'step-one') setCreateVault(false);
    if (step === 'step-two') setStep('step-one');
    if (step === 'step-three') setStep('step-two');
  };
  return (
    <div className="w-full">
      {!vaultCreated && (
        <>
          <div className="w-full max-w-[590px] mx-auto flex justify-end mb-3.5 lg:hidden">
            <button className="px-4 py-2 bg-safe-light-100 rounded-lg gap-2.5">
              <span onClick={handleBackButton} className="font-paralucentLight leading-4 text-sm text-[#01A0FF]">
                Back
              </span>
            </button>
          </div>

          {step === 'step-one' && (
            <FormProvider onSubmit={handleSubmit}>
              <FormOne setCreateVault={setCreateVault} />
            </FormProvider>
          )}
          {step === 'step-two' && (
            <FormProvider onSubmit={handleSubmit}>
              <FormTwo setStep={setStep} />
            </FormProvider>
          )}
          {step === 'step-three' && (
            <FormProvider onSubmit={handleSubmit}>
              <FormThree setStep={setStep} formData={formData} actionStatus={actionStatus} />
            </FormProvider>
          )}
        </>
      )}
      {vaultCreateLoading && !isPending && (
        <LoadingModal header="Waiting approval" message="please confirm the transaction on your connected wallet" />
      )}

      {vaultLoading && !vaultCreated && (
        <LoadingModal header="Saving Meta Data" message="Saving Your Vault Meta Data" />
      )}

      {isPending && <LoadingModal header="Processing " message="Processing Your Transaction, Please await!" />}

      {vaultCreated && <VaultCreatedForm address={vaultCreatedAdd} />}
    </div>
  );
};

export default Form;
