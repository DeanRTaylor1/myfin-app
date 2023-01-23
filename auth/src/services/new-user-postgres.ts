import { User } from '../models/postgres/user-model';

const initPgUser = async (email: string, username: string) => {
  const user = await User.findByEmail(email);

  if (user) {
    console.log(`User with email: ${email} already exists in postgres`);
    return;
  }

  const result = await User.insertNewUser(email, username);
  console.log(result);
  return;
};

export default initPgUser;
