import {
  currentUserProps,
  OutgoingRecord,
} from '@modules/common/types/types-interfaces';

import { Fragment, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { numberWithCommas } from '@modules/common/utils/number-with-comma';
import { getCurrencySymbol } from '@modules/common/utils/currency';

type TableRowProps = {
  outgoing: OutgoingRecord;
  currentUser: currentUserProps;
  getUserRecords: (email: string) => void;
};

const TableRow: React.FC<TableRowProps> = ({
  outgoing,
  currentUser,
  getUserRecords,
}) => {
  const deleteItemHandler = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings`,
      {
        headers: { item: outgoing.item, userid: +outgoing.userId },
        withCredentials: true,
      }
    );
    getUserRecords(currentUser.email);
  };

  return (
    <Fragment>
      <tr>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {outgoing.item}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {`${getCurrencySymbol(outgoing.currency)}${numberWithCommas(outgoing.cost)}`}
        </td>
        <td className='px-4 py-2 text-xs md:text-sm font-extralight md:font-bold text-gray-800 whitespace-normal '>
          {outgoing.tag}
        </td>
        {/* <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
          <a
            className="text-green-500 hover:text-green-700"
            href="#"
          >
            Edit
          </a>

          </td> */}

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
