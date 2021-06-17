import mongoose  from "mongoose";
const githubOauthSchema = new mongoose.Schema({
    userName:String,
    githubId:String
});

const githubOauthModel = mongoose.model('Github', githubOauthSchema)


export default githubOauthModel;
