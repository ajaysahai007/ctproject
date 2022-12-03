import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import { getImageUrl } from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';
import { userServices } from '../../services/user'

import { activityFaqServices } from '../../services/activityFaq';
const { findUser } = userServices;

const { createActivityFaq, findActivityFaq, updateActivityFaq, updateActivityFaqById, listActivityFaqs } = activityFaqServices;

export class activityFaqController {
    /**
     * @swagger
     * /activityFaq/addActivityFaq:
     *   post:
     *     tags:
     *       - ACTIVITY FAQ MANAGEMENT
     *     description: addActivityFaq
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: question
     *         description: question
     *         in: formData
     *         required: true
     *       - name: answer
     *         description: answer
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async addActivityFaq(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let result = await createActivityFaq(validatedBody);
            return res.json(new response(result, responseMessage.FAQ_ADDED));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /activityFaq/editActivityFaq:
     *   put:
     *     tags:
     *       - ACTIVITY FAQ MANAGEMENT
     *     description: editActivityFaq
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
     *       - name: question
     *         description: question
     *         in: formData
     *         required: false
     *       - name: answer
     *         description: answer
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async editActivityFaq(req, res, next) {
        try {
            let adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let tracker = await findActivityFaq({ _id: req.query._id, status: status.ACTIVE })
            if (!tracker) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            let update = await updateActivityFaqById({ _id: tracker._id }, req.body)
            return res.json(new response(update, responseMessage.EDIT_FAQ)
            )
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /activityFaq/listActivityFaq:
     *   post:
     *     tags:
     *       - ACTIVITY FAQ MANAGEMENT
     *     description: listActivityFaq
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: search
     *         description: search by question
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
    async listActivityFaq(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body)
            let adminResult = await findUser({ _id: req.userId })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let data = await listActivityFaqs(validatedBody)
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
     * /activityFaq/viewActivityFaq:
     *   get:
     *     tags:
     *       - ACTIVITY FAQ MANAGEMENT
     *     description: viewActivityFaq
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
    async viewActivityFaq(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.query)
            let adminResult = await findUser({ _id: req.userId })
            if (!adminResult) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND);
            }
            let data = await findActivityFaq({ _id: validatedBody._id, status: status.ACTIVE })
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
     * /activityFaq/blockUnblockActivityFaq:
     *   put:
     *     tags:
     *       - ACTIVITY FAQ MANAGEMENT
     *     description: blockUnblockActivityFaq
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

    async blockUnblockActivityFaq(req,res,next){
        const validatedBody = await Joi.validate(req.query);
        var adminRes = await findUser({ _id: req.userId, status: status.ACTIVE, userType: userType.ADMIN })
        if (!adminRes) {
            throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
        } else {
            let data = await findActivityFaq({ _id: validatedBody._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.PERIOD_TRACKER_NOT_FOUND);
            }
            if (data.status === status.ACTIVE) {
                let updateRes = await updateActivityFaqById({ _id: data._id }, { status: status.BLOCK })
                return res.json(new response(updateRes, responseMessage.FAQ_BLOCKED));
            } else {
                if (data.status === status.BLOCK) {
                    let updateRes = await updateActivityFaqById({ _id: data._id }, { status: status.ACTIVE })
                    return res.json(new response(updateRes, responseMessage.FAQ_UNBLOCKED));
                }
            }
        }
    }
}

export default new activityFaqController()