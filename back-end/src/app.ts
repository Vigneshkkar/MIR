import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import TransactionRouter from './routes/transactionRoutes';
import connect from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/transaction', TransactionRouter)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
