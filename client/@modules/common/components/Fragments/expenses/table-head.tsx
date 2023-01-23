import { Fragment } from 'react';

const TableHead: React.FC = () => {
  return (
    <Fragment>
      <thead className='bg-gray-50'>
        <tr>
          <th
            scope='col'
            className='px-4 py-2 text-xs font-bold text-left text-gray-500 uppercase '
          >
            Item
          </th>
          <th
            scope='col'
            className='px-4 py-2 text-xs font-bold text-left text-gray-500 uppercase '
          >
            Cost
          </th>
          <th
            scope='col'
            className='px-4 py-2 text-xs font-bold text-left text-gray-500 uppercase '
          >
            tag
          </th>
          <th
            scope='col'
            className='px-4 py-2 text-xs font-bold text-left text-gray-500 uppercase '
          >
            Date
          </th>
          <th
            scope='col'
            className='px-4 py-2 text-xs font-bold text-right text-gray-500 uppercase '
          >
            Delete
          </th>
        </tr>
      </thead>
    </Fragment>
  );
};

export default TableHead;
