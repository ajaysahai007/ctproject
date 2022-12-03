import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .post('/login', controller.login)
    .post('/forgotPassword', controller.forgotPassword)
    .post('/resendOTP', controller.resendOTP)
    .post('/verifyOTP', controller.verifyOTP)
    .get('/feedbackView', controller.feedbackView)
    .post('/getMessageFromChatBot',controller.getMessageFromChatBot)

    .use(auth.verifyToken)
    .get('/getProfile', controller.getProfile)
    .put('/resetPassword', controller.resetPassword)
    .post('/listUsers', controller.listUsers)
    .get('/viewUsers', controller.viewUsers)
    .put('/blockUnblockUsers', controller.blockUnblockUsers)
    .post('/feedbackList', controller.feedbackList)
    .get('/adminDashboard', controller.adminDashboard)
    .get('/registeredUserGraph',controller.registeredUserGraph)
    .post('/listReport',controller.listReport)
    .post('/addPushNotificationToUser',controller.addPushNotificationToUser)

    .use(upload.uploadFile)
    .put('/updateProfile', controller.updateProfile)