import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface IModal {
  Toggle?: any;
  Title?: any;
  Description?: any;
  children: React.ReactNode;
  open: boolean;
  className?: string;
  setOpen?: (b: boolean | Function) => void;
}
const Modal = ({ Toggle, Title, children, Description, open = false, className, setOpen }: IModal) => (
  <Dialog.Root open={open} modal={true} onOpenChange={setOpen}>
    {Toggle && Toggle}
    <Dialog.Portal>
      <Dialog.Overlay className={`bg-blackA9 fixed inset-0`} />
      <Dialog.Content
        className={`fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-safekeep-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none  ${className}`}
      >
        {Title && <Title />}
        {Description && <Description />}
        {children}
        <Dialog.Close asChild>
          <button
            onClick={() => setOpen(false)}
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon className="scale-125" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
