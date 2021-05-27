import express from 'express';
import Routes from './src/routes';
import { methodError, serverError } from './src/middleware';
import './src/database';

const app = express();

app.use(express.json());

app
  .use(Routes)
  .use(methodError)
  .use(serverError);

app.listen(process.env.PORT || 5000);
