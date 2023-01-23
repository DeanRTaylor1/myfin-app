import Link from 'next/link';
import React, { Fragment } from 'react';

const Footer: React.FC = () => {
  return (
    <Fragment>
      <div className='h-fit w-full flex flex-row justify-between p-4 md:px-36 md:max-w-[1200px] items-center'>
        <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 h-full text-left justify-end '>
          <li className=''>Copyright MyFin 2022 ©</li>
        </ul>
        <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 w-fit text-right '>
          <Link href={'/about'}>
            <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>
              About us
            </li>
          </Link>
          <Link href={'/guide'}>
            <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>
              Guide
            </li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};

export default Footer;
