import express, { Request, Response } from 'express';
import { requireAuth } from '../../../common/middlewares/require-auth'
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/api/finances/stocks/:code',
  requireAuth,
  async (req: Request, res: Response) => {
    const { code } = req.params;
    const data = fs.readFileSync(path.resolve(__dirname, `../../../services/stock-data/${code}.txt`), 'utf-8')
    //console.log(data)
    res.status(200).send(JSON.parse(data))
  })
export { router as getStocksRouter }
