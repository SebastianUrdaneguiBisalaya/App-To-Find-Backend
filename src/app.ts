import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log({ request });
  response.status(401);
  response.json({ message: 'Unauthorized' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
