import Radio from '@components/primitives/input/radio';
import Input from '@components/primitives/input';
import TrashSquare from 'assets/images/inheritors/trash-square.svg';
import Select, { SelectOption } from '@components/primitives/select';
import TetherIcon from '@images/transfer/tether.svg';
import BlueArrowDown from 'assets/images/inheritors/arrow-down-blue.svg';
import { FormStepProps } from 'interface';
import { truncateWalletAddress } from '@utils/index';
import { useFormProvider } from '@components/primitives/form-provider';

const FormThree = () => {
  const { watch } = useFormProvider();
  const data = watch('inheritors');
  return (
    <div className="">
      <div className="flex flex-col gap-1.5 py-3">
        <p className="text-2xl font-paralucentMedium text-[#001873]">Allocate Token</p>
        <p className="text-sm font-dmSans text-[#606060]">
          Set the Token balance you want transferred to this Eth Wallet Address.
        </p>
      </div>

      {data.map((i, index) => (
        <div key={i}>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Allocate Amount</p>
              </div>
              <div className="text-sm ml-3 my-1">
                {truncateWalletAddress(i.address)} - <span>{i.sigName}</span>{' '}
              </div>
            </div>

            <div className="w-full flex gap-2 items-center bg-safekeep-hover rounded-lg">
              <Input
                name={`inh-amount-${index}`}
                className="w-full h-[60px]  border-none focus:border-none"
                placeholder="Amount"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormThree;
