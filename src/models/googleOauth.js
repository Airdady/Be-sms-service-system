import mongoose  from "mongoose";
const googleOauthSchema = new mongoose.Schema({
   
    userName: {
        type: String,
       
      },
      googleId: {
        type: String,
       
      },
    email: {
        type: String,
      
      },
});

const googleOauthModel = mongoose.model('Oauth',googleOauthSchema)

export default googleOauthModel;
