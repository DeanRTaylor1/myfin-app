import Logo from '../Logo';
import { useEffect, useState, Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ProfileMenuProps } from '@modules/common/types/types-interfaces';

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  mobileNavHandler,
  profileItems,
  authItems,
  mobileProfileHandler,
  profileScale,
}) => {
  const [profileMenuClassname, setProfileMenuClassname] = useState<string>(
    `profileMenu ${profileScale}`
  );

  useEffect(() => {
    setProfileMenuClassname(`profileMenu ${profileScale}`);
  }, [profileScale]);

  return (
    <Fragment>
      <div className={profileMenuClassname}>
        <div className='flex justify-between items-center h-18'>
          <Logo
            color={'text-blue-400'}
            mobileProfileHandler={mobileProfileHandler}
            mobileNavHandler={mobileNavHandler}
          />
          <XMarkIcon
            className='h-6 w-6 hover:cursor-pointer'
            onClick={mobileProfileHandler}
          />
        </div>
        <div className='flex flex-col h-[calc(92%)] justify-between'>
          <ul className='md:flex hidden flex-col gap-2 py-4'>{profileItems}</ul>
        </div>
        <ul className='md:flex hidden justify-center border-t border-gray-200 border-dashed p-4 items-center'>
          {authItems}
        </ul>
      </div>
    </Fragment>
  );
};

export default ProfileMenu;
