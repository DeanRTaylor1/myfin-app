import { useEffect, useState } from 'react';
import {
  userProfileData,
  userStateData,
} from '@modules/common/types/types-interfaces';
import axios from 'axios';
import { toNormalCase } from '@modules/common/utils/utility-functions';
import Link from 'next/link';
import { numberWithCommas } from '@modules/common/utils/number-with-comma';
import LoadingCircle from '../../loadingbar/loading-circle';
import Router from 'next/router';
import DeleteUserModal from './Delete-User-Modal';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>

const ProfilePage: React.FC<any> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  //redirect if no current user and populate user data from api
  const [userData, setUserData] = useState<userStateData | null>(null);
  const [confirmDeleteModalActive, setConfirmDeleteModalActive] =
    useState<Boolean>(false);

  const doRequest = async (email: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}api/users`, {
        headers: { email },
        withCredentials: true,
      });
      Router.push('/');
    } catch (err) {
      console.log(err);
      Router.reload();
    }
  };

  const getUserData = async (email: string) => {
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances`,
      { email },
      { withCredentials: true }
    );
    let results = [];
    let responseData = response.data;
    for (let key in responseData as userProfileData) {
      //console.log(key, responseData[key]);
      let temp = {
        name: toNormalCase(key),
        value: responseData[key],
        tag: key,
      };
      results.push(temp);
    }
    // console.log(results)
    setUserData(results);
  };

  useEffect(() => {
    getUserData(currentUser.email);

    let loadingTimer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className=' max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      <div
        className={`h-fit w-[95%] flex flex-col gap-4 min-h-fit bg-white  rounded-md px-8 py-4 text-xl font-bold ${
          confirmDeleteModalActive ? 'filter blur-md' : ''
        }`}
      >
        <div className='py-4 h-20 flex justify-between underline underline-offset-4 font-extrabold '>
          {currentUser.username}
        </div>
        {isLoading && (
          <div className='h-36 w-full flex justify-center items-center'>
            <LoadingCircle />{' '}
          </div>
        )}

        {!isLoading &&
          userData &&
          userData
            .filter(
              (item) =>
                item.name !== 'Created At' &&
                item.name !== 'Updated At' &&
                item.name !== 'Username' &&
                item.name !== 'Savings Rate'
            )
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'
                >
                  {item.name}:{' '}
                  <div className='font-extralight text-lg'>
                    {isNaN(+item.value) || item.name === 'Phone'
                      ? item.value
                      : numberWithCommas(+item.value)}{' '}
                  </div>
                </div>
              );
            })}
        {!isLoading &&
          userData &&
          userData
            .filter((item) => item.name === 'Savings Rate')
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'
                >
                  {item.name}:{' '}
                  <div className='font-extralight text-lg'>
                    {`${item.value}%`}
                  </div>
                </div>
              );
            })}

        {!isLoading && (
          <Link href='/user/profile/update'>
            {' '}
            <button className='signInButton'>Update Details</button>{' '}
          </Link>
        )}
        {!isLoading && (
          <button
            className='signInButton bg-red-600 hover:bg-red-800 focus:bg-red-800'
            onClick={(e) => {
              e.preventDefault();
              setConfirmDeleteModalActive(true);
            }}
          >
            Delete Account
          </button>
        )}
      </div>
      {confirmDeleteModalActive && (
        <DeleteUserModal
          currentUser={currentUser}
          setConfirmDeleteModalActive={setConfirmDeleteModalActive}
          doRequest={doRequest}
        />
      )}
    </div>
  );
};

export default ProfilePage;
