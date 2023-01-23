import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ExpenseRecord,
  PropsWithAuth,
} from '@modules/common/types/types-interfaces';
import TableHead from './table-head';
import TableRow from './table-row';

import AddItemForm from './add-item-form';
import LoadingCircle from '../../loadingbar/loading-circle';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const ExpensesPage: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userExpenses, setUserExpenses] = useState<ExpenseRecord[]>([
    {} as ExpenseRecord,
  ]);
  const [modalActive, setModalActive] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(0);

  const activateModalHandler = () => {
    modalActive ? setModalActive(false) : setModalActive(true);
  };

  const getUserRecords = async (email: string) => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/expenses`,
      { headers: { email, page }, withCredentials: true }
    );
    setUserExpenses(response.data);

    // console.log(response.data)
  };

  const getCount = async (email: string) => {
    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/expenses/count`,
      { headers: { email }, withCredentials: true }
    );
    //console.log(data.count);
    setTotalRecordsCount(data.count);

    // console.log(response.data)
  };

  const pageHandler = (task: string) => {
    switch (task) {
      case 'increase':
        if (totalRecordsCount <= page * 10) {
          return; //console.log(totalRecordsCount);
        }
        setPage(page + 1);
      case 'decrease':
        if (page === 1) {
          return;
        }
        setPage(page - 1);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let loadingTimer = setTimeout(() => setIsLoading(false), 750);
    getUserRecords(currentUser.email);
    getCount(currentUser.email);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [page]);

  return (
    <div className='w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10 max-w-[calc(900px)]'>
      <div className='h-[95%] w-[95%] flex flex-col gap-4 pt-8 bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <span className='flex justify-between items-center gap-2'>
          <div className='flex flex-col gap-2'>
            <h1>Daily Expenses:</h1>
            <span className='font-extralight text-xs'>
              showing{' '}
              {`${(page - 1) * 10 + 1} - ${
                totalRecordsCount < page * 10 ? totalRecordsCount : page * 10
              } of ${totalRecordsCount}`}
            </span>
          </div>
          <button
            className='navButton w-36 h-[36px]'
            onClick={activateModalHandler}
          >
            Add Item
          </button>
        </span>{' '}
        <div className='flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='p-1.5 w-full inline-block align-middle'>
              <div className='overflow-x-scroll sm:overflow-hidden border rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <TableHead />
                  <tbody className='divide-y divide-gray-200 font-light text-xs md:text-lg md:font-medium'>
                    {!isLoading &&
                      userExpenses
                        .sort((a: ExpenseRecord, b: ExpenseRecord) => {
                          return (
                            new Date(b.dateSpent).getTime() -
                            new Date(a.dateSpent).getTime()
                          );
                        })
                        .map((expense, index) => {
                          return (
                            <TableRow
                              key={index}
                              expense={expense}
                              currentUser={currentUser}
                              getUserRecords={getUserRecords}
                              getCount={getCount}
                            />
                          );
                        })}
                  </tbody>
                </table>
                {isLoading && (
                  <div className='h-36 w-full flex justify-center items-center'>
                    <LoadingCircle />{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className='flex justify-center items-center gap-2 border border-black w-fit'>
            <div
              className='font-extralight text-xs flex justify-center items-center pl-2 hover:cursor-pointer hover:opacity-75'
              onClick={() => pageHandler('decrease')}
            >
              <ArrowLeftIcon className='h-6 w-6' />
            </div>
            <div className='border-l border-r border-black p-2'>{page}</div>
            <div
              className='font-extralight text-xs flex justify-center items-center pr-2 hover:cursor-pointer hover:opacity-75'
              onClick={() => pageHandler('increase')}
            >
              <ArrowRightIcon className='h-6 w-6' />
            </div>
          </div>
        </div>
        {modalActive && (
          <AddItemForm
            getUserRecords={getUserRecords}
            currentUser={currentUser}
            activateModalHandler={activateModalHandler}
            getCount={getCount}
          />
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
