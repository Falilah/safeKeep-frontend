import Input from '@components/primitives/input';
import { truncateWalletAddress } from '@utils/index';
import { useFormProvider } from '@components/primitives/form-provider';

const FormTwo = () => {
  const { watch } = useFormProvider();
  const data = watch('inheritors');

  return (
    <div className="">
      <div className="flex flex-col gap-1.5 py-3">
        <p className="text-2xl font-paralucentMedium text-[#001873]">Inheritors Email Address</p>
        <p className="text-sm font-dmSans text-[#606060]">
          To ensure your allocated assets are promptly claimed by the inheritor, Safekeep automatically reminds them via
          an email address you provide below.
        </p>
      </div>
      {data.map((i, index) => (
        <div key={i}>
          <div className="bg-safekeep-hover rounded-lg mt-6 w-full">
            <div className="text-sm ml-3 my-1">
              {truncateWalletAddress(i.address)} - <span>{i.sigName}</span>{' '}
            </div>
            <Input
              name={`inh-email-${index}`}
              className="p-4 rounded-lg w-full border-none focus:border-none placeholder:text-[#B2B7C2] text-xs font-dmSans"
              placeholder="Enter email here"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormTwo;
