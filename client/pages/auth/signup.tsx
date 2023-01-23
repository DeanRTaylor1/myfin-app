import { Fragment } from 'react';
import SignupForm from '@modules/common/components/Form/Signup-Form';
import Stripes from '@modules/common/components/Fragments/Stripes';

const Signup: React.FC = () => {
  return (
    <Fragment>
      <SignupForm />
      <Stripes />
    </Fragment>
  );
};

export default Signup;
