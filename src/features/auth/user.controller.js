import User from './user.modal';
import AuthUtil from './auth.util';
import sendEmail from '../../utils/sendEmails'
import Response from '../../utils/response';
import _ from 'lodash'
import bcrypt from 'bcrypt';
import sgMail  from '@sendgrid/mail'

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const userController = {
  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (!user) return Response(res, 404, 'user does not exist');
      if (AuthUtil.comparePassword(password, user.password)) {
        user.password = undefined;
        const token = AuthUtil.createToken({
          _id: user._id,
          email: user.email,
        });
        return Response(res, 200, 'login successful', { user, token });
      }
      return Response(res, 401, 'Invalid login details');
    });
  },

  register: (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, password) => {
        User.create({ ...req.body, password }, (err, user) => {
          if (err) {
            return res.status(400).send({ message: 'Create user failed', err });
          }
          return res.status(201).send({
            status: 200,
            message: 'registration successful',
            data: user,
          });
        });
      });
    });
  },

sendResetLink: (req, res) => {
  
    const {email} = req.body;
  User.findOne({ email }).exec((err, user) => {
    if(err || !user) {
      return Response(res, 404, 'User with this email does not Exist'); 
    }
    const token = AuthUtil.createToken({_id: user._id});
      const link = `${req.protocal}://localhost:5000/resetpassword-Link/${token}`
       
      sendEmail(
        email,
        'noreply@airdady.com',
        'Reset password fucntionality',
        `
        <div> Click the link below to reset password</div> <br/>
        <div>${link}</div>
        `
      );
      return Response(res, 200, 'Password reset link has been successfully sent to your inbox');
      
  });
 
},


resetPassword:(req, res) => {
 const {resetLink,newPassword} =req.body;
 if(resetLink){
  AuthUtil.verifyToken(resetLink, function(err,decodedData) {
    if(err){
      return Response(res, 400, 'Incorrect token or expired');
    }
    User.findOne({resetLink},(err,user)=> {
      if(!user){
        return Response(res, 404, 'User with this token does not exist');
      }
      console.log(resetLink)
      const obje ={
        password:newPassword,
        resetLink:''
      }
      
      user._extend(user,obje )
      user.save((err,result) =>{
        if(err) {
          return Response(res, 404, 'reser link error'); 
        }else{
          return Response(res, 200, 'pasword changed');
        }
      })

    })
  });

}
 return Response(res, 200, 'Password reset is sucessfull');
},

};

export default userController;
