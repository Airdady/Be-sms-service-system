import fs from 'fs';
import validate from './index';
import Send from '../../utils/response';

const Validation = {
  sms(req, res, next) {
    const err = validate(
      req.body,
      {
        from: { req: true, details: 'You need to provide a sender ID' },
        to: { req: true, min: 10, details: 'You need to provide the message destination'  },
        content: { req: true, details: 'You need to provide the content to be sent' }
      },
      error => error
    );
    if (err) return Send(res, 400, err);
    next();
  },
  batch(req, res, next) {
    if(req.body.messages){
        return req.body.messages.map((message, i)=>{
            if(!message.content) return Send(res, 400, {
                content: 'content is required',
                details: `You need to provide content for the object at position ${i}`
            })
            if(!message.to) return Send(res, 400, {
                to: 'TO is required',
                details: `You need to provide message destination for the object at position ${i}`
            })
            if(message.to && !Array.isArray(message.to)) return Send(res, 400, {
                to: 'TO must be an array of phone numbers',
                details: `You need to provide an array of phone numbers for the object at position ${i}`
            })
            if(!message.from) return Send(res, 400, {
                from: 'from is required',
                details: `You need to provide message senderID for the object at position ${i}`
            })
            if(message.to && !message.to.length) return Send(res, 400, {
                to: 'you need to provide at least destination',
                details: `You need to provide the message destination for the object at position ${i}`
            })
        })
    }
    // console.log(req.messages)
    const err = validate(
      req.body,
      {
        messages: { req: true, details: 'You need to provide an array of messages to be sent' },
      },
      error => error
    );
    if (err) return Send(res, 400, err);
    next();
  },
};

export default Validation;