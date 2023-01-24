import { User } from '../models/postgres/user-model'

export const checkUserId = async (email: string, userId: number) => {
  const { id } = await User.findByEmail(email);
  console.log(id, userId)
  return id === userId
}
