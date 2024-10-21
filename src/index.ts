import app from './app';
import http from 'http';
import { databaseConnect } from './database/database';
import { config } from './config/config';

(async () => {
  const { PORT } = config();
  const server = http.createServer(app);
  await databaseConnect();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
