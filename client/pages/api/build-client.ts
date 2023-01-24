import axios from 'axios';

const BuildClient = ({ req }: any) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        //'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/',
        'http://www.myfinapi.dev',
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
