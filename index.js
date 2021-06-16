import express from 'express';
import Routes from './src/routes';
import { methodError, serverError } from './src/middleware';
import cors from 'cors';
import passport from 'passport';
import {} from './src/utils/passport.setup';
import cookieSession from 'cookie-session';

import './src/database';


const app = express();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({maxAge:24*60*60*1000, keys:[process.env.SESSION_KEY]}))




app.use(cors()).use(Routes).use(methodError).use(serverError);

app.listen(process.env.PORT || 3000);
