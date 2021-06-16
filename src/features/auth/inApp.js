
import express from 'express';

const router =express.Router();
router.get('/',(req, res) =>{
    res.send('You have successfully logged into  your application')
})

export default router;
