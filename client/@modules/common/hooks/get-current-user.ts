import axios from 'axios';

const getCurrentUserFunction = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/users/currentuser`,
    { withCredentials: true }
  );
  return data;
};

export default getCurrentUserFunction;
