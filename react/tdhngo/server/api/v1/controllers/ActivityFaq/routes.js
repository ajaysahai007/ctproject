import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    
   
    .use(auth.verifyToken)
    .post('/listActivityFaq',controller.listActivityFaq)
    .get('/viewActivityFaq',controller.viewActivityFaq)

    .put('/blockUnblockActivityFaq',controller.blockUnblockActivityFaq)
    
    .post('/addActivityFaq', controller.addActivityFaq)
    .put('/editActivityFaq', controller.editActivityFaq)
    
    .use(upload.uploadFile)


