import mongoose  from "mongoose";
const googleOauthSchema = new mongoose.Schema({
    userName:String,
    googleId:String
});

const googleOauthModel = mongoose.model('Oauth',googleOauthSchema)

export default googleOauthModel;
