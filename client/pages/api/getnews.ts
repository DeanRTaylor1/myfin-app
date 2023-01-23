import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=finance&page=0&api-key=${process.env.NEXT_PUBLIC_NY_TIMES_API_KEY}&fl=web_url&fl=abstract&fl=lead_paragraph&fl=news_desk`
      );
      const docs = response.data.response.docs;
      res.status(200).json({ docs });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
