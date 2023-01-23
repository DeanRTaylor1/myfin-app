import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import LoginForm from '@modules/common/components/Form/LoginForm';
import Stripes from '@modules/common/components/Fragments/Stripes';
import { color, PropsWithAuth } from '@modules/common/types/types-interfaces';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';

const Signin: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    if (currentUser) {
      Router.push('/');
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, [currentUser]);

  return (
    <Fragment>
      {!isLoading && <LoginForm />}
      {!isLoading && <Stripes />}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <LoadingCircle />
        </div>
      )}
    </Fragment>
  );
};

export default Signin;
