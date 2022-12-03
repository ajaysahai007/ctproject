import Joi from 'joi';
import userType from '../../../../enums/userType';
import status from '../../../../enums/status';
import { getImageUrl } from '../../../../helper/util';
import responseMessage from '../../../../../assets/responseMessage';
import response from '../../../../../assets/response';
import apiError from '../../../../helper/apiError';
import { userServices } from '../../services/user';
const { findUser } = userServices;

import { subActivityServices } from '../../services/personalSafety';
const { createSubActivity, findSubActivity, updateSubActivity, updateSubActivityById, listSubActivity } = subActivityServices;

import commonFunction from '../../../../helper/util';
import sleepTracking from '../../../../models/sleepTraining';
import Tracking from '../../../../models/sleepTracking';
import mentalData from '../../../../models/metalHealthAndWellBeing';
import { getVideoDurationInSeconds } from 'get-video-duration';
import journal from '../../../../models/journal';
import symptoms from '../../../../models/symptoms';

export class controller {

    /**
 * @swagger
 * /activities/addPersonalSafetySubData:
 *   post:
 *     tags:
 *       - PERSONAL SAFETY
 *     description: addPersonalSafetySubData
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token of admin
 *         in: header
 *         required: true
 *       - name: id
 *         description: id
 *         in: query
 *         enum: [31,32,33]
 *         required: true
 *       - name: title
 *         description: title
 *         in: formData
 *         required: true
 *       - name: content
 *         description: content
 *         in: formData
 *         required: true
 *       - name: image
 *         description: image
 *         in: formData
 *         type: file
 *         required: false
 *       - name: media
 *         description: media
 *         in: formData
 *         required: false
 *       - name: mediaType
 *         description: mediaType
 *         in: formData
 *         required: false
 *     responses:
 *       200:
 *         description: Data added succesfully.
 *       409:
 *         description: Admin not found.
 *       404:
 *         description: Data already exists.
 */
    async addPersonalSafetySubData(req, res, next) {
        try {
            const { content, title, tutorials } = req.body
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await findSubActivity({ content: content, status: status.ACTIVE })
            if (data) {
                throw apiError.conflict(responseMessage.ALREADY_EXITS)
            }
            if (req.files.length !== 0) {
                let x = (req.files[0].mimetype).split('/')
                var type = x[0]
                var image = await commonFunction.getImageUrl(req.files)
            }
            let obj = {
                id: req.query.id,
                title: title,
                content: content,
                media: image,
                mediaType: type,
                tutorials: tutorials
            }
            let finalData = await createSubActivity(obj)
            return res.json(new response(finalData, "Data added succesfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/personalSafetySubList:
*   post:
*     tags:
*       - PERSONAL SAFETY
*     description: personalSafetySubList
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin or token
*         in: header
*         required: true
*       - name: id
*         description: id when using user token
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
*         description: Data added succesfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async personalSafetySubList(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await listSubActivity(req.body, user.userType)
            if (data.docs.length === 0) {
                return res.json(new response(data, responseMessage.DATA_NOT_FOUND))
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/viewPersonalSafetySubData:
*   get:
*     tags:
*       - PERSONAL SAFETY
*     description: viewPersonalSafetySubData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin or user
*         in: header
*         required: true
*       - name: _id
*         description: _id of activity
*         in: query
*         required: true
*     responses:
*       200:
*         description: Data found succesfully.
*       409:
*         description: Data not found.
*/
    async viewPersonalSafetySubData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { _id: req.query._id, status: { $ne: status.DELETE } }
            }
            else {
                query = { _id: req.query._id, status: status.ACTIVE }
            }
            let data = await findSubActivity(query)
            if (!data) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error)

        }
    }

    /**
* @swagger
* /activities/updatePersonalSafetySubData:
*   put:
*     tags:
*       - PERSONAL SAFETY
*     description: updatePersonalSafetySubData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: _id
*         description: _id
*         in: query
*         required: true
*       - name: title
*         description: title
*         in: formData
*         required: false
*       - name: content
*         description: content
*         in: formData
*         required: false
*       - name: image
*         description: image
*         in: formData
*         type: file
*         required: false
*       - name: media
*         description: media
*         in: formData
*         required: false
*       - name: mediaType
*         description: mediaType
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Activity updated succesfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async updatePersonalSafetySubData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await findSubActivity({ _id: req.query._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.conflict(responseMessage.ACTIVITY_NOT_FOUND)
            }
            if (req.files.length != 0) {
                let x = (req.files[0].mimetype).split('/')
                req.body.mediaType = x[0]
                req.body.media = await commonFunction.getImageUrl(req.files)
            }
            let finalData = await updateSubActivity({ _id: data._id }, { $set: req.body })
            return res.json(new response(finalData, "Activity updated succesfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/blockPersonalSafetySubData:
*   put:
*     tags:
*       - PERSONAL SAFETY
*     description: blockPersonalSafetySubData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: _id
*         description: _id 
*         in: query
*         required: true
*     responses:
*       200:
*         description: Sleep training video block/unblock successfully.
*       409:
*         description: Admin not found.
*/
    async blockPersonalSafetySubData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await findSubActivity({ _id: req.query._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound("Personal safety sub data does not exists.")
            }
            if (data.status === status.ACTIVE) {
                let save = await updateSubActivity({ _id: data._id }, { $set: { status: status.BLOCK } })
                return res.json(new response(save, "Personal safety sub data block successfully."))
            }
            let save = await updateSubActivity({ _id: data._id }, { $set: { status: status.ACTIVE } })
            return res.json(new response(save, "Personal safety sub data unblock successfully."))
        } catch (error) {
            return next(error)
        }
    }

    //     /**
    // * @swagger
    // * /activities/addSleepTrackingData:
    // *   put:
    // *     tags:
    // *       - MENTAL HEALTH & WELL BEING
    // *     description: addSleepTrackingData
    // *     produces:
    // *       - application/json
    // *     parameters:
    // *       - name: token
    // *         description: token of admin
    // *         in: header
    // *         required: true
    // *       - name: bedTime
    // *         description: bedTime
    // *         in: formData
    // *         required: true
    // *       - name: wakeUpTime
    // *         description: wakeUpTime
    // *         in: formData
    // *         required: true
    // *     responses:
    // *       200:
    // *         description: Sleep tracking data addded successfully.
    // *       409:
    // *         description: User not found.
    // */
    //     async addSleepTrackingData(req, res, next) {
    //         try {
    //             let user = await findUser({ _id: req.userId })
    //             if (!user) {
    //                 throw apiError.notFound(responseMessage.USER_NOT_FOUND)
    //             }
    //             let save = await sleepTracking.create(req.body)
    //             return res.json(new response(save, "Sleep tracking data addded successfully."))
    //         } catch (error) {
    //             return next(error)
    //         }
    //     }

    // async sleepTrackingGraph(req, res, next){
    //     try {

    //     } catch (error) {
    //         return next(error)
    //     }
    // // }

    /**
* @swagger
* /activities/addSleepTrainingData:
*   post:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: addSleepTrainingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: videoName
*         description: videoName
*         in: formData
*         required: true
*       - name: video
*         description: video
*         in: formData
*         type: file
*         required: false
*     responses:
*       200:
*         description: Sleep training video added successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async addSleepTrainingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            if (req.files) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let stringUrl = req.body.url;
                req.body.thumbnail = stringUrl.replace('mp4','png')
            }
            let save = await sleepTracking.create(req.body)
            return res.json(new response(save, "Sleep training video added successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/viewSleepTrainingData:
*   get:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: viewSleepTrainingData
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
*         description: Sleep training video get successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async viewSleepTrainingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { _id: req.query._id, status: { $ne: status.DELETE } }
            }
            else {
                query = { _id: req.query._id, status: status.ACTIVE }
            }
            let save = await sleepTracking.findOne(query)
            if (!save) {
                throw apiError.notFound('Sleep training video not found.')
            }
            return res.json(new response(save, "Sleep training video get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/listSleepTrainingData:
*   get:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: listSleepTrainingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token 
*         in: header
*         required: true
*       - name: page
*         description: page
*         in: query
*         required: false
*       - name: limit
*         description: limit
*         in: query
*         required: false
*     responses:
*       200:
*         description: Sleep training list get successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async listSleepTrainingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { status: { $ne: status.DELETE } }
            }
            else {
                query = { status: status.ACTIVE }
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 }
            }
            let data = await sleepTracking.paginate(query, options)
            if (data.docs.length === 0) {
                throw apiError.notFound("No data found in sleep training list.")
            }
            return res.json(new response(data, "Sleep training list get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/editSleepTrainingData:
*   put:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: editSleepTrainingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
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
*       - name: video
*         description: video
*         in: formData
*         type: file
*         required: false
*     responses:
*       200:
*         description: Sleep training video updated successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async editSleepTrainingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await sleepTracking.findOne({ _id: req.query._id })
            if (!data) {
                throw apiError.notFound("This sleep training data does not exists.")
            }
            if (req.files.length != 0) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let string =  req.body.url
                req.body.thumbnail = string.replace('mp4','png')
            }
            let save = await sleepTracking.findByIdAndUpdate({ _id: data._id }, { $set: req.body }, { new: true })
            return res.json(new response(save, "Sleep training video updated successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/blockSleepTrainingData:
*   put:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: blockSleepTrainingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: _id
*         description: _id 
*         in: query
*         required: true
*     responses:
*       200:
*         description: Sleep training video block/unblock successfully.
*       409:
*         description: Admin not found.
*/
    async blockSleepTrainingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await sleepTracking.findOne({ _id: req.query._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound("This sleep training data does not exists.")
            }
            if (data.status === status.ACTIVE) {
                let save = await sleepTracking.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.BLOCK } }, { new: true })
                return res.json(new response(save, "Sleep training video block successfully."))
            }
            let save = await sleepTracking.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.ACTIVE } }, { new: true })
            return res.json(new response(save, "Sleep training video unblock successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/addSleepTrackingData:
*   post:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: addSleepTrackingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: videoName
*         description: videoName
*         in: formData
*         required: true
*       - name: video
*         description: video
*         in: formData
*         type: file
*         required: false
*     responses:
*       200:
*         description: Sleep training video added successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async addSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            if (req.files.length !==0) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let string =  req.body.url
                req.body.thumbnail = string.replace('mp4','png')
            }
            let save = await Tracking.create(req.body)
            return res.json(new response(save, "Sleep training video added successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/viewSleepTrackingData:
    *   get:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: viewSleepTrackingData
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
    *         description: Sleep Tracking video get successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async viewSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { _id: req.query._id, status: { $ne: status.DELETE } }
            }
            else {
                query = { _id: req.query._id, status: status.ACTIVE }
            }
            let save = await Tracking.findOne(query)
            if (!save) {
                throw apiError.notFound('Sleep tracking video not found.')
            }
            return res.json(new response(save, "Sleep tracking video get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/listSleepTrackingData:
    *   get:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: listSleepTrackingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token 
    *         in: header
    *         required: true
    *       - name: page
    *         description: page
    *         in: query
    *         required: false
    *       - name: limit
    *         description: limit
    *         in: query
    *         required: false
    *     responses:
    *       200:
    *         description: Sleep Tracking list get successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async listSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { status: { $ne: status.DELETE } }
            }
            else {
                query = { status: status.ACTIVE }
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 }
            }
            let data = await Tracking.paginate(query, options)
            if (data.docs.length === 0) {
                throw apiError.notFound("No data found in sleep tracking list.")
            }
            return res.json(new response(data, "Sleep tracking list get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/editSleepTrackingData:
    *   put:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: editSleepTrackingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token of admin
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
    *       - name: video
    *         description: video
    *         in: formData
    *         type: file
    *         required: false
    *     responses:
    *       200:
    *         description: Sleep Tracking video updated successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async editSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await Tracking.findOne({ _id: req.query._id })
            if (!data) {
                throw apiError.notFound("This sleep tracking data does not exists.")
            }
            if (req.files.length != 0) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let string =  req.body.url
                req.body.thumbnail = string.replace('mp4','png')
            }
            let save = await Tracking.findByIdAndUpdate({ _id: data._id }, { $set: req.body }, { new: true })
            return res.json(new response(save, "Sleep tracking video updated successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/blockSleepTrackingData:
    *   put:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: blockSleepTrackingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token of admin
    *         in: header
    *         required: true
    *       - name: _id
    *         description: _id 
    *         in: query
    *         required: true
    *     responses:
    *       200:
    *         description: Sleep Tracking video block/unblock successfully.
    *       409:
    *         description: Admin not found.
    */
    async blockSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await Tracking.findOne({ _id: req.query._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound("This sleep tracking data does not exists.")
            }
            if (data.status === status.ACTIVE) {
                let save = await Tracking.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.BLOCK } }, { new: true })
                return res.json(new response(save, "Sleep tracking video block successfully."))
            }
            let save = await Tracking.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.ACTIVE } }, { new: true })
            return res.json(new response(save, "Sleep tracking video unblock successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/addMentalAndWellBeingData:
*   post:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: addMentalAndWellBeingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: type
*         description: type
*         enum: ["POSITIVE_THINKING","SELF_CARE","MINDFULNESS","MANAGING_STRESS","MANAGING_EMOTION","RELATIONSHIP","RUNNING","YOGA"]
*         in: formData
*         required: true
*       - name: article_name
*         description: article_name
*         in: formData
*         required: true
*       - name: content
*         description: content
*         in: formData
*         required: true
*       - name: objective
*         description: objective
*         in: formData
*         required: true
*       - name: video
*         description: video
*         in: formData
*         type: file
*         required: false
*     responses:
*       200:
*         description: Mental and well being data added successfully.
*       409:
*         description: Admin not found.
*       404:
*         description: Data already exists.
*/
    async addMentalAndWellBeingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            if (req.files.length !==0) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let data = await getVideoDurationInSeconds(req.files[0].path)
                console.log("video duration -=-=-=-=-=-=--=<><><><><><>>", data);
                req.body.videoDuration = data / 60
            }
            let save = await mentalData.create(req.body)
            return res.json(new response(save, "Mental health and well being data added successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/viewMentalAndWellBeingData:
    *   get:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: viewMentalAndWellBeingData
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
    *         description: Mental and well being data video get successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async viewMentalAndWellBeingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { _id: req.query._id, status: { $ne: status.DELETE } }
            }
            else {
                query = { _id: req.query._id, status: status.ACTIVE }
            }
            let save = await mentalData.findOne(query)
            if (!save) {
                throw apiError.notFound('Mental health and well being data not found.')
            }
            return res.json(new response(save, "Mental health and well being data video get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/listMentalAndWellBeingData:
    *   get:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: listMentalAndWellBeingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token 
    *         in: header
    *         required: true
    *       - name: type
    *         description: type
    *         enum: ["POSITIVE_THINKING","SELF_CARE","MINDFULNESS","MANAGING_STRESS","MANAGING_EMOTION","RELATIONSHIP","RUNNING","YOGA"]
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
    *     responses:
    *       200:
    *         description: Sleep Tracking list get successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async listMentalAndWellBeingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query;
            if (user.userType === userType.ADMIN) {
                query = { status: { $ne: status.DELETE } }
            }
            else {
                query = { status: status.ACTIVE }
            }
            if (req.query.type) {
                query.type = req.query.type
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 }
            }
            let data = await mentalData.paginate(query, options)
            if (data.docs.length === 0) {
                throw apiError.notFound("No data found in mental health and well being list.")
            }
            return res.json(new response(data, "Mental health and well being list get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/editMentalAndWellBeingData:
    *   put:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: editMentalAndWellBeingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token of admin
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
    *       - name: content
    *         description: content
    *         in: formData
    *         required: false
    *       - name: objective
    *         description: objective
    *         in: formData
    *         required: false
    *       - name: video
    *         description: video
    *         in: formData
    *         type: file
    *         required: false
    *     responses:
    *       200:
    *         description: Mental health and well being data updated successfully.
    *       409:
    *         description: Admin not found.
    *       404:
    *         description: Data already exists.
    */
    async editMentalAndWellBeingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await mentalData.findOne({ _id: req.query._id })
            if (!data) {
                throw apiError.notFound("This mental health and well being data does not exists.")
            }
            if (req.files.length != 0) {
                req.body.url = await commonFunction.getImageUrl(req.files)
                let data = await getVideoDurationInSeconds(req.files[0].path)
                console.log("video duration -=-=-=-=-=-=--=<><><><><><>>", data);
                req.body.videoDuration = data / 60
            }
            let save = await mentalData.findByIdAndUpdate({ _id: data._id }, { $set: req.body }, { new: true })
            return res.json(new response(save, "Mental health and well being data updated successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
    * @swagger
    * /activities/blockMentalAndWellBeingData:
    *   put:
    *     tags:
    *       - MENTAL HEALTH & WELL BEING
    *     description: blockMentalAndWellBeingData
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: token
    *         description: token of admin
    *         in: header
    *         required: true
    *       - name: _id
    *         description: _id 
    *         in: query
    *         required: true
    *     responses:
    *       200:
    *         description: Mental health and well being data block/unblock successfully.
    *       409:
    *         description: Admin not found.
    */
    async blockMentalAndWellBeingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let data = await mentalData.findOne({ _id: req.query._id, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound("This mental health and well being data does not exists.")
            }
            if (data.status === status.ACTIVE) {
                let save = await mentalData.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.BLOCK } }, { new: true })
                return res.json(new response(save, "Mental health and well being data block successfully."))
            }
            let save = await mentalData.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.ACTIVE } }, { new: true })
            return res.json(new response(save, "Mental health and well being data unblock successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/addJournalOrGoal:
*   post:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: addJournalOrGoal
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of user
*         in: header
*         required: true
*       - name: type
*         description: type of journal
*         enum: ["JOURNAL","GOAL"]
*         in: formData
*         required: true
*       - name: title
*         description: title 
*         in: formData
*         required: true
*       - name: myGoalanswer
*         description: myGoalanswer 
*         in: formData
*         required: true
*       - name: achieveGoalanswer
*         description: achieveGoalanswer 
*         in: formData
*         required: true
*       - name: rewardGoalanswer
*         description: rewardGoalanswer 
*         in: formData
*         required: true
*       - name: completionDate
*         description: completionDate 
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Journal successfully added.
*       409:
*         description: User not found.
*/
    async addJournalOrGoal(req, res, next) {
        try {
            console.log(req.body);
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            req.body.userId = user._id;
            let data = await journal.create(req.body)
            return res.json(new response(data, "Journal successfully added."))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
* @swagger
* /activities/listAllGoals:
*   get:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: listAllGoals
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of user
*         in: header
*         required: true
*       - name: type
*         description: type of goal
*         enum: ["JOURNAL","GOAL"]
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
*     responses:
*       200:
*         description: Goals found successfully.
*       409:
*         description: No goals found.
*/
    async listAllGoals(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query = { status: status.ACTIVE, userId: user._id }
            console.log("1271=-==-", query);
            if (req.query.type) {
                query.type = req.query.type
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 }
            }
            let data = await journal.paginate(query, options)
            if (data.docs.length === 0) {
                throw apiError.notFound("Add your gratitude.")
            }
            return res.json(new response(data, "Goals found successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/viewJournalOrGoal:
*   get:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: viewJournalOrGoal
*     produces:
*       - application/json
*     parameters:
*       - name: _id
*         description: _id of goal
*         in: query
*         required: true
*     responses:
*       200:
*         description: Goals data found successfully.
*       409:
*         description: No goals found.
*/
    async viewJournalOrGoal(req, res, next) {
        try {
            let data = await journal.findOne({ _id: req.query._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.notFound("No goals found.")
            }
            return res.json(new response(data, "Goals data found successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/editJournalOrGoal:
*   put:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: editJournalOrGoal
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of user
*         in: header
*         required: true
*       - name: _id
*         description: _id of journal
*         in: query
*         required: true
*       - name: title
*         description: title 
*         in: formData
*         required: false
*       - name: myGoalanswer
*         description: myGoalanswer 
*         in: formData
*         required: false
*       - name: achieveGoalanswer
*         description: achieveGoalanswer 
*         in: formData
*         required: false
*       - name: rewardGoalanswer
*         description: rewardGoalanswer 
*         in: formData
*         required: false
*       - name: completionDate
*         description: completionDate 
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Goals successfully updated.
*       409:
*         description: User not found.
*/
    async editJournalOrGoal(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await journal.findOne({ _id: req.query._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.notFound("No goals found.")
            }
            let up = await journal.findByIdAndUpdate({ _id: data._id }, { $set: req.body }, { new: true })
            return res.json(new response(up, "Goals successfully updated."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /activities/deleteJournalOrGoal:
*   delete:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: deleteJournalOrGoal
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of user
*         in: header
*         required: true
*       - name: _id
*         description: _id of journal
*         in: query
*         required: true
*     responses:
*       200:
*         description: Goals successfully deleted.
*       409:
*         description: User not found/No goals found.
*/
    async deleteJournalOrGoal(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await journal.findOne({ _id: req.query._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.notFound("No goals found.")
            }
            let up = await journal.findByIdAndUpdate({ _id: data._id }, { $set: { status: status.DELETE } }, { new: true })
            return res.json(new response(up, "Goals successfully deleted."))
        } catch (error) {
            return next(error)
        }
    }

        /**
* @swagger
* /activities/symptomsList:
*   get:
*     tags:
*       - MENTAL HEALTH & WELL BEING
*     description: symptomsList
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Symtoms get sucessfully.
*       409:
*         description: No data found in symtoms list.
*/
    async symptomsList(req, res, next){
        try {
            let data = await symptoms.find({status:status.ACTIVE}).sort({createdAt:-1})
            console.log("1452*/*/*/",data);
            if(data.length === 0){
                throw apiError.notFound("No data found in symtoms list.")
            }
            return res.json(new response(data,"Symtoms get sucessfully."))
        } catch (error) {
            return next(error)
        }
    }

}
export default new controller()