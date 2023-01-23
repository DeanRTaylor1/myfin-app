import { Fragment, useEffect, useMemo, useState } from 'react';
import Input from '@modules/common/components/Form/Input';
import Router, { useRouter } from 'next/router';
import SquareContainer from '@modules/common/components/Fragments/Square-Container';
import PageContainer from '@modules/common/components/Fragments/Page-Container';
import ChartData from '@modules/common/components/Charts/ChartData';
import StockContainer from '@modules/common/components/Fragments/Stock-Container';
import { color } from '@modules/common/types/types-interfaces';
import { saveToLocal } from '@modules/common/utils/save-to-local';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import StockDropdown from '@modules/common/components/Fragments/stocks/stocks-list';

const DEFAULT_STOCK = 'AAPL'
const DEFAULT_MONTHS = 12;


type stockChartProps = {
      code: string,
      months: number
  }


export default function Stocks({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [stocks, setStocks] = useState<stockChartProps[] | null>(null);

  const [stockCode, setStockCode] = useState<string>(DEFAULT_STOCK);
  const [months, setMonths] = useState<number>(DEFAULT_MONTHS);

  const getStockCode = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(stocks)
    setStockCode(e.currentTarget.value);
  };

  const getMonths = (e: React.FormEvent<HTMLInputElement>) => {
    setMonths(+e.currentTarget.value);
  };

  useEffect(() => {
    if (!currentUser) {
      Router.push('/auth/signin');
    }
    let localStocks: any = localStorage.getItem('stocks');
    setStocks(JSON.parse(localStocks));

    setIsLoading(false);
  }, []);

  /* const setInitialStocks = (stockCode: string, months: string) => {
    setStockCode(stockCode);
    setMonths;
  }; */

  const addStockHandler = () => {
    const temp = stocks ? [...stocks!, { code: stockCode, months }] : [{ code: stockCode, months }];
      window.localStorage.setItem(
      'stocks',
      JSON.stringify(temp)
    );
    setIsLoading(true);
    setStocks(temp);
    setStockCode(DEFAULT_STOCK);
    setMonths(DEFAULT_MONTHS);

    setTimeout(() => {
        setIsLoading(false)
      }, 1000)
  };

  const deleteStockHandler = (stockCode: string) => {
    let temp = null;
    if (stocks!.length === 1) {
      temp = null;
    }
    if (stocks!.length > 1) {
      temp = stocks!.filter((stockObject) => stockObject.code !== stockCode)
    }
    setStocks(temp);
    window.localStorage.setItem('stocks', JSON.stringify(temp));
    

  };

    const memoList = useMemo(()=> stocks?.map((stock, index) => {
              return (
                <StockContainer
                  key={index}
                  code={stock.code}
                  deleteHandler={deleteStockHandler}
                >
                  <ChartData stock={stock.code} months={stock.months} />
                </StockContainer>
              );
            }), [stocks])

  if (isLoading) {
    return (
      <Fragment>
        <PageContainer>
          {isLoading && (
            <div className='h-full w-full flex justify-center items-center'>
              <LoadingCircle />
            </div>
          )}
        </PageContainer>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <PageContainer>
          {stocks && memoList }

          {!isLoading && (!stocks || stocks.length < 6) && (
            <SquareContainer>
              <StockDropdown code={stockCode} getStock={getStockCode} />
              <Input
                name={'Months'}
                label={'months'}
                type={'text'}
                placeholder={'Months of data'}
                getInputs={getMonths}
                value={months.toString()}
              />
              <button className='signInButton' onClick={addStockHandler}>
                Add Chart
              </button>
            </SquareContainer>
          )}
        </PageContainer>
      </Fragment>
    );
  }
}

Stocks.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
