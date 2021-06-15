import dotenv from 'dotenv';
import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';

dotenv.config();

passport.use(new googleStrategy({ callbackURL: '/auth/google/redirect',
                                 clientID: process.env.CLIENT_ID, 
                               clientSecret: process.env.CLIENT_SECRET
                             },
                             (accessToken, refreshToken, profile, done)=> {

                                console.log(profile)
                             }
                             ));



