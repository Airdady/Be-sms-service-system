import "regenerator-runtime/runtime";
import express from 'express';
import Routes from './routes';
import { methodError, serverError } from './middleware';
import cors from 'cors';
import './database';

console.log('ooiioiio');

const app = express();

app.use(express.json());

app.use(cors()).use(Routes).use(methodError).use(serverError);

app.listen(process.env.PORT || 5000);
