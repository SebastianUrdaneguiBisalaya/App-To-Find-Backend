import express from 'express';
import cookieParser from 'cookie-parser';
import mainRouter from './routes';
import cors from 'cors';
import { errorHandler } from './shared/middleware';
import uploadRoutes from './uploadImages/routes';

const app = express();

const whiteList = [
  'https://app-to-find-events.vercel.app/',
  'https://app-to-find-events-backend.onrender.com',
  'http://localhost:3000',
];

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(mainRouter);
app.use(errorHandler);
app.use(uploadRoutes);
export default app;
