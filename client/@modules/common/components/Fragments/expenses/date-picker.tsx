import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent: React.FC<any> = ({ date, getDate, getUserData }) => {
  const makeChange = (date: Date) => {
    getDate(date);
  };

  return (
    <DatePicker
      className='  hover:cursor-pointer border-slate-200 border p-2 rounded w-full items-center placeholder:text-zinc-500 focus:text-zinc-500 active:shadow-xl font-extralight placeholder:font-extralight transition-all ease-in-out duration-700  active:border-none focus:outline-none active:outline-none'
      dateFormat={'dd/MM/yyyy'}
      selected={date}
      onChange={(date: Date) => makeChange(date)}
    />
  );
};

export default DatePickerComponent;
