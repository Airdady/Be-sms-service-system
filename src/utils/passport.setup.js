import dotenv from 'dotenv';
import passport from 'passport';
import googleStrategy from 'passport-google-oauth20';
import googleOauthModel from '../models/googleOauth'

dotenv.config();

passport.serializeUser((user, done)=>{
    return done(null,user.id)
})

passport.deserializeUser((id, done)=>{
 googleOauthModel.findById(id).then((user)=>{
     done(null,user)
 })
})

passport.use(new googleStrategy({ callbackURL: '/auth/google/redirect',
                                 clientID: process.env.CLIENT_ID, 
                               clientSecret: process.env.CLIENT_SECRET
                             },
                             (accessToken, refreshToken, profile, done)=> {

                                console.log(profile)
                                googleOauthModel.findOne({googleId :profile.id}).then(user=>{
                                    if(user) {
                                        done(null, user)
                                    }else{
                                        new googleOauthModel({userName:profile.name.givenName}).save().then((user) =>{
                                           done(null, user) 
                                        })
                                    }
                                })
                             }
                             ));



