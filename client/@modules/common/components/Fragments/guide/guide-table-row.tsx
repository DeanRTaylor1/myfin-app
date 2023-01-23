import React, { Fragment } from 'react';

type GuideTableRowProps = {
  index: number;
  term: string;
  definition: string;
};

const GuideTableRow: React.FC<GuideTableRowProps> = ({
  index,
  term,
  definition,
}) => {
  return (
    <Fragment>
      <tr>
        <td className='px-6 py-4 text-sm font-medium text-gray-800 whitespace-normal'>
          {index}
        </td>
        <td className='px-6 py-4 text-sm text-gray-800 whitespace-normal'>
          {term}
        </td>
        <td className='px-6 py-4 text-sm text-gray-800 whitespace-normal'>
          {definition}
        </td>
      </tr>
    </Fragment>
  );
};

export default GuideTableRow;
