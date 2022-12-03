import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    
   
    .use(auth.verifyToken)
    .post('/listMenstrualHygiene',controller.listMenstrualHygiene)
    .get('/viewMenstrualHygiene',controller.viewMenstrualHygiene)

    .put('/blockUnblockMenstrualHygiene',controller.blockUnblockMenstrualHygiene)
    
    .use(upload.uploadFile)
    .post('/addMenstrualHygiene', controller.addMenstrualHygiene)
    .put('/editMenstrualHygiene', controller.editMenstrualHygiene)

