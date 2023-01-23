import ExpensesPage from '@modules/common/components/Fragments/expenses/page';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import { currentUserProps } from '@modules/common/types/types-interfaces';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';

export default function Expenses(currentUser: currentUserProps) {
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
      {!isLoading && <ExpensesPage currentUser={currentUser} />}
    </Fragment>
  );
}

Expenses.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
