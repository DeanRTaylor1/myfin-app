import { Fragment } from 'react';

const Stripes: React.FC = () => {
  return (
    <Fragment>
      <div className=' md:hidden bg-blue-400 fixed h-12 w-wl left-40 -rotate-12 z-0'></div>
      <div className='md:hidden bg-blue-400 fixed h-12 w-wl right-40 top-2/3 -rotate-12 z-0'></div>
    </Fragment>
  );
};

export default Stripes;
