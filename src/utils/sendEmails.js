
import sgMail  from '@sendgrid/mail'
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = (receiver, source, subject, content ) => { 
    
    const data = {
        to: receiver,
        from: source, 
        subject,
        html: content,
       
    };
   
    return sgMail.send(data).then((res) =>{
        console.log(res)
    })

    .catch((err)=>{
        console.log(err)

    })

     
    } 

  export default sendEmail;
 