import Link from 'next/link';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import Mobilenav from './Mobile-Nav';
import uniqid from 'uniqid';
import { useState } from 'react';
import { PropsWithAuth } from '@modules/common/types/types-interfaces';
import ProfileMenu from './profile/profile-menu';

const Navbar: React.FC<PropsWithAuth> = ({ currentUser }) => {
  const [scale, setScale] = useState('scale-0');
  const [profileScale, setProfileScale] = useState<string>('-right-96');
  const authItems = [
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <button
            onClick={(e) => mobileNavHandler(e, 'button')}
            className='navButton'
            key={href}
          >
            {label}
          </button>
        </Link>
      );
    });

  const navItems = [
    currentUser && { label: 'Dashboard', href: '/dashboard' },
    true && { label: 'Stocks', href: '/stocks' },
    true && { label: 'News', href: '/news' },
    true && { label: 'Guide', href: '/guide' },
    true && { label: 'About', href: '/about' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <li
            className='navItem'
            key={href}
            onClick={(e) => mobileNavHandler(e, 'button')}
          >
            {label}
          </li>
        </Link>
      );
    });

  const profileItems = [
    currentUser && { label: 'My Profile', href: '/user/profile' },
    currentUser && { label: 'Regular Outgoings', href: '/outgoings' },
    currentUser && { label: 'Daily expenses', href: '/expenses' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <li
            className='navItem'
            key={href}
            onClick={(e) => {
              mobileNavHandler(e, 'button');
              mobileProfileHandler(e, 'button');
            }}
          >
            {label}
          </li>
        </Link>
      );
    });

  const mobileProfileHandler = (event: any, source?: string) => {
    //this condition closes the navbar if the users clicks one of the buttons/links
    //console.log(source);
    if (source === 'button') {
      return setProfileScale('-right-96 ');
    }
    profileScale === 'right-0'
      ? setProfileScale('-right-96')
      : setProfileScale('right-0');
  };

  const mobileNavHandler = (event: any, source?: string) => {
    //this condition closes the navbar if the users clicks one of the buttons/links
    //console.log(source);
    if (source === 'button') {
      return setScale('scale-0');
    }
    scale === 'scale-0' ? setScale('scale-100') : setScale('scale-0');
  };

  return (
    <div className='navbar max-w-[1200px]'>
      <Logo
        mobileNavHandler={mobileNavHandler}
        mobileProfileHandler={mobileProfileHandler}
      />
      <ul className='hidden md:flex justify-around items-center  w-[calc(750px)] pr-12 '>
        {navItems}
      </ul>
      {/*<ul className='hidden md:flex  gap-2'>{authItems}</ul>*/}
      {currentUser && (
        <UserCircleIcon
          className='h-12 w-10 hidden md:flex hover:cursor-pointer'
          onClick={mobileProfileHandler}
        />
      )}
      {currentUser && (
        <ProfileMenu
          authItems={authItems}
          mobileProfileHandler={mobileProfileHandler}
          profileScale={profileScale}
          profileItems={profileItems}
          mobileNavHandler={mobileNavHandler}
        />
      )}
      {!currentUser && (
        <ul className='md:flex hidden justify-center border-t border-gray-200 border-dashed p-4 items-center'>
          {authItems}
        </ul>
      )}
      <Bars3Icon
        className='h-8 w-6 md:hidden hover:cursor-pointer'
        onClick={mobileNavHandler}
      />
      <Mobilenav
        authItems={authItems}
        navItems={navItems}
        profileItems={profileItems}
        scale={scale}
        mobileNavHandler={mobileNavHandler}
        mobileProfileHandler={mobileProfileHandler}
      />
    </div>
  );
};

export default Navbar;
