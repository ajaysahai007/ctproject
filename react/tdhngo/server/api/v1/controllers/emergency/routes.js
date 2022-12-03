import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .get('/viewEmergency', controller.viewEmergency)
    .post('/listEmergency', controller.listEmergency)

    .use(auth.verifyToken)
    .delete('/deleteEmergency', controller.deleteEmergency)

    .use(upload.uploadFile)
    .post('/addEmergency', controller.addEmergency)
    .put('/editEmergency', controller.editEmergency)