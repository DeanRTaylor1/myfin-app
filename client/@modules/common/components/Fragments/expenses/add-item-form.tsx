import DoRequest from '@modules/common/hooks/do-request';
import { ChangeEvent, useState } from 'react';
import Formerrors from '../../Form/Form-Errors';
import Input from '../../Form/Input';
import TagsDropdown from '../tags-dropdown';
import DatePickerComponent from './date-picker';

const AddItemForm: React.FC<any> = ({
  currentUser,
  activateModalHandler,
  getUserRecords,
  getCount,
}) => {
  const [itemName, setItemName] = useState('');
  const [tag, setTag] = useState('housing');
  const [cost, setCost] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [date, setDate] = useState(new Date());

  const { doRequest, errors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/finances/expenses`,
    method: 'post',
    body: {
      email: currentUser.email,
      item: itemName,
      tag,
      cost,
      currency,
      dateSpent: date.toISOString(),
    },
    onSuccess: () => {
      getUserRecords(currentUser.email);
      getCount(currentUser.email);
      clearInputs();
    },
  });

  const getItemName = (e: React.FormEvent<HTMLInputElement>) => {
    setItemName(e.currentTarget.value);
  };
  const getTag = (e: React.FormEvent<HTMLSelectElement>) => {
    setTag(e.currentTarget.value);
  };
  const getCost = (e: React.FormEvent<HTMLInputElement>) => {
    setCost(e.currentTarget.value);
  };
  const getCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    //console.log(e.target.value);
    setCurrency(e.target.value);
  };
  const getDate = (date: Date) => {
    //console.log(date.toISOString());
    setDate(date);
  };

  const clearInputs = () => {
    setItemName('');
    setTag('');
    setCost('');
    setCurrency('');
    setDate(new Date());
    activateModalHandler();
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <div className='w-screen h-screen fixed -top-36 left-0 bg-transparent flex flex-col items-center justify-center z-50 '>
      <div className='h-96 w-72 rounded-md shadow-2xl flex flex-col z-50'>
        <form
          onSubmit={formSubmitHandler}
          className='h-fit w-full flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
        >
          <div className='py-4 h-20 flex justify-between'>
            Add Item <Formerrors errors={errors} />
          </div>
          <div className='flex flex-col gap-8'>
            <Input
              name={'Name:'}
              label={'itemName'}
              type={'text'}
              placeholder={'Item name'}
              getInputs={getItemName}
              value={itemName}
            />
            <TagsDropdown tag={tag} getTag={getTag} />
            <Input
              name={'Cost:'}
              label={'itemCost'}
              type={'text'}
              placeholder={'Item Cost'}
              getInputs={getCost}
              value={cost}
            />
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='currency'>Currency:</label>
              <select
                value={currency}
                onChange={(e) => getCurrency(e)}
                className='input hover:cursor-pointer'
              >
                <option value='usd'>USD</option>
                <option value='gbp'>GBP</option>
                <option value='vnd'>VND</option>
              </select>
            </div>
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='date'>Date:</label>
              <DatePickerComponent date={date} getDate={getDate} />
            </div>
            <div className='flex gap-2'>
              <button
                className='signInButton w-[calc(50%)] bg-red-400 hover:bg-red-500 focus:bg-red-500'
                onClick={activateModalHandler}
              >
                Cancel
              </button>
              <button className='signInButton w-[calc(50%)]'>Add</button>
            </div>{' '}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
