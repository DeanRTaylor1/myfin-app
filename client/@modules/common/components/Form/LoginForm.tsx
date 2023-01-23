import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import DoRequest from '@modules/common/hooks/do-request';
import Formerrors from './Form-Errors';
import Input from './Input';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import GoogleButton from 'react-google-button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = DoRequest({
    url: `${process.env.NEXT_PUBLIC_API_URL}api/users/signin`,
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const getEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const getPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    doRequest();
  };

  const redirectToGoogle = async () => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}api/login/google`);
    let timer: NodeJS.Timer | null = null;
    const googleLoginURL = `${process.env.NEXT_PUBLIC_API_URL}api/login/google`;
    const newWindow = window.open(
      googleLoginURL,
      '_blank',
      'width=500, height=600'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
          }
          Router.push('/');
        }
      }, 500);
    }
  };
  const redirectToFacebook = async () => {
    let timer: NodeJS.Timer | null = null;
    const facebookLoginURL = `${process.env.NEXT_PUBLIC_API_URL}api/login/facebook`;
    const newWindow = window.open(
      facebookLoginURL,
      '_blank',
      'width=500, height=600'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
          }
          Router.push('/');
        }
      }, 500);
    }
  };

  const oAuthLogin = async (strategy: string) => {
    let timer: NodeJS.Timer | null = null;
    const oAuthLoginURL = `${process.env.NEXT_PUBLIC_API_URL}api/login/${strategy}`;
    const newWindow = window.open(
      oAuthLoginURL,
      '_blank',
      'width=500, height=600'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
          }
          Router.push('/');
        }
      }, 500);
    }
  };
  return (
    <div className='w-full h-full flex mt-14 items-start justify-center z-10'>
      <form
        onSubmit={formSubmitHandler}
        className='h-fit w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
      >
        <div className='py-4 h-20 flex justify-between'>
          Sign in: <Formerrors errors={errors} />
        </div>
        <div className='flex flex-col gap-8'>
          <Input
            name={'Email Address:'}
            label={'emailaddress'}
            type={'email'}
            placeholder={'Email address'}
            getInputs={getEmail}
            value={email}
          />
          <Input
            name={'Password:'}
            label={'password'}
            type={'password'}
            placeholder={'Password'}
            getInputs={getPassword}
            value={password}
          />
          <button className='signInButton'>Sign In</button>
          <div className='w-full flex justify-center items-center font-light text-xs'>
            Or get started with:
          </div>
          <div className='flex justify-center items-center w-full pb-4 gap-4'>
            <FcGoogle
              size={35}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('github')}
            />
            <BsFacebook
              size={30}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('facebook')}
            />
            <BsGithub
              size={30}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('github')}
            />
          </div>
        </div>

        <div className='flex font-light text-xs py-3 gap-2'>
          Don&apos;t use social media?
          <Link
            className='font-bold text-xs text-blue-300'
            href={'/auth/signup'}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
