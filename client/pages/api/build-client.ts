import axios from 'axios';

const BuildClient = ({ req }: any) => {
  if (typeof window === 'undefined') {
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    return axios.create({
      baseURL:
        //'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/',
        'myfinapi.dev',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
      withCredentials: true,
    });
  }
};

export default BuildClient;
