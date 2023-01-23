import Link from 'next/link';
import { LogoProps } from '@modules/common/types/types-interfaces';

const FormLogo: React.FC<{ color?: string }> = ({ color }) => {
  const logoStyle = `logo ${color}`;

  return (
    <div className={logoStyle}>
      <Link href='/'>MyFin</Link>
    </div>
  );
};

export default FormLogo;
