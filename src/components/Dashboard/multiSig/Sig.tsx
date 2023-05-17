import Image from "@components/primitives/image";
import RemoveSig from "@components/Dashboard/multiSig/Remove";

const Sig = ({ className = "", hideActions = false }) => {
    return (
      <>
        <div className="">
          <div className={`flex justify-between ${className}`}>
            <div className="flex">
              <div className="w-12 h-12 rounded-full bg-safekeep-blue-500 mr-2"></div>
              <div>
                <div className="text-safe-green-800 bg-safe-green-100  p-1 rounded-xl px-2">eth:0x45E7b6...8F497410</div>
                <div className="text-xs text-safekeep-gray-200">My Friend</div>
              </div>
            </div>
            {!hideActions && (
              <div className="flex items-center">
                <div className="mr-3">
                  <button>
                    <Image width={20} height={20} src="/copy.svg" />
                  </button>
                </div>
                <div className="mr-3">
                  <button>
                    <Image width={20} height={20} src="/eye.svg" />
                  </button>
                </div>
                <div className="mr-3">
                  <RemoveSig>
                    <button>
                      <Image width={20} height={20} src="/trash.svg" />
                    </button>
                  </RemoveSig>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  export default Sig