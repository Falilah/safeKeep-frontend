import FormAlert from '@components/primitives/form-alert';
import { useFormProvider } from '@components/primitives/form-provider';
import Input from '@components/primitives/input';
import { ICreateInhFormData } from 'interface';
import { getFormDetails } from '.';

interface IProps {
  error: string;
}

const FormFour = ({ error }: IProps) => {
  const { watch } = useFormProvider();
  const providerData = watch();
  const { amount } = getFormDetails(providerData);
  const data = providerData.inheritors;


  return (
    <div className="">
      <div className="flex flex-col gap-1.5 py-3">
        <p className="text-2xl font-paralucentMedium text-[#001873]">Review Add Inheritor</p>
      </div>
      {error && <FormAlert className="text-[#FF8A8A] text-xs font-semibold my-1 capitalize">{error}</FormAlert>}

      {data &&
        data.map((i, index) => (
          <div key={i} className="rounded-lg bg-safekeep-hover mb-3">
            <div className="bg-safekeep-hover px-4 py-2.5">
              <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Inheritors Wallet Address</p>
              <div className="w-full flex gap-2 items-center">
                <Input
                  isFormContext={false}
                  value={i.address}
                  disabled
                  name="disp-address"
                  className="w-full border-none focus:border-none"
                />
              </div>
            </div>
            <div className="w-full flex gap-3 bg-safekeep-hover">
              <div className="bg-safekeep-hover w-full lg:max-w-[50%] px-4 py-2.5">
                <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Inheritors Name</p>
                <div className="w-full flex gap-2 items-center">
                  <Input
                    isFormContext={false}
                    name="disp-sigName"
                    value={i.sigName}
                    disabled
                    className="w-full border-none focus:border-none"
                  />
                </div>
              </div>
              <div className="bg-safekeep-hover w-full lg:max-w-[50%] px-4 py-2.5">
                <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Allocate Amount</p>
                <div className="w-full flex gap-2 items-center">
                  <Input
                    isFormContext={false}
                    name="disp-amount"
                    value={amount[index]}
                    disabled
                    className="w-full border-none focus:border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FormFour;
