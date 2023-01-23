export type DashBoardBoxProps = {
  title: string;
  value: string;
};

const DashBoardBox: React.FC<DashBoardBoxProps> = ({ title, value }) => {
  return (
    <div className='w-full md:w-[18rem] bg-white aspect-video rounded-md flex flex-col p-4 border-t-8 border-blue-500 shadow-md '>
      <span className='font-bold text-xl flex justify-center items-center'>
        {title}
      </span>
      <div className='w-full h-full flex justify-center items-center'>
        <span className='font-bold text-4xl hover:cursor-pointer hover:underline underline-offset-4'>
          {value}
        </span>
      </div>
    </div>
  );
};

export default DashBoardBox;
