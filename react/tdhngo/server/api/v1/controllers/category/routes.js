import Express from "express";
import controller from "./controller";
import auth from '../../../../helper/auth';
import upload from '../../../../helper/uploadHandler';


export default Express.Router()

    .use(auth.verifyToken)
    .get('/viewCategory', controller.viewCategory)
    .delete('/deleteCategory', controller.deleteCategory)
    .get('/listCategory', controller.listCategory)


    .use(upload.uploadFile)
    .post('/addCategory', controller.addCategory)
    .put('/editCategory', controller.editCategory)