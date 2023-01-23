import { Fragment } from 'react';
import { FormerrorsProps } from '@modules/common/types/types-interfaces';
import uniqid from 'uniqid';
import FormLogo from '../Fragments/Form-Logo';

const Formerrors: React.FC<FormerrorsProps> = ({ errors }) => {
  return (
    <Fragment>
      <span className='flex flex-col gap-1'>
        {!errors && <FormLogo color={'text-blue-400'} />}
        {errors && (
          <ul className='border p-2 rounded-md border-red-400 text-red-400 font-bold text-sm'>
            {' '}
            Ooops...{' '}
            {errors.map((error: string) => {
              return (
                <li key={uniqid()} className='text-red-400 text-sm font-light'>
                  {error}
                </li>
              );
            })}
          </ul>
        )}
      </span>
    </Fragment>
  );
};

export default Formerrors;
