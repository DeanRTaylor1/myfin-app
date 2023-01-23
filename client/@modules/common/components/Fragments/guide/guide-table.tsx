import React, { Fragment } from 'react';
import GuideTableRow from './guide-table-row';
import { terms } from './terms';
const GuideTable: React.FC = () => {
  return (
    <Fragment>
      <div className='w-full flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='p-1.5 w-full inline-block align-middle'>
            <div className='overflow-hidden border rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                    >
                      ID
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                    >
                      Term
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
                    >
                      Definition
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white text-left text-wrap'>
                  {terms.map((term, index) => {
                    return (
                      <GuideTableRow
                        key={index}
                        index={index + 1}
                        term={term.term}
                        definition={term.definition}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GuideTable;
