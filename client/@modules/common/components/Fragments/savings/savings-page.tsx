import { PropsWithAuth } from '@modules/common/types/types-interfaces';
import { getCurrencySymbol } from '@modules/common/utils/currency';
import {
  getDailySpend,
  getWeeklySavings,
  targetDailySpend,
} from '@modules/common/utils/math';
import { numberWithCommas } from '@modules/common/utils/number-with-comma';
import axios from 'axios';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import LoadingCircle from '../../loadingbar/loading-circle';
import DatePickerComponent from '../expenses/date-picker';
import DashboardBarChartTags from '../dashboard/bar-chart-tags';
import DashBoardBox from '../dashboard/dashboard-box';
import DashboardChartContainer from '../dashboard/dashboard-chart-container';
import DonutChart from '../dashboard/donut-chart';
import DashboardChart from '../dashboard/line-graph';

const SavingsPage: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [userData, setUserData] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const getUserData = async (email: string, startDate: Date, endDate: Date) => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}api/finances/outgoings/dashboard`,
      {
        headers: {
          email,
          startdate: startDate.toISOString(),
          enddate: endDate.toISOString(),
        },
        withCredentials: true,
      }
    );
    //console.log(response.data);
    if (response.data.monthlySalary === 0) {
      return Router.push('/user/profile');
    }
    if (!response.data.total) {
      return Router.push('/outgoings');
    }
    setUserData(response.data);
  };

  useEffect(() => {
    setUserData(null);
    getUserData(currentUser.email, startDate, endDate);
    //console.log(startDate, endDate);
    let loadingTimer = setTimeout(() => setIsLoading(false), 750);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, [startDate, endDate, currentUser.email]);

  const savingsItems = [
    userData && {
      title: 'Target Weekly Savings',
      value: `${getCurrencySymbol(userData.currency)}${numberWithCommas(
        getWeeklySavings(
          userData.monthlySalary,
          userData.total,
          userData.savingsRate
        )
      )}`,
    },
    userData && {
      title: 'Target Daily Spend',
      value: `${getCurrencySymbol(userData.currency)}${numberWithCommas(
        targetDailySpend(
          userData.monthlySalary,
          userData.total,
          userData.savingsRate
        )
      )}`,
    },
  ]
    .filter(Boolean)
    .map((headline, index) => {
      return (
        <DashBoardBox
          key={index}
          title={headline.title}
          value={headline.value}
        />
      );
    });

  return (
    <div className='h-fit p-8 min-h-[calc(90vh)]  max-w-[1000px] flex flex-col gap-8 justify-start items-center w-[100%]'>
      <div className='font-extrabold text-2xl'>Dashboard</div>
      {!userData && <LoadingCircle />}
      {userData && (
        <Fragment>
          <div className='w-full flex gap-8 flex-wrap items-center justify-center md:justify-between'>
            <div className='w-full md:w-[18rem] md:h-[190px] bg-white aspect-video rounded-md flex flex-col justify-center items-center p-4 border-t-8 border-blue-500 border border-b-black border-r-black border-l-black shadow-md'>
              <div className='font-bold text-xl'>Breakdown</div>
              {userData && (
                <DonutChart
                  currencySymbol={getCurrencySymbol(userData.currency)}
                  outgoingsSum={userData.outgoingsSum}
                />
              )}
            </div>
            {userData && savingsItems}
          </div>
          <div className='h-18 w-full bg-white p-4  mr-6 ml-6 border-t-8 border-blue-500 flex flex-col md:flex-row justify-between items-center gap-4 font-bold border border-b-black border-r-black border-l-black shadow-md rounded-sm'>
            <span className='flex gap-2 items-center w-full justify-center'>
              {' '}
              <h2 className='w-[30%]'>From:</h2>{' '}
              <DatePickerComponent
                date={startDate}
                getDate={setStartDate}
                getUserData={getUserData}
              />
            </span>
            <span className='flex gap-2 items-center justify-center w-full '>
              {' '}
              <h2 className='w-[30%]'>To:</h2>{' '}
              <DatePickerComponent
                date={endDate}
                getDate={setEndDate}
                getUserData={getUserData}
              />{' '}
            </span>
          </div>
          <DashboardChartContainer>
            {userData && (
              <DashboardChart
                expenses={userData.expenses}
                startDate={startDate}
                endDate={endDate}
                dailySpend={getDailySpend(userData.totalOutgoings)}
              />
            )}
          </DashboardChartContainer>
          <DashboardChartContainer>
            {userData && (
              <DashboardBarChartTags tagData={userData.outgoingsSum} />
            )}
          </DashboardChartContainer>
        </Fragment>
      )}
    </div>
  );
};

export default SavingsPage;
