import Express from "express";
import controller from "./controller";
import upload from '../../../../helper/uploadHandler';
import auth from '../../../../helper/auth';

export default Express.Router()

.post('/staticContent', controller.addStaticContent)
.get('/staticContent', controller.viewStaticContent)
.put('/staticContent', controller.editStaticContent)
.get('/staticContentList', controller.staticContentList)
.get('/listBanner', controller.listBanner)
.post('/listAdminBanner', controller.listAdminBanner)
.get('/viewBanner', controller.viewBanner)
.get('/viewFAQ', controller.viewFAQ)
.get('/listFAQ', controller.listFAQ)

.use(auth.verifyToken)
.delete('/deleteBanner', controller.deleteBanner)
.post('/addFaq', controller.addFaq)
.put('/blockunblockBanner',controller.blockunblockBanner)

.use(upload.uploadFile)
.post('/addBanner', controller.addBanner)
.put('/editBanner', controller.editBanner)