import { Fragment, useEffect, useState } from 'react';

export default function About({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    //console.log(currentUser);
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <div className='w-[calc(100vw)] h-fit min-h-[calc(90vh)] flex flex-col items-start justify-start gap-10 z-10'>
        <div className='w-[100%] bg-white h-fit relative p-10 flex flex-col  justify-start items-center gap-4'>
          <div className='w-full max-w-[1200px] flex flex-col justify-center items-center md:flex-row'>
            <div className='flex flex-col gap-8 justify-center items-center p-4 min-w-[450px]'>
              <h1 className='w-full font-extrabold text-xl text-left'>
                About us:
              </h1>
              <p className='w-full text-left'>
                We are a team of professionals who come from a range of
                backgrounds, our primary objective is to offer a simple way for
                you to manage your finances. Financial literacy is not something
                that is taught in schools and as you we move through the modern
                world, there are more and more pressures to spend money.
                Holidays, tech, gifts, restaurants... MyFin offers a way for you
                to log and track your finances.
              </p>
              <p className='w-full text-left '>
                We believe in keeping things simple by setting small daily
                spending targets, whilst being able to track spending over
                multiple weeks or months. Check summaries of what you&apos;re
                spending your money on and decide where could cut costs. The
                methods applied by MyFin have been used by our team to manage
                our personal finances to great success. Meet your savings
                targets this year!
              </p>
              <p className='w-full text-left'>
                Our aim is to maintain your privacy and security, you can delete
                your account and data at any time and signing up is free.
              </p>
            </div>
          </div>
        </div>
        <div className='h-fit w-screen flex gap-8 md:gap-32 z-50 items-center justify-center '>
          <div className='w-[100%] h-fit relative p-10 flex flex-col-reverse md:flex-row justify-center items-center gap-4'>
            <div className='w-full flex flex-col gap-8 justify-center items-center p-4 min-w-[450px] max-w-[1200px]'>
              <h1 className='w-full font-extrabold text-xl '>Contact</h1>
              <p className='w-full '>
                We are in the process of adding more features to the site that
                will make tracking easier but in the meantime if you have any
                feedback or suggestions please contact us at
                no-reply-myfin@outlook.com.
              </p>
              <p className='w-full text-left '>Best regards,</p>
              <p className='w-full text-sm font-extralight'>MyFin Team</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

About.getInitialProps = async (context: any, client: any, currentUser: any) => {
  return currentUser;
};
