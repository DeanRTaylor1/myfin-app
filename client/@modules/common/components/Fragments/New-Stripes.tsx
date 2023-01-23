import { Fragment, useEffect, useState } from 'react';

const Newsstripes: React.FC = () => {
  const [stripes, setStripes] = useState<any>(null);
  const stripe = (
    <Fragment>
      <div className=' md:hidden bg-blue-400 fixed h-12 w-wl left-40 -rotate-12 z-0'></div>
      <div className='md:hidden bg-blue-400 fixed h-12 w-wl right-40 top-2/3 -rotate-12 z-0'></div>
    </Fragment>
  );

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 5; i++) {
      temp.push(stripe);
    }
    setStripes(temp);
  }, []);

  return (
    <Fragment>
      <div className='flex flex-col justify-between'>
        {stripes && stripes.map((stripe: any) => stripe)}
      </div>
    </Fragment>
  );
};

export default Newsstripes;
