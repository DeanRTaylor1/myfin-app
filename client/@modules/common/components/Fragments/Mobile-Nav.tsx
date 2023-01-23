import { XMarkIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import { MobileNavProps } from '@modules/common/types/types-interfaces';
import { useEffect, useState } from 'react';

const Mobilenav: React.FC<MobileNavProps> = ({
  authItems,
  navItems,
  scale,
  profileItems,
  mobileNavHandler,
  mobileProfileHandler,
}) => {
  const [mobileStyle, setMobileStyle] = useState(`mobileNav ${scale}`);

  useEffect(() => {
    setMobileStyle(`mobileNav ${scale}`);
  }, [scale]);

  return (
    <div className={mobileStyle}>
      <div className='flex justify-between items-center h-18'>
        <Logo
          color={'text-blue-400'}
          mobileNavHandler={mobileNavHandler}
          mobileProfileHandler={mobileProfileHandler}
        />
        <XMarkIcon
          className='h-6 w-6 hover:cursor-pointer'
          onClick={mobileNavHandler}
        />
      </div>
      <div className='flex flex-col h-h90 justify-between'>
        <div>
          <ul className='md:hidden flex flex-col gap-2 py-4'>{navItems}</ul>
          {profileItems && (
            <ul className='md:hidden flex flex-col gap-2 py-4 border-t border-gray-200 border-dashed'>
              {profileItems}
            </ul>
          )}
        </div>
        <ul className='md:hidden flex justify-center border-t border-gray-200 border-dashed p-4 items-center'>
          {authItems}
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
