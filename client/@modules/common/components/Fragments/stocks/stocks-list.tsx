import React, { Fragment } from 'react';

type StocksDropdownProps = {
  code: string;
  getStock: (e: React.FormEvent<HTMLSelectElement>) => void;
};

const stocks: string[] = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSM', 'XOM', 'NVDA', 'TSLA', 'META', 'SPY', 'VTI', 'VOO', 'VEA', 'VWO', 'VXUS', 'SCHF', 'IVE']

const StockDropdown: React.FC<StocksDropdownProps> = ({ code, getStock }) => {
  return (
    <Fragment>
      <div className='flex flex-col gap-2 text-sm w-full'>
        <label htmlFor='currency'>Stock:</label>
        <select
          value={code}
          onChange={(e) => getStock(e)}
          className='input hover:cursor-pointer flex w-full '
        >
          {stocks.map((stock, index) => {
            return (
              <option key={index} className='block w-full' value={stock}>
                {stock}
              </option>

            )
          })}
        </select>
      </div>
    </Fragment>
  );
};

export default StockDropdown;
