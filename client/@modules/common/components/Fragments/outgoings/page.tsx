import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  OutgoingRecord,
  PropsWithAuth,
} from '@modules/common/types/types-interfaces';
import TableHead from './table-head';
import TableRow from './table-row';
import AddItemForm from './add-item-form';
import LoadingCircle from '../../loadingbar/loading-circle';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const OutgoingsPage: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userOutgoings, setUserOutgoings] = useState<OutgoingRecord[]>([
    {} as OutgoingRecord,
  ]);
  const [modalActive, setModalActive] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);

  const activateModalHandler = () => {
    modalActive ? setModalActive(false) : setModalActive(true);
  };

  const getUserRecords = async (email: string) => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings`,
      { headers: { email, page }, withCredentials: true }
    );

    setUserOutgoings(response.data);

    // console.log(response.data)
  };

  const pageHandler = (task: string) => {
    switch (task) {
      case 'increase':
        if (userOutgoings.length < 10) {
          return;
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

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [page]);

  return (
    <div className='w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10 max-w-[calc(900px)]'>
      <div className='h-[95%] w-[95%] flex flex-col gap-4 pt-8 bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <span className='flex justify-between items-center'>
          <h1>Monthly Outgoings:</h1>
          <button className='navButton w-36' onClick={activateModalHandler}>
            Add Item
          </button>
        </span>
        <div className='flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='p-1.5 w-full inline-block align-middle'>
              <div className='overflow-x-scroll md:overflow-hidden border rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <TableHead />
                  <tbody className='divide-y divide-gray-200 font-medium'>
                    {!isLoading &&
                      userOutgoings.map((outgoing, index) => {
                        return (
                          <TableRow
                            key={index}
                            outgoing={outgoing}
                            currentUser={currentUser}
                            getUserRecords={getUserRecords}
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
              className='font-extralight text-xs flex justify-center items-center pl-2 hover:cursor-pointer'
              onClick={() => pageHandler('decrease')}
            >
              <ArrowLeftIcon className='h-6 w-6' />
            </div>
            <div className='border-l border-r border-black p-2'>{page}</div>
            <div
              className='font-extralight text-xs flex justify-center items-center pr-2 hover:cursor-pointer'
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
          />
        )}
      </div>
    </div>
  );
};

export default OutgoingsPage;
