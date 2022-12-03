import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import { getImageUrl } from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';
import { userServices } from '../../services/user'

import { menstrualHygieneServices } from '../../services/menstrualHygiene';
const { findUser } = userServices;

const { createMenstrualHygiene, findMenstrualHygiene, updateMenstrualHygiene, updateMenstrualHygieneById, listMenstrualHygiene } = menstrualHygieneServices;

export class periodTrackerController {
    /**
     * @swagger
     * /menstrualHygiene/addMenstrualHygiene:
     *   post:
     *     tags:
     *       - MENSTRUAL HYGIENE
     *     description: addCategory
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: article_name
     *         description: article_name
     *         in: formData
     *         required: true
     *       - name: image
     *         description: image
     *         in: formData
     *         type: file
     *         required: true
     *       - name: video
     *         description: video
     *         in: formData
     *         type: file
     *         required: true
     *       - name: objective
     *         description: objective
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addMenstrualHygiene(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            console.log("dhgfdhgdfhgfhgfhg",validatedBody);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            if (req.files) {
                console.log(req.files);
                validatedBody.image = await getImageUrl(req.files);
                let videoData = req.files.filter(o=>o.fieldname === "video")
                console.log(videoData);
                validatedBody.video = await getImageUrl(videoData);
                let UrlString = validatedBody.video;
                validatedBody.thumbnail = UrlString.replace('mp4','png')
            }
            let result = await createMenstrualHygiene(validatedBody);
            return res.json(new response(result, responseMessage.ADD_HYGIENE));
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }

    /**
     * @swagger
     * /menstrualHygiene/editMenstrualHygiene:
     *   put:
     *     tags:
     *       - MENSTRUAL HYGIENE
     *     description: editMenstrualHygiene
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
     *       - name: article_name
     *         description: article_name
     *         in: formData
     *         required: false
     *       - name: image
     *         description: image
     *         in: formData
     *         type: file
     *         required: false
     *       - name: video
     *         description: video
     *         in: formData
     *         type: file
     *         required: false
     *       - name: objective
     *         description: objective
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async editMenstrualHygiene(req, res, next) {
        try {
            let adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let tracker = await findMenstrualHygiene({ _id: req.query._id, status: status.ACTIVE })
            if (!tracker) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            if (req.files.length != 0) {
                req.body.image = await getImageUrl(req.files);
                req.body.video = await getImageUrl(req.files);
            }
            let update = await updateMenstrualHygieneById({ _id: tracker._id }, req.body)
            return res.json(new response(update, responseMessage.UPDATE_HYGIENE)
            )
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /menstrualHygiene/listMenstrualHygiene:
     *   post:
     *     tags:
     *       - MENSTRUAL HYGIENE
     *     description: listMenstrualHygiene
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: search
     *         description: search by article_name
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
     *       - name: fromDate
     *         description: fromDate
     *         in: formData
     *         required: false
     *       - name: toDate
     *         description: toDate
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async listMenstrualHygiene(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body)
            let adminResult = await findUser({ _id: req.userId })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let data = await listMenstrualHygiene(validatedBody)
            if (data.docs.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /menstrualHygiene/viewMenstrualHygiene:
     *   get:
     *     tags:
     *       - MENSTRUAL HYGIENE
     *     description: viewMenstrualHygiene
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
    async viewMenstrualHygiene(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.query)
            let adminResult = await findUser({ _id: req.userId })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let data = await findMenstrualHygiene({ _id: validatedBody._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /menstrualHygiene/blockUnblockMenstrualHygiene:
     *   put:
     *     tags:
     *       - MENSTRUAL HYGIENE
     *     description: blockUnblockMenstrualHygiene
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

    async blockUnblockMenstrualHygiene(req,res,next){
        const validatedBody = await Joi.validate(req.query);
        var adminRes = await findUser({ _id: req.userId, status: status.ACTIVE, userType: userType.ADMIN })
        if (!adminRes) {
            throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
        } else {
            let data = await findMenstrualHygiene({ _id: validatedBody._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.PERIOD_TRACKER_NOT_FOUND);
            }
            if (data.status === status.ACTIVE) {
                let updateRes = await updateMenstrualHygieneById({ _id: data._id }, { status: status.BLOCK })
                return res.json(new response(updateRes, responseMessage.HYGIENE_BLOCKED));
            } else {
                if (data.status === status.BLOCK) {
                    let updateRes = await updateMenstrualHygieneById({ _id: data._id }, { status: status.ACTIVE })
                    return res.json(new response(updateRes, responseMessage.HYGIENE_ACTIVATED));
                }
            }
        }
    }
}

export default new periodTrackerController()