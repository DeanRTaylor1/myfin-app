import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import DoRequest from '@modules/common/hooks/do-request';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';

const Confirm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { userid } = router.query;
  const { doRequest, errors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/users/confirmation`,
    method: 'put',
    body: { userid },
    onSuccess: () => {
      setIsLoading(false);
      setTimeout(() => {
        Router.push('/');
      }, 3000);
    },
  });

  useEffect(() => {
    doRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {!isLoading && (
        <div className='h-full w-full flex justify-center items-center font-extrabold gap-2 text3xl'>
          Email Confirmed! If not redirected click here to go{' '}
          <Link
            className='underline underline-offset-4 font-extrabold text3xl'
            href='/'
          >
            {' '}
            <p>Home</p>
          </Link>
          .
        </div>
      )}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <LoadingCircle />
        </div>
      )}
    </Fragment>
  );
};

export default Confirm;
