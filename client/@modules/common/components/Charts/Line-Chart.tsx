import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

interface chartProps {
  stockDetails: MetaData;
  dates: string[];
  stockData: any;
  months: number;
}


const LineChart: React.FC<chartProps> = ({
  stockDetails,
  stockData,
  dates,
  months,
}) => {
  const [prices, setPrices] = useState<string[] | null>(null);

  useEffect(() => {
   // console.log(stockData, stockDetails, dates);
   console.log('rendering')
    let temp: any = [];
    for (const [key, value] of Object.entries(stockData)) {
      const item: any = value;
      temp.push(item['4. close']);
    }
    setPrices(temp);
  }, [stockData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  const labels = dates
    .slice(dates.length - (months + 1), dates.length - 1)
    .map((datestring: string) => {
      return format(new Date(datestring), 'MMM/yy');
    });

  const data = {
    labels,
    datasets: [
      {
        label: `${stockDetails['2. Symbol']}`,
        data: prices
          ?.reverse()
          .slice(prices.length - (months + 1), prices.length - 1),
        borderColor: 'rgb(96,165,250)',
        fill: true,
        backgroundColor: 'rgba(96,165,250, 0.2)',
        tension: 0.15,
      },
    ],
  };

  //console.log(stockDetails, dates, prices);
  return <Line options={options} data={data} />;
};

export default LineChart;
