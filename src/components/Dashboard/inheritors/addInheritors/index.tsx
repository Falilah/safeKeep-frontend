import { useState } from 'react';
import FormProvider from '@components/primitives/form-provider';
import FormOne from './form-one';
import FormTwo from './form-two';
import FormThree from './form-three';
import FormFour from './form-four';
import FormProfile from 'assets/images/inheritors/form-profile.svg';
import Modal from '@components/primitives/modal';
import ModalDescription from '@components/primitives/modal/body';
import ModalTitle from '@components/primitives/modal/title';
import Button from '@components/primitives/button';
import { useCreateInheritorsMutation } from '@services/inheritors';

export const getFormDetails = (e) => {
  const email = [];
  const amount = [];
  const dec = { 'inh-email': email, 'inh-amount': amount };

  for (const key in e) {
    const strippedKey = key.split('-').slice(0, -1).join('-');
    const pos = +key.split('-').pop();
    const whereToPush = dec[strippedKey];

    if (whereToPush) {
      whereToPush[pos] = e[key];
    }
  }

  return { email, amount };
};

const defaultValue = {
  amount: [],
  address: [],
  name: [],
  email: [],
  inheritors: [],
};
const FINAL_STEP = 5;

const Sendin = () => {
  return (
    <>
      <Modal open={true}>In Proress</Modal>
    </>
  );
};

const Success = ({ open, setOpen }) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        Success
      </Modal>
    </>
  );
};
const AddInheritors = ({ modal, setModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createInheritors, { isLoading, isSuccess }] = useCreateInheritorsMutation();
  const [isError, setIsError] = useState('');

  const handleSubmit = async (e) => {
    const { email, amount } = getFormDetails(e);

    if (currentStep < FINAL_STEP) return;
    setCurrentStep((step) => step - 1);
    const data = {
      vaultId: '1',
      inheritorArray: e.inheritors.map((i, index) => {
        return {
          ...i,
          email: email[index].toLowerCase(),
          amount: +amount[index],
          address: i.address.toLowerCase(),
          // sigName: i.sigName,
        };
      }),
    };

    try {
      await createInheritors(data).unwrap();
    } catch (e) {
      setIsError(e.data.error);

      console.error(e.data.error, 'Error appedned');
    }
  };

  const formSteps = {
    1: <FormOne />,
    2: <FormTwo />,
    3: <FormThree />,
    4: <FormFour error={isError} />,
  };

  if (isLoading) return <Sendin />;
  if (isSuccess) return <Success open={modal} setOpen={() => setModal(isSuccess)} />;
  return (
    <Modal
      open={modal}
      setOpen={setModal}
      className="w-full overflow-auto max-h-118 max-w-[432px] p-9 lg:max-w-[462px] bg-[#FFFFFF] mx-auto"
    >
      <div className="w-full">
        <ModalTitle>
          <FormProfile />
        </ModalTitle>
        <ModalDescription>
          <FormProvider onSubmit={handleSubmit}>
            {formSteps[currentStep]}

            <div className="flex mt-6 gap-2 justify-between ">
              {currentStep > 1 && (
                <Button className="w-full" onClick={() => setCurrentStep((step) => +step - 1)}>
                  Prev
                </Button>
              )}
              <Button
                className="w-full"
                onClick={() => setCurrentStep((step) => (step === FINAL_STEP ? step : +step + 1))}
              >
                {currentStep + 1 === FINAL_STEP ? ' Create ' : 'Next'}
              </Button>
            </div>
          </FormProvider>
        </ModalDescription>
      </div>
    </Modal>
  );
};

export default AddInheritors;
