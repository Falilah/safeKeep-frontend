import CircleLogo from 'assets/images/ConnectWallet/circle-logo.svg';
import Modal from '@components/primitives/modal';
import ModalDescription from '@components/primitives/modal/body';
const LoadingModal = ({ header = ' ', message = '' }) => {
  return (
    <Modal open={true}>
      <ModalDescription>
        <div className="w-full">
          <div className="">
            <div className="flex flex-col bg-[#FFFFFF] rounded-[18px] py-9 px-8 items-center gap-12">
              <h2 className="font-paralucentMedium text-[#001873] text-xl leading-5 tracking-tighter">{header}</h2>

              <CircleLogo />
              <p className="text-xs leading-3 tracking-tighter text-[#001268]">
                {/* please confirm the transaction on your connected wallet */}
                {message}
              </p>
            </div>
          </div>
        </div>
      </ModalDescription>
    </Modal>
  );
};

export default LoadingModal;
