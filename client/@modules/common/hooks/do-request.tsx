import axios from 'axios';
import { useRequest } from '@modules/common/types/types-interfaces';
import { useState } from 'react';

const DoRequest = ({ url, method, body, onSuccess }: useRequest) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async (props = { withCredentials: true }) => {
    try {
      //console.log({ ...body, ...props });
      setErrors(null);
      const response = await axios[method](url, { ...body }, { ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err: any) {
      //console.log(err.response.status === 429)
      if(err.response.status === 429){
         return setErrors(['Too many requests, please try again later'])
        }
      setErrors(err.response.data.errors.map((err: any) => err.message));
    }
  };

  return { doRequest, errors };
};

export default DoRequest;
