/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router';
import { useEffect } from 'react';
import DoRequest from '@modules/common/hooks/do-request';
import { color } from '@modules/common/types/types-interfaces';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';

const SignOut = () => {
  const { doRequest } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/users/signout`,
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <LoadingCircle />s{' '}
    </div>
  );
};

export default SignOut;
