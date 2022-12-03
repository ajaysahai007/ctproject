import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import { getImageUrl } from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';
import { userServices } from '../../services/user'

import { periodTrackerServices } from '../../services/periodTracker';
const { findUser } = userServices;

const { createPeriodTracker, findPeriodTracker, updatePeriodTracker, updatePeriodTrackerById, listPeriodTracker } = periodTrackerServices;

export class periodTrackerController {

    /**
     * @swagger
     * /periodTracker/addPeriodTracker:
     *   post:
     *     tags:
     *       - PERIOD_TRACKER MANAGEMENT
     *     description: addPeriodTracker
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: videoName
     *         description: videoName
     *         in: formData
     *         required: true
     *       - name: url
     *         description: url
     *         in: formData
     *         type: file
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addPeriodTracker(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            if (req.files) {
                validatedBody.url = await getImageUrl(req.files);
                let string =  validatedBody.url
                validatedBody.thumbnail = string.replace('mp4','png')
            }
            let result = await createPeriodTracker(validatedBody);
            return res.json(new response(result, responseMessage.TRACKER_ADDED));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /periodTracker/editPeriodTracker:
     *   put:
     *     tags:
     *       - PERIOD_TRACKER MANAGEMENT
     *     description: editPeriodTracker
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
     *       - name: videoName
     *         description: videoName
     *         in: formData
     *         required: false
     *       - name: url
     *         description: url
     *         in: formData
     *         type: file
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async editPeriodTracker(req, res, next) {
        try {
            let adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let tracker = await findPeriodTracker({ _id: req.query._id, status: status.ACTIVE })
            if (!tracker) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            if (req.files.length != 0) {
                req.body.url = await getImageUrl(req.files);
            }
            let update = await updatePeriodTrackerById({ _id: tracker._id }, req.body)
            return res.json(new response(update, responseMessage.UPDATE_TRACKER))
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /periodTracker/listPeriodTracker:
     *   post:
     *     tags:
     *       - PERIOD_TRACKER MANAGEMENT
     *     description: listPeriodTracker
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: search
     *         description: search by video_name
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
    async listPeriodTracker(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body)
            let adminResult = await findUser({ _id: req.userId })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let data = await listPeriodTracker(validatedBody,adminResult.userType)
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
     * /periodTracker/viewPeriodTracker:
     *   get:
     *     tags:
     *       - PERIOD_TRACKER MANAGEMENT
     *     description: viewPeriodTracker
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
    async viewPeriodTracker(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.query)
            let data = await findPeriodTracker({ _id: validatedBody._id, status: {$ne:status.DELETE} })
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
     * /periodTracker/blockUnblockPeriodTracker:
     *   put:
     *     tags:
     *       - PERIOD_TRACKER MANAGEMENT
     *     description: blockUnblockPeriodTracker
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
    async blockUnblockPeriodTracker(req,res,next){
        const validatedBody = await Joi.validate(req.query);
        var adminRes = await findUser({ _id: req.userId, status: status.ACTIVE, userType: userType.ADMIN })
        if (!adminRes) {
            throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
        } else {
            let data = await findPeriodTracker({ _id: validatedBody._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.PERIOD_TRACKER_NOT_FOUND);
            }
            if (data.status === status.ACTIVE) {
                let updateRes = await updatePeriodTrackerById({ _id: data._id }, { status: status.BLOCK })
                return res.json(new response(updateRes, responseMessage.TRACKER_BLOCKED));
            } else {
                if (data.status === status.BLOCK) {
                    let updateRes = await updatePeriodTrackerById({ _id: data._id }, { status: status.ACTIVE })
                    return res.json(new response(updateRes, responseMessage.TRACKER_ACTIVATED));
                }
            }
        }
    }
}

export default new periodTrackerController()