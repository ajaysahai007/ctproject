import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .get('/viewJournalOrGoal', controller.viewJournalOrGoal)
    .get('/symptomsList',controller.symptomsList)

    .use(auth.verifyToken)
    .post('/personalSafetySubList', controller.personalSafetySubList)
    .get('/viewPersonalSafetySubData', controller.viewPersonalSafetySubData)

    .use(upload.uploadFile)
    .post('/addPersonalSafetySubData', controller.addPersonalSafetySubData)
    .put('/updatePersonalSafetySubData', controller.updatePersonalSafetySubData)
    .post('/addSleepTrainingData', controller.addSleepTrainingData)
    .get('/viewSleepTrainingData', controller.viewSleepTrainingData)
    .get('/listSleepTrainingData', controller.listSleepTrainingData)
    .put('/editSleepTrainingData', controller.editSleepTrainingData)
    .put('/blockSleepTrainingData', controller.blockSleepTrainingData)
    .put('/blockPersonalSafetySubData', controller.blockPersonalSafetySubData)
    .post('/addSleepTrackingData', controller.addSleepTrackingData)
    .post('/addSleepTrainingData', controller.addSleepTrainingData)
    .get('/viewSleepTrackingData', controller.viewSleepTrackingData)
    .get('/listSleepTrackingData', controller.listSleepTrackingData)
    .put('/editSleepTrackingData', controller.editSleepTrackingData)
    .put('/blockSleepTrackingData', controller.blockSleepTrackingData)
    .post('/addMentalAndWellBeingData', controller.addMentalAndWellBeingData)
    .get('/viewMentalAndWellBeingData', controller.viewMentalAndWellBeingData)
    .get('/listMentalAndWellBeingData', controller.listMentalAndWellBeingData)
    .put('/editMentalAndWellBeingData', controller.editMentalAndWellBeingData)
    .put('/blockMentalAndWellBeingData', controller.blockMentalAndWellBeingData)
    .post('/addJournalOrGoal', controller.addJournalOrGoal)
    .get('/listAllGoals', controller.listAllGoals)
    .put('/editJournalOrGoal', controller.editJournalOrGoal)
    .delete('/deleteJournalOrGoal', controller.deleteJournalOrGoal)

