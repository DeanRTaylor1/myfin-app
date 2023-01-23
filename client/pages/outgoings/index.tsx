import OutgoingsPage from '@modules/common/components/Fragments/outgoings/page';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import { color } from '@modules/common/types/types-interfaces';
import axios from 'axios';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';

function Outgoings(currentUser: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (!currentUser) {
      Router.push('/auth/signin');
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Fragment>
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <LoadingCircle />{' '}
        </div>
      )}
      {!isLoading && <OutgoingsPage currentUser={currentUser} />}
    </Fragment>
  );
}

export default Outgoings;

Outgoings.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
