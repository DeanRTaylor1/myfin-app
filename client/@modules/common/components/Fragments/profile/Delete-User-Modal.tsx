import { currentUserProps } from '@modules/common/types/types-interfaces';
import { Fragment } from 'react';

type DeleteUserModalProps = {
  currentUser: currentUserProps;
  setConfirmDeleteModalActive: (x: Boolean) => void;
  doRequest: (email: string) => void;
};

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  currentUser,
  setConfirmDeleteModalActive,
  doRequest,
}) => {
  return (
    <Fragment>
      <div className='w-screen h-[1000px] fixed -top-40 left-0 z-99 flex flex-col items-center justify-center '>
        <div className='h-fit w-96  rounded-md shadow-2xl flex flex-col'>
          <form className='h-fit w-96 flex flex-col gap-8 shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'>
            <div className='py-4 h-20 flex justify-between'>
              Confirm Deletion (this can not be undone!)
            </div>
            <div className='flex flex-row-reverse gap-2'>
              <button
                className='signInButton w-[calc(50%)] bg-red-400 hover:bg-red-500 focus:bg-red-500 h-[55px]'
                onClick={(e) => {
                  e.preventDefault();
                  doRequest(currentUser.email);
                }}
              >
                Delete Forever
              </button>
              <button
                className='signInButton w-[calc(50%)] h-[55px]'
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmDeleteModalActive(false);
                }}
              >
                Go Back
              </button>
            </div>{' '}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteUserModal;
