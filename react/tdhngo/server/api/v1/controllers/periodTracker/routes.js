import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()


    .get('/viewPeriodTracker', controller.viewPeriodTracker)

    .use(auth.verifyToken)
    .post('/listPeriodTracker', controller.listPeriodTracker)

    .put('/blockUnblockPeriodTracker', controller.blockUnblockPeriodTracker)

    .use(upload.uploadFile)
    .post('/addPeriodTracker', controller.addPeriodTracker)
    .put('/editPeriodTracker', controller.editPeriodTracker)

