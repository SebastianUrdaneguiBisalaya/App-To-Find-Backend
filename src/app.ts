import express from 'express';
import cookieParser from 'cookie-parser';
import routerMain from './routes';
import routerEvents from './context/events/routes';
import cors from 'cors';

import { errorHandler } from './shared/middleware';

const app = express();

const whiteList = ['http://localhost:5173', 'https://example.com'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(routerMain);
app.use(routerEvents);
app.use(errorHandler);
export default app;
