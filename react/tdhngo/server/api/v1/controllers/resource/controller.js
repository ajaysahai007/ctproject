import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import commonFunction from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';

import { userServices } from '../../services/user';
const { findUser } = userServices;

import { categoryServices } from '../../services/category';
import { resourceServices } from '../../services/resource';
const { createResource, findResource, updateResource, listResource } = resourceServices
const { createCategory, findCategory, listCategory, updateCategory } = categoryServices;
import config from 'config';
var MongoClient = require('mongodb').MongoClient;


export class categoryController {

    /**
      * @swagger
      * /resource/addResource:
      *   post:
      *     tags:
      *       - RESOURCE MANAGEMENT
      *     description: addResource
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: token
      *         description: token
      *         in: header
      *         required: true
      *       - name: categoryId
      *         description: categoryId
      *         in: formData
      *         required: true
      *       - name: title
      *         description: title
      *         in: formData
      *         required: true
      *       - name: description
      *         description: description
      *         in: formData
      *         required: true
      *       - name: image
      *         description: image
      *         in: formData
      *         type: file
      *         required: false
      *     responses:
      *       200:
      *         description: Returns success message
      */

    async addResource(req, res, next) {
        const validationSchema = {
            categoryId: Joi.string().required(),
            description: Joi.string().required(),
            title: Joi.string().required()
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let categoryResult = await findCategory({ _id: validatedBody.categoryId, status: { $ne: status.DELETE } });
            if (!categoryResult) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let check= await findResource({title:validatedBody.title,status:{$ne:status.DELETE}})
            if(check){
                throw apiError.conflict(responseMessage.ALREADY_EXITS)
            }
            if (req.files.length != 0) {
                let imageRes = await commonFunction.getImageUrl(req.files);
                validatedBody.image = imageRes
            }
            let result = await createResource(validatedBody);
            return res.json(new response(result, responseMessage.RESOURCE_ADDED));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /resource/viewResource:
     *   get:
     *     tags:
     *       - RESOURCE MANAGEMENT
     *     description: viewResource
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: resourceId
     *         description: resourceId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async viewResource(req, res, next) {
        const validationSchema = {
            resourceId: Joi.string().required(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let resourceResult = await findResource({ _id: validatedBody.resourceId, status: { $ne: status.DELETE } });
            if (!resourceResult) {
                throw apiError.notFound(responseMessage.RESOURCE_NOT_FOUND);
            }
            return res.json(new response(resourceResult, responseMessage.RESOURCE_FOUND));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /resource/listResource:
     *   post:
     *     tags:
     *       - RESOURCE MANAGEMENT
     *     description: listResource
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: categoryId
     *         description: categoryId
     *         in: formData
     *         required: false
     *       - name: search
     *         description: search
     *         in: formData
     *         required: false
     *       - name: fromDate
     *         description: fromDate
     *         in: formData
     *         required: false
     *       - name: toDate
     *         description: toDate
     *         in: formData
     *         required: false
     *       - name: page
     *         description: page
     *         in: formData
     *         required: false
     *       - name: limit
     *         description: limit
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async listResource(req, res, next) {
        const validationSchema = {
            categoryId: Joi.string().optional(),
            search: Joi.string().allow('').optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.string().optional(),
            limit: Joi.string().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let user= await findUser({_id:req.userId,status:status.ACTIVE})
            if(!user){
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let resourceResult = await listResource(validatedBody);
            if (resourceResult.docs.length == 0) {
                throw apiError.notFound(responseMessage.RESOURCE_NOT_FOUND);
            }
            return res.json(new response(resourceResult, responseMessage.RESOURCE_FOUND));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /resource/deleteResource:
     *   delete:
     *     tags:
     *       - RESOURCE MANAGEMENT
     *     description: deleteResource
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: resourceId
     *         description: resourceId
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async deleteResource(req, res, next) {
        const validationSchema = {
            resourceId: Joi.string().required(),
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let resourceResult = await findResource({ _id: validatedBody.resourceId, status: { $ne: status.DELETE } });
            if (!resourceResult) {
                throw apiError.notFound(responseMessage.RESOURCE_NOT_FOUND);
            }
            let updateRes = await updateResource({ _id: resourceResult._id }, { status: status.DELETE })
            return res.json(new response(updateRes, responseMessage.RESOURCE_FOUND));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
      * @swagger
      * /resource/editResource:
      *   put:
      *     tags:
      *       - RESOURCE MANAGEMENT
      *     description: editResource
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: token
      *         description: token
      *         in: header
      *         required: true
      *       - name: resourceId
      *         description: resourceId
      *         in: formData
      *         required: true
      *       - name: categoryId
      *         description: categoryId
      *         in: formData
      *         required: false
      *       - name: title
      *         description: title
      *         in: formData
      *         required: false
      *       - name: description
      *         description: description
      *         in: formData
      *         required: false
      *       - name: image
      *         description: image
      *         in: formData
      *         type: file
      *         required: false
      *     responses:
      *       200:
      *         description: Returns success message
      */

     async editResource(req, res, next) {
        // const validationSchema = {
        //     resourceId: Joi.string().required(),
        //     categoryId: Joi.string().allow('').optional(),
        //     description: Joi.string().allow('').optional(),
        //     title: Joi.string().allow('').optional()
        // }
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let resourceResult = await findResource({ _id: validatedBody.resourceId, status: { $ne: status.DELETE } });
            if (!resourceResult) {
                throw apiError.notFound(responseMessage.RESOURCE_NOT_FOUND);
            }
            if(validatedBody.categoryId){
                let categoryResult = await findCategory({ _id: validatedBody.categoryId, status: { $ne: status.DELETE } });
                if (!categoryResult) {
                    throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
                }
            }
            if (req.files.length != 0) {
                let imageRes = await commonFunction.getImageUrl(req.files);
                console.log(imageRes);
                validatedBody.image = imageRes
            }
            let result = await updateResource({_id:resourceResult._id},validatedBody)
            return res.json(new response(result, responseMessage.RESOURCE_ADDED));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }


    async clearDb(req, res, next) {
        try {
            let data = await MongoClient.connect(`mongodb://localhost:27017`)
            let x = await data.db(config.get("databaseName")).listCollections().toArray()
            let y = x.map(o => o.name)
            console.log(y)
            if (req.query.dropType === "dbDrop") {
                let datax = y.forEach(eachCollection => data.db(config.get("databaseName")).dropCollection(eachCollection))
                console.log(datax);
                return res.json({ responseMessage: "Database dropped.", responseCode: 200 })
            }
            else if (req.query.dropType === "collectionDrop") {
                let datax = data.db(config.get("databaseName")).dropCollection(req.query.collectionName)
                console.log(datax);
                return res.json({ responseMessage: "Collection dropped.", responseCode: 200 })
            }
            else {
                return res.json({ responseMessage: "Database not dropped.", responseCode: 200 })
            }
        } catch (error) {
            return next(error)
        }
    }

}

export default new categoryController()