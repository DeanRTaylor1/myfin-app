import { PropsWithChildren } from 'react';

const DashboardChartContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='aspect-video w-full bg-white mr-6 ml-6 border-t-8 border-blue-500  shadow-md rounded-md p-2 text-xs flex flex-col items-center justify-center'>
      {children}
    </div>
  );
};

export default DashboardChartContainer;
