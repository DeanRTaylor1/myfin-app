import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const stockshandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=VOO&apikey=${process.env.NEXT_PUBLIC_STOCKS_API_KEY}`
      );
      const data = response;
     // console.log(data.data);
      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
    }
  }
};

export default stockshandler;
