import mongoose from 'mongoose';
import { app } from './app';
import pool from './pool';
import cron from 'node-cron';
import { fetchStocks } from './services/stocks';

const PORT = process.env.PORT || 3000;

const start = async () => {
  console.log('\x1b[34m%s\x1b[0m', 'Starting up...');
  /* console.log('\x1b[34m%s\x1b[0m', 'env:' + process.env.NODE_ENV);
  console.log('\x1b[34m%s\x1b[0m', process.env.NODE_ENV === 'production');
  console.log('Test');
  */
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (
    !process.env.RDS_HOST ||
    !process.env.RDS_USER ||
    !process.env.RDS_PASSWORD
  ) {
    throw new Error('RDS config not defined correctly');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('\x1b[34m%s\x1b[0m', 'Connected to Mongo');

    pool.connect({
      host: process.env.RDS_HOST,
      port: 5432,
      database: 'deanrtaylorfinance',
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
    });

    fetchStocks();
    //refetch stock data every midnight
    cron.schedule('0 0 0 * * *', () => {
      console.log('Cron running');
      fetchStocks();
    });
    //test
    //test

    console.log('\x1b[34m%s\x1b[0m', 'Connected to Postgres');
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log('\x1b[34m%s\x1b[0m', `Listening on port ${PORT}`);
  });
};

start();
