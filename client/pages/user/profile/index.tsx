import ProfilePage from '@modules/common/components/Fragments/profile/profile-page';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import {
  color,
  currentUserProps,
} from '@modules/common/types/types-interfaces';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';

export default function Profile(currentUser: currentUserProps) {
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
          {' '}
          <LoadingCircle />{' '}
        </div>
      )}
      {!isLoading && <ProfilePage currentUser={currentUser} />}
    </Fragment>
  );
}

Profile.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
