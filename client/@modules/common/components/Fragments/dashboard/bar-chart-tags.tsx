import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardBarChartTags: React.FC<any> = ({ tagData }) => {
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

  const data = {
    labels: tagData
      .sort((a: any, b: any) => {
        return +b.totalCost - +a.totalCost;
      })
      .map((tag: { tag: string; totalCost: number }) => {
        return tag.tag;
      }),
    datasets: [
      {
        label: 'How you spend your money',
        data: tagData
          .sort((a: any, b: any) => {
            return +b.totalCost - +a.totalCost;
          })
          .map((tag: { tag: string; totalCost: number }) => {
            return tag.totalCost;
          }),
        borderColor: 'rgb(96,165,250)',
        backgroundColor: 'rgba(96,165,250, 0.7)',
      },
    ],
  };

  return (
    <Fragment>{tagData && <Bar options={options} data={data} />}</Fragment>
  );
};

export default DashboardBarChartTags;
