import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/users/current-user';
import { NotFoundError, errorHandler, currentUser } from './common';
import { signupRouter } from './routes/users/signup';
import { signinRouter } from './routes/users/signin';
import { signoutRouter } from './routes/users/signout';
import { confirmationRouter } from './routes/users/confirmation';
import * as dotenv from 'dotenv';
import { indexFinancesRouter } from './routes/finances';
import { updateUserRouter } from './routes/finances/update';
dotenv.config();
import cors from 'cors';
import { outgoingsNewRouter } from './routes/finances/outgoings/new';
import { deleteOutgoingRouter } from './routes/finances/outgoings/delete';
import { updateDutgoingRouter } from './routes/finances/outgoings/update';
import { getOutgoingsRouter } from './routes/finances/outgoings';
import { expensesIndexRouter } from './routes/finances/expenses';
import { expensesNewRouter } from './routes/finances/expenses/new';
import { deleteExpenseRouter } from './routes/finances/expenses/delete';
import { expenseCountRouter } from './routes/finances/expenses/count';
import { dashboardDataValuesRouter } from './routes/finances/outgoings/dashboard';
import { deleteAccountRouter } from './routes/users/delete';
import { googleRouter } from './routes/users/googleAuth';
import passport from 'passport';
import { facebookRouter } from './routes/users/facebook-auth';
import { githubRouter } from './routes/users/github-auth';
import { fetchStocks } from './services/stocks';
import { getStocksRouter } from './routes/finances/stocks/getStocks';
require('./services/passportOAuth');

const app = express();

// ingress nginx will be sending requests via proxy default behaviour is to reject
app.set('trust proxy', true);

app.use(express.json());

//the code below means that you have to put https:// in your post requests!
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', //require https if we are in prod
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(confirmationRouter);
app.use(currentUser);
app.use(indexFinancesRouter);
app.use(updateUserRouter);
app.use(outgoingsNewRouter);
app.use(deleteOutgoingRouter);
//app.use(updateDutgoingRouter);
app.use(getOutgoingsRouter);
app.use(expensesIndexRouter);
app.use(expensesNewRouter);
app.use(deleteExpenseRouter);
app.use(expenseCountRouter);
app.use(dashboardDataValuesRouter);
app.use(deleteAccountRouter);
app.use(googleRouter);
app.use(facebookRouter);
app.use(githubRouter);
app.use(getStocksRouter);

//not found 404
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
