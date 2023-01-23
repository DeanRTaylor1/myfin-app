import Link from 'next/link';
import { LogoProps } from '@modules/common/types/types-interfaces';

const Logo: React.FC<LogoProps> = ({
  color,
  mobileNavHandler,
  mobileProfileHandler,
}) => {
  const logoStyle = `logo ${color}`;

  const closeModalHandler = (e: any) => {
    //console.log('test');
    mobileNavHandler(e, 'button');
    mobileProfileHandler(e, 'button');
  };

  return (
    <div onClick={(e) => closeModalHandler(e)} className={logoStyle}>
      <Link href='/'>MyFin</Link>
    </div>
  );
};

export default Logo;
