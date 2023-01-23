import {
  currentUserProps,
  ExpenseRecord,
  OutgoingRecord,
} from '@modules/common/types/types-interfaces';

import { Fragment, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { numberWithCommas } from '@modules/common/utils/number-with-comma';
import { format } from 'date-fns';
import { getCurrencySymbol } from '@modules/common/utils/currency';

type ExpenseTableRowProps = {
  expense: ExpenseRecord;
  currentUser: currentUserProps;
  getUserRecords: (email: string) => void;
  getCount: (email: string) => void;
};

const TableRow: React.FC<ExpenseTableRowProps> = ({
  expense,
  currentUser,
  getUserRecords,
  getCount,
}) => {
  const deleteItemHandler = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/expenses`,
      {
        headers: {
          item: expense.item,
          userid: +expense.userId,
          datespent: new Date(expense.dateSpent).toISOString(),
        },
        withCredentials: true,
      }
    );
    getUserRecords(currentUser.email);
    getCount(currentUser.email);
  };

  return (
    <Fragment>
      <tr>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {expense.item}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {`${getCurrencySymbol(expense.currency)}${numberWithCommas(expense.cost)}`}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {expense.tag}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          <p className='text-green-500 hover:text-green-700 w-full text-left' >
          {format(new Date(expense.dateSpent), 'dd/MM/yy')}
          </p>
          
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal text-right'>
          <a
            className='text-red-500 hover:text-red-700'
            href='#'
            onClick={(e) => deleteItemHandler()}
          >
            Delete
          </a>
        </td>
      </tr>
    </Fragment>
  );
};

export default TableRow;
