import { Fragment, useEffect, useState } from 'react';

const ConfirmOAuth: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Fragment>
      <div className='h-full w-full flex justify-center items-center font-extrabold gap-2 text3xl'>
        Success! You&apos;ll be redirected shortly...{' '}
      </div>
    </Fragment>
  );
};

export default ConfirmOAuth;
