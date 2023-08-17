import express, { Router } from 'express'
import passport from 'passport';
import { createVideo } from '../controllers/videoController';
import { validation, validationBody } from '../errors/validation';
import { upload } from '../multer/storage';

const router = Router()


router.use(passport.authenticate('jwt' , {session : false}));
router.post('/' ,
    upload.single('file') ,  
    validationBody(), 
    validation , 
    createVideo ,
)

export default router ; 