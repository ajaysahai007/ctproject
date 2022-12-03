import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import { getImageUrl } from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';

import { userServices } from '../../services/user';
const { findUser } = userServices;

import { emergencyServices } from '../../services/emergency';
const { createEmergency, findEmergency, updateEmergency, emergencyList, listEmergencyPaginate } = emergencyServices

export class emergencyController {

    /**
     * @swagger
     * /emergency/addEmergency:
     *   post:
     *     tags:
     *       - EMERGENCY MANAGEMENT
     *     description: addEmergency
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: contactNumber
     *         description: contactNumber
     *         in: formData
     *         required: true
     *       - name: district
     *         description: district
     *         in: formData
     *         required: true
     *       - name: state
     *         description: state
     *         in: formData
     *         required: true
     *       - name: location
     *         description: location
     *         in: formData
     *         required: true
     *       - name: emergencyType
     *         description: emergencyType
     *         in: formData
     *         enum: ["FIRE","POLICE_STATION","AMBULANCE","WOMEN_HELPLINE" ]
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

    async addEmergency(req, res, next) {
        // const validationSchema = {
        //     contactNumber: Joi.string().required(),
        //     district: Joi.string().required(),
        //     state: Joi.string().required(),
        //     location: Joi.string().required(),
        //     emergencyType: Joi.string().required(),
        //     image: Joi.string().optional()
        // }
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let emergencyResult = await findEmergency({ emergencyType: validatedBody.emergencyType, district: validatedBody.district, state: validatedBody.state, location: validatedBody.location, status: { $ne: status.DELETE } });
            if (emergencyResult) {
                throw apiError.conflict(responseMessage.EMERGENCY_EXIST);
            }
            if (req.files) {
                validatedBody.image = await getImageUrl(req.files);
            }

            let result = await createEmergency(validatedBody);
            return res.json(new response(result, responseMessage.EMERGENCY_ADDED));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /emergency/viewEmergency:
     *   get:
     *     tags:
     *       - EMERGENCY MANAGEMENT
     *     description: viewEmergency
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: emergencyId
     *         description: emergencyId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async viewEmergency(req, res, next) {
        const validationSchema = {
            emergencyId: Joi.string().required()
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let emergencyResult = await findEmergency({ _id: validatedBody.emergencyId, status: { $ne: status.DELETE } });
            if (!emergencyResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(emergencyResult, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /emergency/listEmergency:
     *   post:
     *     tags:
     *       - EMERGENCY MANAGEMENT
     *     description: listEmergency
     *     produces:
     *       - application/json
     *     parameters:
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
     *       - name: emergencyType
     *         description: emergencyType ("FIRE","POLICE_STATION","AMBULANCE","WOMEN_HELPLINE")
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

    async listEmergency(req, res, next) {
        // const validationSchema = {
        //     search: Joi.string().optional(),
        //     fromDate: Joi.string().optional(),
        //     toDate: Joi.string().optional(),
        //     emergencyType: Joi.string().optional(),
        //     page: Joi.string().optional(),
        //     limit: Joi.string().optional(),
        // }
        try {
            const validatedBody = await Joi.validate(req.body);
            let emergencyResult = await listEmergencyPaginate(validatedBody);
            if (emergencyResult.docs.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(emergencyResult, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
 * @swagger
 * /emergency/deleteEmergency:
 *   delete:
 *     tags:
 *       - EMERGENCY MANAGEMENT
 *     description: deleteEmergency
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: emergencyId
 *         description: emergencyId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */

    async deleteEmergency(req, res, next) {
        const validationSchema = {
            emergencyId: Joi.string().required()
        }
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let emergencyResult = await findEmergency({ _id: validatedBody.emergencyId, status: { $ne: status.DELETE } });
            if (!emergencyResult) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            let updateRes = await updateEmergency({ _id: emergencyResult._id }, { status: status.DELETE })
            return res.json(new response(updateRes, responseMessage.DATA_FOUND));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /emergency/editEmergency:
     *   put:
     *     tags:
     *       - EMERGENCY MANAGEMENT
     *     description: editEmergency
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: emergencyId
     *         description: emergencyId
     *         in: formData
     *         required: true
     *       - name: contactNumber
     *         description: contactNumber
     *         in: formData
     *         required: false
     *       - name: district
     *         description: district
     *         in: formData
     *         required: false
     *       - name: state
     *         description: state
     *         in: formData
     *         required: false
     *       - name: location
     *         description: location
     *         in: formData
     *         required: false
     *       - name: emergencyType
     *         description: emergencyType
     *         in: formData
     *         enum: ["FIRE","POLICE_STATION","AMBULANCE","WOMEN_HELPLINE" ]
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

     async editEmergency(req, res, next) {
        // const validationSchema = {
        //     emergencyId:Joi.string().required(),
        //     contactNumber: Joi.string().allow('').optional(),
        //     district: Joi.string().allow('').optional(),
        //     state: Joi.string().allow('').optional(),
        //     location: Joi.string().allow('').optional(),
        //     emergencyType: Joi.string().allow('').optional(),
        //     image: Joi.string().optional()
        // }
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let emergencyRes = await findEmergency({ _id: validatedBody.emergencyId, status: { $ne: status.DELETE } });
            if (!emergencyRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            // let emergencyResult = await findEmergency({ emergencyType: validatedBody.emergencyType, district: validatedBody.district, state: validatedBody.state, location: validatedBody.location,_id:{$ne:emergencyRes._id}, status: { $ne: status.DELETE } });
            // if (emergencyResult) {
            //     throw apiError.conflict(responseMessage.EMERGENCY_EXIST);
            // }
            if (req.files.length!=0) {
                validatedBody.image = await getImageUrl(req.files);
            }

            let result = await updateEmergency({_id:emergencyRes._id},validatedBody);
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        }
        catch (error) {
            return next(error);
        }
    }

}

export default new emergencyController()