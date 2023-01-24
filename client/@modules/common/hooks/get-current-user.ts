import axios from 'axios';

const getCurrentUserFunction = async () => {
  const { data } = await axios.get(
    `/api/users/currentuser`,
    { withCredentials: true }
  );
  return data;
};

export default getCurrentUserFunction;
