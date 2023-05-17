import Input from '@components/primitives/input';
import TrashSquare from 'assets/images/inheritors/trash-square.svg';
import { useRef, useState, useEffect } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormProvider } from '@components/primitives/form-provider';
import { useFieldArray } from 'react-hook-form';

const FormOne = () => {
  const { control, watch } = useFormProvider();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inheritors',
  });

  const watchFieldArray = watch('inheritors');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const [list, setList] = useState([0]);
  const inputRefs = useRef([]);

  const currentIndex = list.length - 1;

  function step() {
    // inputRefs.current[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    // const input = inputRefs.current[currentIndex].querySelector('input');
    // setTimeout(() => {
    //   input.focus();
    // }, 200);
  }

  const addInputRef = (el) => {
    // console.log(el, 'EL!!!!');
    // if (el && !inputRefs.current.includes(el)) {
    //   inputRefs.current.push(el);
    // }
  };
  return (
    <div className="">
      <div className="flex flex-col gap-1.5 py-3">
        <p className="text-2xl font-paralucentMedium text-[#001873]">Add Inheritor</p>
        <p className="text-sm font-dmSans text-[#606060]">
          Add additional Vault signatories and specify how many of them have to confirm a transaction before it gets
          executed.
        </p>
      </div>
      <div>
        {controlledFields.map((field, index) => {
          return (
            <div key={field.id} className="mb-3" ref={(el) => addInputRef(el)}>
              <div className="bg-safekeep-hover rounded-lg px-4 py-2.5">
                <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Wallet Address:</p>
                <div className="w-full flex gap-2 items-center">
                  <Input
                    // defaultValue={address[index]}
                    name={`inheritors.${index}.address`}
                    className="w-full border-none focus:border-none"
                  />
                  <div className="rounded-[2px] bg-[#F0FCFF] text-xs font-dmSans text-[#0F1D40] py-0.5 px-1 leading-4 h-5">
                    ETH
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-3 mt-4 items-center">
                <div className="bg-safekeep-hover w-full rounded-lg px-4 py-2.5">
                  <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Signatory Name:</p>
                  <div className="w-full flex items-center">
                    <Input
                      // defaultValue={item == 0 ? '' : item}
                      name={`inheritors.${index}.sigName`}
                      className="w-full border-none focus:border-none"
                    />
                  </div>
                </div>
                <TrashSquare onClick={() => remove(index)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* <button onClick={() => append({})}>Add</button>
      <div ref={inheritorsRef}>
        {list.map((item, index) => (
          <div key={item + index} className={`mb-3 ${index}`} ref={(el) => addInputRef(el)}>
            <div className="bg-safekeep-hover rounded-lg px-4 py-2.5">
              <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Wallet Address:</p>
              <div className="w-full flex gap-2 items-center">
                <Input
                  defaultValue={address[index]}
                  name={`inh-address-${index}`}
                  className="w-full border-none focus:border-none"
                />
                <div className="rounded-[2px] bg-[#F0FCFF] text-xs font-dmSans text-[#0F1D40] py-0.5 px-1 leading-4 h-5">
                  ETH
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3 mt-4 items-center">
              <div className="bg-safekeep-hover w-full rounded-lg px-4 py-2.5">
                <p className="text-xs font-dmSans text-[#B2B7C2] mb-1">Signatory Name:</p>
                <div className="w-full flex items-center">
                  <Input
                    defaultValue={item == 0 ? '' : item}
                    name={`inh-sigName-${index}`}
                    className="w-full border-none focus:border-none"
                  />
                </div>
              </div>
              <TrashSquare onClick={() => handleRemove(index)} />
            </div>
          </div>
        ))}
      </div> */}
      <button
        type="button"
        onClick={() => append({})}
        //  onClick={handleIncrease}
        className="flex items-center text-center  mx-auto justify-between"
      >
        <PlusIcon className="scale-125" />
      </button>
    </div>
  );
};

export default FormOne;
