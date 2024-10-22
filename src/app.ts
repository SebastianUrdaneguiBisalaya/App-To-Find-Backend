import express from 'express';
import cookieParser from 'cookie-parser';
import routerMain from './routes';

import { errorHandler } from './shared/middleware';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routerMain);
app.use(errorHandler);
export default app;
