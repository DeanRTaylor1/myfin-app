
import { color } from '@modules/common/types/types-interfaces';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import DoRequest from '@modules/common/hooks/do-request';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';

const ConfirmOAuth: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Fragment>
      <div className='h-full w-full flex justify-center items-center font-extrabold gap-2 text3xl'>
       Oops! It looks like your email is already signed up. 
       You&apos;ll be redirected shortly...{' '}
      </div>
    </Fragment>
  );
};

export default ConfirmOAuth;
