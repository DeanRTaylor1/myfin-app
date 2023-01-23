import GuideTable from '@modules/common/components/Fragments/guide/guide-table';
import { PropsWithAuth } from '@modules/common/types/types-interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';

export default function About({ currentUser }: PropsWithAuth) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    //console.log(currentUser);
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <div className='w-[calc(100vw)] h-fit min-h-[calc(90vh)] flex flex-col items-start justify-start gap-10 z-10'>
        <div className='w-[100%] bg-white h-fit relative p-10 flex flex-col  justify-start items-center gap-4'>
          <div className='w-[90%] text-center md:text-left flex flex-col justify-center items-center md:justify-evenly md:flex-row max-w-[1200px]'>
            <div className='flex flex-col gap-2 justify-center items-center p-4 '>
              <h1 className='w-full font-bold text-2xl '>
                1. Update your profile.
              </h1>
              <h3 className='w-fit '>
                Set up your tracker with your basic information. (see key
                terminology at the bottom of this page).
              </h3>
            </div>
            <div className='w-fit relative max-h-[450px]'>
              <Image
                alt='profile-page-image'
                src={'/profile.png'}
                priority={true}
                width={800}
                height={800}
                quality={100}
                className='max-h-[450px] max-w-[450px]'
              />
            </div>
          </div>
          {!currentUser && (
            <Link href={'/auth/signin'}>
              {' '}
              <button className='navButton w-full max-w-[800px]'>
                Sign up now!
              </button>
            </Link>
          )}
        </div>

        <div className='h-fit w-screen flex gap-8 md:gap-32 z-50 items-center justify-center '>
          <div className='w-[90%] text-center md:text-right flex flex-col justify-center items-center md:justify-evenly md:flex-row-reverse max-w-[1200px]'>
            <div className='flex flex-col gap-2 justify-center items-center p-4 '>
              <h1 className='w-full font-bold text-2xl '>
                2. Track your regular outgoings.
              </h1>
              <h3 className='w-fit '>
                Make a note of every payment that you have to make
                month-to-month so that you can see clearly what payments you can
                not avoid.
              </h3>
            </div>
            <div className='w-fit relative max-h-[450px]'>
              <Image
                alt='outgoings'
                src={'/outgoings.png'}
                priority={true}
                width={800}
                height={800}
                quality={100}
                className='max-h-[450px] max-w-[450px]'
              />
            </div>
          </div>
        </div>

        <div className='h-fit w-screen bg-white flex gap-8 md:gap-32 items-center justify-center '>
          <div className='w-[90%] text-center md:text-left flex flex-col justify-center items-center md:justify-evenly md:flex-row max-w-[1200px]'>
            <div className='flex flex-col gap-2 justify-center items-center p-4 '>
              <h1 className='w-full font-bold text-2xl '>
                3. Review your dashboard
              </h1>
              <h3 className='w-fit '>
                Review your personal dashboard with metrics that will help you
                manage your daily expenditures. Add extra expenses to monitor
                your daily spending and make sure you keep on track.
              </h3>
            </div>
            <div className='w-fit relative max-h-[450px]'>
              <Image
                alt='dashboard-image'
                src={'/dashboard.png'}
                priority={true}
                width={800}
                height={800}
                quality={100}
                className='max-h-[450px] max-w-[450px]'
              />
            </div>
          </div>
        </div>
        <div className='h-fit w-screen flex gap-8 md:gap-32 z-50 items-start justify-center '>
          <div className='w-[90%] min-h-fit text-center  flex flex-col justify-center items-center max-w-[1200px]'>
            <div className=' flex flex-col gap-2 justify-start items-center p-4'>
              <h1 className='w-full font-bold text-2xl '>
                4. Terms we use at MyFin
              </h1>
              <h3 className='w-fit '>
                Here is a list of terminology that we use to describe our
                finances, this should make things a bit clearer when reviewing
                your dashboard.{' '}
              </h3>
            </div>

            <GuideTable />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

About.getInitialProps = async (context: any, client: any, currentUser: any) => {
  return currentUser;
};
