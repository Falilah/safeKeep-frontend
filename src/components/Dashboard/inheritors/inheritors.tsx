import Button from '@components/primitives/button';
import usePersistedId from '@components/primitives/utils/use-persisted-id';
import { PlusIcon } from '@radix-ui/react-icons';
import { useGetInheritorsQuery } from '@services/inheritors';
import SingleInheritors from './single-inheritor';
import EmptyInheritors from './empty-inheritors';

const Loader = () => {
  const id = usePersistedId();
  return (
    <>
      <div className="w-full mt-16 flex gap-2 flex-wrap lg:flex-nowrap">
        {new Array(2).fill(0).map(() => (
          <div className="w-full lg:max-w-[50%]" key={id}>
            {' '}
            <LoadSingleInheritors />{' '}
          </div>
        ))}
      </div>
    </>
  );
};
const Error = ({ retry, error = 'Error Occurred' }) => {
  return (
    <>
      {error} <button onClick={retry}>Try again</button>
    </>
  );
};

const AllInheritors = ({ setToggleModal }) => {
  const { data, isLoading, isError, isSuccess, refetch, error, isFetching } = useGetInheritorsQuery(0);
  // console.log(isLoading, isFetching, error, isError, data, 'data');

  if (isLoading) return <Loader />;
  if (isError) return <Error error={'error'} retry={() => {}} />;

  if (!data?.data?.length) return <EmptyInheritors setToggleModal={setToggleModal} />;
  return (
    <div className="w-full mt-16 flex gap-3 flex-wrap ">
      {data?.data?.map((info) => (
        <div className="w-full lg:max-w-[49%] mb-2">
          <SingleInheritors {...info} />
        </div>
      ))}
    </div>
  );
};

export default AllInheritors;

const LoadSingleInheritors = () => {
  return (
    <div className="mx-auto flex flex-col gap-2.5 items-center w-full p-2.5 bg-[#FFFFFF] mt-16 rounded-[10px] shadow-sm">
      <div className="w-full p-4 flex justify-between items-start ">
        <div className="flex gap-2 items-center  w-full">
          <div className="p-7 bg-loader-one  rounded-full animate-pulse"></div>
          <div className="gap-1 flex flex-col w-[60%]">
            <div className="w-full animate-pulse  bg-loader-one py-4  rounded-3xl"></div>
            <div className="animate-pulse  bg-loader-one py-2 w-[30%] rounded-3xl"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="animate-pulse bg-loader-one rounded-full w-6 h-6"></div>
          <div className="animate-pulse bg-loader-one rounded-full w-6 h-6"></div>
        </div>
      </div>
      <div className="w-full bg-[#F3FDFF] p-2.5 rounded-lg flex justify-between">
        <div className="w-1/2">
          <div className="animate-pulse bg-loader-one rounded-full w-1/2 h-4"></div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="animate-pulse bg-loader-one rounded-full w-12 h-4"></p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-1 items-center">
            <p className="animate-pulse bg-loader-one rounded-full w-12 h-4"></p>
          </div>
          <div className="w-5 mt-2 h-5 animate-pulse bg-loader-one rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
