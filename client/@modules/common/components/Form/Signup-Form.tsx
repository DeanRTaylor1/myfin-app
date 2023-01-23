import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DoRequest from '../../hooks/do-request';

import Formerrors from './Form-Errors';

type FormData = {
  username: string;
  email: string;
  password: string;
  cPassword: string;
};

const SignupForm: React.FC = () => {
  const [inputs, setInputs] = useState<any>({
    email: '',
    username: '',
    password: '',
  });

  let { doRequest, errors: apiRequestErrors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/users/signup`,
    method: 'post',
    body: inputs,
    onSuccess: () => Router.push('/'),
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const inputChangeHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const temp = { ...inputs };
    temp[inputName] = e.currentTarget.value;

    setInputs(temp);
  };

  return (
    <div className='w-full min-h-[80vh] h-full flex mt-14 items-start justify-center z-10'>
      <form
        onSubmit={handleSubmit((data, e) => {
          // console.log(data);

          doRequest();
        })}
        className='min-h-96 w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
      >
        <div className='py-4 h-20 flex justify-between'>
          Sign Up: <Formerrors errors={apiRequestErrors} />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='username'>Username:</label>
            <input
              onKeyUp={(e) => inputChangeHandler(e, 'username')}
              {...register('username', {
                required: 'This is required',
                minLength: {
                  value: 5,
                  message: 'Must be at least five characters',
                },
              })}
              placeholder='Username'
              className={errors.username ? 'inputError' : 'input'}
            />
            <span className='errorMessage'>{errors.username?.message}</span>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label>Email:</label>
            <input
              onKeyUp={(e) => inputChangeHandler(e, 'email')}
              {...register('email', {
                required: 'This is required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'Must be a valid email',
                },
              })}
              placeholder='Email'
              className={errors.email ? 'inputError' : 'input'}
            />
            <span className='errorMessage'>{errors.email?.message}</span>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label>Password:</label>
            {/* capital letter, number */}
            <input
              onKeyUp={(e) => inputChangeHandler(e, 'password')}
              {...register('password', {
                required: 'This is required',
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: 'Must contain one uppercase letter and a number',
                },
              })}
              placeholder='Password'
              type='password'
              className={errors.password ? 'inputError' : 'input'}
            />
            <span className='errorMessage'>{errors.password?.message}</span>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label>Confirm Password:</label>
            <input
              {...register('cPassword', {
                required: 'This is required',
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: 'Must contain one uppercase letter and a number',
                },
                validate: () =>
                  getValues('cPassword') === getValues('password') ||
                  'Passwords do not match',
              })}
              placeholder='Confirm Password'
              type='password'
              className={errors.cPassword ? 'inputError' : 'input'}
            />
            <span className='errorMessage'>{errors.cPassword?.message}</span>
          </div>
          <button className='signInButton'>Sign Up</button>
          <input
            className='hidden'
            readOnly={true}
            type='text'
            value={inputs.username}
          />
          <input
            className='hidden'
            readOnly={true}
            type='text'
            value={inputs.email}
          />
          <input
            className='hidden'
            readOnly={true}
            type='password'
            value={inputs.password}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
