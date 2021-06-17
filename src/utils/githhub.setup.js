import dotenv from 'dotenv';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import githubOauthModel from '../models/googleOauth'

dotenv.config();

passport.serializeUser((user, done)=>{
    return done(null,user.id)
})

passport.deserializeUser((id, done)=>{
    githubOauthModel.findById(id).then((user)=>{
     done(null,user)
 })
})

passport.use(new GitHubStrategy({ callbackURL: process.env.GITHUB_CALLBACK_URL,
                    clientID: process.env.GITHUB_CLIENT_ID, 
                clientSecret: process.env.GITHUB_CLIENT_SECRET
                },
                (accessToken, refreshToken, profile, done)=> {
                    console.log(accessToken, refreshToken,profile)
                    githubOauthModel.findOne({githubId :profile.id}).then(user=>{
                        if(user) {
                            done(null, user)
                        }else{
                            new githubOauthModel({userName:profile.username}).save().then((user) =>{
                            done(null, user) 
                            })
                        }
                    })
                  }



                   
                
                ));



