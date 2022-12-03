import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .post('/register',controller.register)
    .post('/login',controller.login)
    .get('/forgotPassword',controller.forgotPassword)
    .post('/verifyDetails',controller.verifyDetails)
    .put('/resetPassword',controller.resetPassword)
    .post('/setSecurityDetails',controller.setSecurityDetails)
    .get('/getUsername',controller.getUsername)

    

    .use(auth.verifyToken)
    .post('/addHealthDetails',controller.addHealthDetails)
    .post('/listHealthDetails',controller.listHealthDetails)
    .post('/addFeedback',controller.addFeedback)
    .post('/listActivity',controller.listActivity)
    .post('/listSubActivity',controller.listSubActivity)

    .get('/viewHealthDetails',controller.viewHealthDetails)
    .get('/getProfile',controller.getProfile)

    .put('/changePassword',controller.changePassword)
    .put('/deleteMyAccount',controller.deleteMyAccount)
    .post('/addPeriodsData',controller.addPeriodsData)
    .get('/getPeriodsData',controller.getPeriodsData)
    .post('/addSymptoms',controller.addSymptoms)
    .get('/listUserSymtoms',controller.listUserSymtoms)
    .post('/addMoodData',controller.addMoodData)
    .post('/addSleepTrackingData',controller.addSleepTrackingData)
    .get('/graphDataForSleep',controller.graphDataForSleep)
    .post('/deletePeriodsData',controller.deletePeriodsData)
    .post('/chatBot',controller.chatBot)
    .get('/listNotification',controller.listNotification)
    .put('/markAsRead',controller.markAsRead)
    .put('/clearAllNotification',controller.clearAllNotification)
    .get('/logOut',controller.logOut)

    

    .use(upload.uploadFile)
    .put('/updateProfile',controller.updateProfile)
    .post('/uploadFile',controller.uploadFile)

    