import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    
    .get('/viewResource', controller.viewResource)
    .get('/clearDb',controller.clearDb)

    .use(auth.verifyToken)
    .delete('/deleteResource', controller.deleteResource)
    .post('/listResource', controller.listResource)   

    .use(upload.uploadFile)
    .post('/addResource', controller.addResource)
    .put('/editResource', controller.editResource)
