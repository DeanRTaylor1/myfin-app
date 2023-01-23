import { XMarkIcon } from '@heroicons/react/24/solid';
import { PropsWithChildren } from 'react';

interface StockContainerProps extends PropsWithChildren {
  deleteHandler: (code: string) => void;
  code: string;
}

const StockContainer: React.FC<StockContainerProps> = (props) => {
  const { deleteHandler, code } = props;
  console.log(code)
  return (
    <div className='relative z-10 bg-white w-full aspect-video max-w-[900px]  h-fit border  flex flex-col justify-between items-center rounded-md p-2'>
      <div
        onClick={() => deleteHandler(code)}
        className='absolute top-4 right-4 hover:opacity-75'
      >
        <XMarkIcon className='h-6 w-6' />
      </div>
      {props.children}
    </div>
  );
};

export default StockContainer;
