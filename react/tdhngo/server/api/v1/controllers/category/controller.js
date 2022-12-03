import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import {getImageUrl} from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';

import { userServices } from '../../services/user';
const { findUser } = userServices;

import { categoryServices } from '../../services/category';
const { createCategory, findCategory,listCategory,updateCategory ,updateCategoryById} = categoryServices;

export class categoryController {
    /**
     * @swagger
     * /category/addCategory:
     *   post:
     *     tags:
     *       - CATEGORY MANAGEMENT
     *     description: addCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: name
     *         description: name
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

    async addCategory(req, res, next) {
        const validationSchema = {
            name: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().optional()
        }
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let categoryResult = await findCategory({ name: validatedBody.name, status: { $ne: status.DELETE } });
            if (categoryResult) {
                throw apiError.conflict(responseMessage.CATEGORY_EXIST);
            }
            if (req.files) {
                validatedBody.image = await getImageUrl(req.files);
            }
            let result = await createCategory(validatedBody);
            return res.json(new response(result, responseMessage.CATEGORY_ADDED));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /category/viewCategory:
     *   get:
     *     tags:
     *       - CATEGORY MANAGEMENT
     *     description: viewCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: _id
     *         description: _id
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async viewCategory(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        }
        try {
            const { _id } = await Joi.validate(req.query, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let result = await findCategory({ _id: _id, status: { $ne: status.DELETE } });
            if (!result) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /category/editCategory:
     *   put:
     *     tags:
     *       - CATEGORY MANAGEMENT
     *     description: editCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: _id
     *         description: _id
     *         in: query
     *         required: true
     *       - name: name
     *         description: name
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

    async editCategory(req, res, next) {
        try {
            console.log("----------",req.body);
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let categoryResult = await findCategory({ _id: req.query._id, status: { $ne: status.DELETE } });
            if (!categoryResult) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            if (req.files.length!=0) {
                req.body.image = await getImageUrl(req.files);
            }
            let result = await updateCategoryById({ _id: categoryResult._id }, { $set: validatedBody });
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /category/deleteCategory:
     *   delete:
     *     tags:
     *       - CATEGORY MANAGEMENT
     *     description: deleteCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: _id
     *         description: _id
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async deleteCategory(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        }
        try {
            const { _id } = await Joi.validate(req.query, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let categoryResult = await findCategory({ _id: _id, status: { $ne: status.DELETE } });
            if (!categoryResult) {
                throw apiError.notFound(responseMessage.CATEGORY_NOT_FOUND);
            }
            let result = await updateCategory({ _id: categoryResult._id }, { $set: { status: status.DELETE } });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /category/listCategory:
     *   get:
     *     tags:
     *       - CATEGORY MANAGEMENT
     *     description: listCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: fromDate
     *         description: fromDate
     *         in: query
     *         required: false
     *       - name: toDate
     *         description: toDate
     *         in: query
     *         required: false
     *       - name: page
     *         description: page
     *         in: query
     *         required: false
     *       - name: limit
     *         description: limit
     *         in: query
     *         required: false
     *       - name: search
     *         description: search
     *         in: query
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async listCategory(req, res, next) {
        const validationSchema = {
            search: Joi.string().allow('').optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var adminResult = await findUser({ _id: req.userId});
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let result = await listCategory(validatedBody);
            if(result.docs.length==0){
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        }
        catch (error) {
            console.log(error)
            return next(error);
        }
    }
}

export default new categoryController()