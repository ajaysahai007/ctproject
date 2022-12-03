import Joi from "joi";
import _ from "lodash";
import config from "config";
import jwt from "jsonwebtoken";
import userModel from "../../../../models/user";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import bcrypt from 'bcryptjs';
// import responseMessage from '../../../../../assets/responseMessage';
import { userServices } from '../../services/user';
import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';
import userType from "../../../../enums/userType";
import sleepTrackerModel from '../../../../models/sleepTracker'
let baseUrl = config.get("hostAddress");
import { healthDetailsServices } from '../../services/healthDetails';
import { feedbackServices } from '../../services/feedback';
import { activityServices } from '../../services/activity'
import { subActivityServices } from '../../services/subActivity'
const { createFeedback, findFeedback, updateFeedback, feedbackList, countFeedback, listFeedback } = feedbackServices;
const { createHealthDetails, findHealthDetails, updateHealthDetails, listHealthDetails, healthDetailsWithPaginate } = healthDetailsServices
const { findUser, updateUser, updateUserById, checkEmailMobileNumber, countUser, createUser, checkUserName, usersCount } = userServices;
const { createActivity, findActivity, updateActivity, updateActivityById, listActivity } = activityServices;
const { createSubActivity, findSubActivity, updateSubActivity, updateSubActivityById, listSubActivity } = subActivityServices;

import { periodDataServices } from '../../services/periodData';
const { createPeriodData, findPeriodData, updatePeriodData, updatePeriodDataById, listPeriodData } = periodDataServices;

import JWT from 'jsonwebtoken'
import moment from "moment";
import userSymptoms from '../../../../models/userSymptoms';
import moodData from '../../../../models/mood';
import chatActivity from '../../../../models/chatActivity';
import chat from '../../../../../chatbotService';
import notification from '../../../../models/notification';

export class userController {


    /**
     * @swagger
     * /user/uploadFile:
     *   post:
     *     tags:
     *       - UPLOAD-FILE
     *     description: uploadFile
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: uploaded_file
     *         description: uploaded_file
     *         in: formData
     *         type: file
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async uploadFile(req, res, next) {
        try {
            const { files } = req;
            console.log("493", files)
            const imageFiles = await commonFunction.getImageUrl(files);
            console.log(imageFiles, imageFiles);
            let obj = {
                mediaUrl: imageFiles,
                mediaType: imageFiles.format
            }
            return res.json(new response(obj, responseMessage.UPLOAD_SUCCESS));
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/register:
     *   post:
     *     tags:
     *       - USER
     *     description: register
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: language
     *         description: language
     *         in: formData
     *         required: true
     *       - name: userName
     *         description: userName
     *         in: formData
     *         required: true
     *       - name: password
     *         description: password
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async register(req, res, next) {
        const validationSchema = {
            language: Joi.string().required(),
            password: Joi.string().required(),
            userName: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ userName: validatedBody.userName, status: { $ne: status.DELETE } })
            let responseMessage = require('../../../../../assets/responseMessage')
            if (userResult) {
                throw apiError.conflict(responseMessage.USER_EXISTS)
            }
            let userCount = await countUser({ status: { $ne: status.DELETE } });
            validatedBody.userId = commonFunction.generateUserId(userCount);
            validatedBody.password = bcrypt.hashSync(validatedBody.password);
            validatedBody.date = new Date();
            let saveRes = await createUser(validatedBody)
            return res.json(new response(saveRes, responseMessage.USER_CREATED));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/login:
     *   post:
     *     tags:
     *       - USER
     *     description: login
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userName
     *         description: userName
     *         in: formData
     *         required: true
     *       - name: password
     *         description: password
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async login(req, res, next) {
        const validationSchema = {
            password: Joi.string().required(),
            userName: Joi.string().required(),
            deviceType: Joi.string().allow('').optional(),
            deviceToken: Joi.string().allow('').optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ $and: [{ status: { $ne: status.DELETE } }, { $or: [{ userName: validatedBody.userName }, { userId: validatedBody.userName }] }] })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            if (!bcrypt.compareSync(validatedBody.password, userResult.password)) {
                throw apiError.invalid(responseMessage.WRONG_PASSWORD);
            }
            if (userResult.status === status.BLOCK) {
                throw apiError.invalid(responseMessage.ADMIN_BLOCK)
            }
            let token = await commonFunction.getToken({ _id: userResult._id, userId: userResult.userId, userType: userResult.userType });
            await updateUser({ _id: userResult._id }, { $set: { deviceType: validatedBody.deviceType, deviceToken: validatedBody.deviceToken } })
            let obj = {
                _id: userResult._id,
                userId: userResult.userId,
                token: token,
                userType: userResult.userType,
                status: userResult.status,
                userName: userResult.userName,
                date: userResult.date,
                flag: userResult.flag,
                accountVerify: userResult.accountVerify
            }
            return res.json(new response(obj, responseMessage.LOGIN));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/getProfile:
     *   get:
     *     tags:
     *       - USER
     *     description: getProfile
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async getProfile(req, res, next) {
        try {
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            return res.json(new response(userResult, responseMessage.PROFILE_GET));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/updateProfile:
     *   put:
     *     tags:
     *       - USER
     *     description: updateProfile
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: user token
     *         in: header
     *         required: true
     *       - name: updateProfile
     *         description: updateProfile
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/updateProfile'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async updateProfile(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            // if (req.files.length != 0) {
            //     let imageRes = await commonFunction.getImageUrl(req.files);
            //     validatedBody.profilePic = imageRes.secure_url
            // }
            let updateRes = await updateUser({ _id: userResult._id }, validatedBody)
            return res.json(new response(updateRes, responseMessage.PROFILE_UPDATED));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/addHealthDetails:
     *   post:
     *     tags:
     *       - USER
     *     description: addHealthDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: height
     *         description: height
     *         in: formData
     *         required: false
     *       - name: weight
     *         description: weight
     *         in: formData
     *         required: false
     *       - name: bloodGroup
     *         description: bloodGroup
     *         in: formData
     *         required: false
     *       - name: temperature
     *         description: temperature
     *         in: formData
     *         required: false
     *       - name: hemoglobin
     *         description: hemoglobin
     *         in: formData
     *         required: false
     *       - name: bloodPressure
     *         description: bloodPressure
     *         in: formData
     *         required: false
     *       - name: bloodSugar
     *         description: bloodSugar
     *         in: formData
     *         required: false
     *       - name: date
     *         description: date
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addHealthDetails(req, res, next) {
        const validationSchema = {
            height: Joi.string().allow('').optional(),
            weight: Joi.string().allow('').optional(),
            bloodGroup: Joi.string().allow('').optional(),
            temperature: Joi.string().allow('').optional(),
            hemoglobin: Joi.string().allow('').optional(),
            bloodPressure: Joi.string().allow('').optional(),
            bloodSugar: Joi.string().allow('').optional(),
            date: Joi.string().allow('').optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let healthFindRes = await findHealthDetails({ date: validatedBody.date, userId: userResult._id })
            if (healthFindRes) {
                throw apiError.conflict(responseMessage.HEALTHS_EXISTS)
            }
            var dateOne = new Date(new Date(new Date(userResult.date).toISOString().slice(0, 10))).getTime();
            var dateTwo = new Date(new Date(new Date(validatedBody.date).toISOString().slice(0, 10))).getTime();
            if (dateOne < dateTwo || dateOne == dateTwo) {
                validatedBody.userId = userResult._id;
                let saveRes = await createHealthDetails(validatedBody)
                return res.json(new response(saveRes, responseMessage.HEALTHS_ADD));
            }
            throw apiError.badRequest(responseMessage.HEALTHS_EXISTS)
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/viewHealthDetails:
     *   get:
     *     tags:
     *       - USER
     *     description: viewHealthDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: healthId
     *         description: healthId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewHealthDetails(req, res, next) {
        const validationSchema = {
            healthId: Joi.string().allow('').optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let findHealthDetailsRes = await findHealthDetails({ _id: validatedBody.healthId, status: { $ne: status.DELETE } })
            if (!findHealthDetailsRes) {
                throw apiError.notFound(responseMessage.HEALTHS_NOT_FOUND);
            }
            return res.json(new response(findHealthDetailsRes, responseMessage.HEALTHS_FOUND));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/listHealthDetails:
     *   post:
     *     tags:
     *       - USER
     *     description: listHealthDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
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
    async listHealthDetails(req, res, next) {
        const validationSchema = {
            page: Joi.string().optional(),
            limit: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            validatedBody.userId = userResult._id
            let findHealthDetailsRes = await healthDetailsWithPaginate(validatedBody)
            if (findHealthDetailsRes.docs == 0) {
                throw apiError.notFound(responseMessage.HEALTHS_NOT_FOUND);
            }
            return res.json(new response(findHealthDetailsRes, responseMessage.HEALTHS_FOUND));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/addFeedback:
     *   post:
     *     tags:
     *       - USER
     *     description: addFeedback
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: message
     *         description: message
     *         in: formData
     *         required: true
     *       - name: rating
     *         description: rating
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addFeedback(req, res, next) {
        const validationSchema = {
            message: Joi.string().allow('').required(),
            rating: Joi.string().allow('').required(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let userResult = await findUser({ _id: req.userId, status: { $ne: status.DELETE } })
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            validatedBody.userId = userResult._id
            validatedBody.userName = userResult.userName
            let saveRes = await createFeedback(validatedBody)
            return res.json(new response(saveRes, responseMessage.FEEDBACK_ADD));
        }
        catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/setSecurityDetails:
     *   post:
     *     tags:
     *       - USER
     *     description: setSecurityDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: false
     *       - name: setSecurityDetails
     *         description: setSecurityDetails
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/setSecurityDetails'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async setSecurityDetails(req, res, next) {
        try {
            console.log("-===========", req.body);
            let update, user
            if (req.headers.token && req.headers.token != "") {
                console.log(req.headers.token);
                let auth = JWT.verify(req.headers.token, config.get("jwtsecret"))
                user = await findUser({ _id: auth._id, status: { $ne: status.DELETE } })
            }
            else {
                user = await findUser({ _id: req.body.userId, status: { $ne: status.DELETE } })
            }
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            if (req.body.securityQuestion && req.body.answer) {
                req.body.securityQuestion = bcrypt.hashSync(req.body.securityQuestion);
                req.body.answer = bcrypt.hashSync(req.body.answer);
                req.body.accountVerify = true
                req.body.gender = req.body.gender
                update = await updateUserById({ _id: user._id }, (req.body))
                console.log("90000000000000", update);
                return res.json(new response(update, responseMessage.ACCOUNT_DETAILS_COMPLETED))
            }
            update = await updateUserById({ _id: user._id }, (req.body))
            return res.json(new response(update, responseMessage.ACCOUNT_DETAILS_COMPLETED))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
     * @swagger
     * /user/forgotPassword:
     *   get:
     *     tags:
     *       - USER
     *     description: forgotPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userName
     *         description: userName
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async forgotPassword(req, res, next) {
        try {
            console.log(req.query);
            let user = await findUser({ userName: req.query.userName })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            return res.json(new response(user, "Please verify your security details ."))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
     * @swagger
     * /user/verifyDetails:
     *   post:
     *     tags:
     *       - USER
     *     description: forgotPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userName
     *         description: userName
     *         in: formData
     *         required: true
     *       - name: securityQuestion
     *         description: securityQuestion
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
    async verifyDetails(req, res, next) {
        try {
            console.log("khjshfkrror", req.body);
            let user = await findUser({ userName: req.body.userName })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            if ((!bcrypt.compareSync(req.body.securityQuestion, user.securityQuestion)) || (!bcrypt.compareSync(req.body.answer, user.answer))) {
                throw apiError.invalid(responseMessage.SEC_Q_INCORRECT);
            }
            let update = await updateUser({ userName: user.userName }, { $set: { accountVerify: true } })
            return res.json(new response(update, responseMessage.VERIFIED))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
     * @swagger
     * /user/resetPassword:
     *   put:
     *     tags:
     *       - USER
     *     description: resetPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userName
     *         description: userName
     *         in: formData
     *         required: true
     *       - name: newPassword
     *         description: newPassword
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async resetPassword(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            const { userName, newPassword } = validatedBody;
            var userInfo = await findUser({ userName: userName, status: status.ACTIVE, userType: { $ne: userType.ADMIN } })
            let responseMessage = await returnMessage(userInfo.language ? userInfo.language : "ENGLISH")
            if (!userInfo) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            var updateResult = await updateUserById({ _id: userInfo._id }, { isReset: true, password: bcrypt.hashSync(newPassword) });
            return res.json(new response(updateResult, responseMessage.RESET_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/changePassword:
     *   put:
     *     tags:
     *       - USER
     *     description: changePassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: password
     *         description: password
     *         in: formData
     *         required: true
     *       - name: newPassword
     *         description: newPassword
     *         in: formData
     *         required: true
     *       - name: confirmPassword
     *         description: confirmPassword
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Successfully updated.
     *       403:
     *         description: Old password is wrong.
     *       401:
     *         description: Unauthorized token.
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     *       501:
     *         description: Something went wrong.
     */
    async changePassword(req, res, next) {
        const validationSchema = {
            password: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { password, newPassword } = validatedBody;
            let userResult = await findUser({ _id: req.userId, status: status.ACTIVE });
            let responseMessage = await returnMessage(userResult.language ? userResult.language : "ENGLISH")
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (bcrypt.compareSync(validatedBody.password, userResult.password) == false) {
                throw apiError.forbidden(responseMessage.OLD_WRONG);
            }
            // if (validatedBody.newPassword != validatedBody.confirmPassword) {
            //     throw apiError.invalid('Password and confirm password does not match');
            // }
            var updateResult = await updateUserById({ _id: userResult._id }, { $set: { password: bcrypt.hashSync(newPassword) } })
            return res.json(new response(updateResult, responseMessage.PWD_CHANGED));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/deleteMyAccount:
     *   put:
     *     tags:
     *       - USER
     *     description: deleteMyAccount
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async deleteMyAccount(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: { $ne: userType.ADMIN }, status: status.ACTIVE })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let update = await updateUserById({ _id: user._id }, { status: status.DELETE })
            return res.json(new response(update, responseMessage.DELETE_SUCCESS))
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/listActivity:
     *   post:
     *     tags:
     *       - ACTIVITY MANAGEMENT
     *     description: listActivity
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
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
     *       - name: search
     *         description: search
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async listActivity(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body)
            let user = await findUser({ _id: req.userId, status: status.ACTIVE })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let activity = await listActivity(validatedBody)
            if (activity.docs.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(activity, responseMessage.ACTIVITY_FOUND))
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /user/listSubActivity:
     *   post:
     *     tags:
     *       - ACTIVITY MANAGEMENT
     *     description: listSubActivity
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: activityId
     *         description: activityId (id)
     *         in: formData
     *         required: true
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
     *       - name: search
     *         description: search
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async listSubActivity(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body)
            let user = await findUser({ _id: req.userId, status: status.ACTIVE })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let activity = await listSubActivity(validatedBody)
            if (activity.docs.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            return res.json(new response(activity, responseMessage.ACTIVITY_FOUND))
        } catch (error) {
            return next(error);
        }
    }

    /**
 * @swagger
 * /user/addPeriodsData:
 *   post:
 *     tags:
 *       - USER
 *     description: addPeriodsData
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: periodDate
 *         description:  periodDate in ISOString Ex:- 2022-10-27 00:00:00.000Z
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
    async addPeriodsData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await findPeriodData({ status: status.ACTIVE, userId: user._id })
            if (data) {
                req.body.userId = user._id;
                let periodsArray = [];
                for (let index = 0; index < 6; index++) {
                    let element = moment(req.body.periodDate).add(index, 'days').format("YYYY-MM-DD");
                    periodsArray.push(element)
                }
                req.body.periodsDate = periodsArray;
                req.body.periodEndDate = moment(req.body.periodDate).add(5, 'days').format("YYYY-MM-DD")
                let up = await updatePeriodData({ _id: data._id }, { $set: req.body })
                return res.json(new response(up, responseMessage.PERIOD_ADDED))
            }
            else {
                req.body.userId = user._id;
                let periodsArray = [];
                for (let index = 0; index < 6; index++) {
                    let element = moment(req.body.periodDate).add(index, 'days').format("YYYY-MM-DD");
                    periodsArray.push(element)
                }
                req.body.periodsDate = periodsArray;
                req.body.periodEndDate = moment(req.body.periodDate).add(5, 'days').format("YYYY-MM-DD")
                let up = await createPeriodData(req.body)
                return res.json(new response(up, responseMessage.PERIOD_ADDED))
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/getPeriodsData:
*   get:
*     tags:
*       - USER
*     description: getPeriodsData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async getPeriodsData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let periodData = await findPeriodData({ status: status.ACTIVE, userId: user._id })
            if (!periodData) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND)
            }
            let currentDate = new Date().toISOString()
            const date1 = new Date(currentDate)
            const data2 = new Date(periodData.periodDate)
            let days = Math.ceil((data2 - date1) / (1000 * 60 * 60 * 24))
            console.log(days);
            return res.json(new response({ nextPeriodDate: periodData.periodDate, periodsDate: periodData.periodsDate, periodEndDate: periodData.periodEndDate, remainingDays: days, _id: periodData._id }, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/addSymptoms:
*   post:
*     tags:
*       - USER
*     description: addSymptoms
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: symptomId
*         description: _id of symptoms in the list
*         in: query
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async addSymptoms(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await userSymptoms.findOne({ symptomId: req.query.symptomId, status: status.ACTIVE }).sort({ createdAt: -1 })
            if (data) {
                let checkDate = moment(data.createdAt).format(`DD-MM-YYYY`)
                console.log(checkDate, moment().format(`DD-MM-YYYY`));
                if (checkDate == moment().format(`DD-MM-YYYY`)) {
                    throw apiError.conflict(responseMessage.SYMPTOMS_ALREADY)
                }
            }
            let obj = {
                symptomId: req.query.symptomId,
                userId: user._id
            }
            let save = await userSymptoms.create(obj)
            return res.json(new response(save, "Symtopms added successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/listUserSymtoms:
*   get:
*     tags:
*       - USER
*     description: listUserSymtoms
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async listUserSymtoms(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await userSymptoms.find({ userId: user._id, status: status.ACTIVE }).sort({ createdAt: -1 }).populate({ path: 'symptomId', select: 'name image -_id' })
            let t_day = moment().format(`DD-MM-YYYY`)
            // let datax = moment(data[0].createdAt).format('DD-MM-YYYY')
            console.log("9898989898889", t_day);
            let result = []
            for (let i = 0; i < data.length; i++) {
                if (t_day == moment(data[i].createdAt).format('DD-MM-YYYY')) {
                    result.push(data[i])
                }
            }
            if (result.length === 0) {
                // throw apiError.notFound("No user symptoms found.")
                return res.json(new response(result, responseMessage.SYMPTOMS_NOT_FOUND))
            }
            return res.json(new response(result, responseMessage.SYMPTOMS_FOUND))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/addMoodData:
*   post:
*     tags:
*       - USER
*     description: addMoodData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: mood
*         description: mood
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Mood data successfully added.
*/
    async addMoodData(req, res, next) {
        const schema = {
            mood: Joi.string().allow('').required()
        }
        try {
            const validBody = await Joi.validate(req.body, schema)
            const { mood } = validBody;
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await moodData.findOne({ mood: mood, status: status.ACTIVE })
            let obj = {
                mood: mood,
                userId: user._id
            }
            let save = await moodData.create(obj)
            return res.json(new response(save, responseMessage.MOOD_SAVED))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/addSleepTrackingData:
*   post:
*     tags:
*       - USER
*     description: addSleepTrackingData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of user
*         in: header
*         required: true
*       - name: bedTime
*         description: bedTime example:- 09:00
*         in: formData
*         required: true
*       - name: wakeUpTime
*         description: wakeUpTime 15:00
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Sleep tracking data addded successfully.
*       409:
*         description: User not found.
*/
    async addSleepTrackingData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            req.body.userId = user._id
            let save = await sleepTrackerModel.create(req.body)
            return res.json(new response(save, responseMessage.SLEEP_SAVED))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/graphDataForSleep:
*   get:
*     tags:
*       - USER
*     description: graphDataForSleep
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: date
*         description: date.
*         in: query
*         required: false
*       - name: monthInc
*         description: monthInc.
*         in: query
*         required: false
*       - name: year
*         description: year.
*         in: query
*         required: true
*     responses:
*       200:
*         description: Data found successfully.
*       404:
*         description: Data not found || User not found
*       501:
*         description: Something went wrong!
*/
    async graphDataForSleep(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query = {
                status: status.ACTIVE, userId: user._id
            }
            query.createdAt = { $lte: new Date() }
            var date = 1, monthInc = 0, year = req.query.year, months, previousMonth, previousYear, monthfake = 0
            if (req.query.date) {
                date = req.query.date
            }
            if (req.query.monthInc) {
                monthInc = req.query.monthInc
                year = Number(req.query.year) + 1
            }
            let counter = 0
            let result = []

            let findResult = await sleepTrackerModel.find(query)
            let findTime = await sleepTrackerModel.findOne(query).sort({ createdAt: -1 })
            for (let month = 0; month < 12; month++) {
                months = month
                monthfake = month
                if (req.query.monthInc) {
                    months = Number(req.query.monthInc) + months
                    monthfake = Number(req.query.monthInc) + month
                }
                if (months >= 12) {
                    months = counter
                    counter++
                }
                if ((monthfake + 1) >= 13) {
                    req.query.year = year
                }
                previousMonth = months;
                previousYear = req.query.year;
                let userTotal = 0, green = 0, red = 0
                for (let j = 0; j < findResult.length; j++) {
                    if (
                        Number(months) >= Number(moment(findResult[j].createdAt).month())//createdAt
                        &&
                        Number(previousMonth) <= Number(moment(findResult[j].createdAt).month())
                        &&
                        Number(moment(findResult[j].createdAt).year()) <= Number(req.query.year)
                        &&
                        Number(moment(findResult[j].createdAt).year()) >= Number(previousYear)
                        &&
                        (Number(moment(findResult[j].createdAt).format('D')) <= Number(date)
                            ||
                            Number(moment(findResult[j].createdAt).format('D')) >= Number(date))
                    ) {
                        let dt1 = new Date(`October 13, 2014 ${findResult[j].wakeUpTime}:00`);
                        let dt2 = new Date(`October 13, 2014 ${findResult[j].bedTime}:00`);
                        if (new Date(`October 13, 2014 ${findResult[j].wakeUpTime}:00`) < new Date(`October 13, 2014 ${findResult[j].bedTime}:00`)) {
                            dt2 = new Date(`October 12, 2014 ${findResult[j].bedTime}:00`);
                        }
                        console.log("hjsdhjhjhjhfjhfjhjhjh", diff_hours(dt1, dt2));
                        if (diff_hours(dt1, dt2) < 8) {
                            red += 1
                        } else {
                            green += 1
                        }
                    }
                }
                let obj = {
                    month: moment(`${(monthfake + 1) >= 13 ? (monthfake - 12 + 1) : (months + 1)}-${date}-2021`).format('MMM'),
                    red: red,
                    green: green,
                    year: String(req.query.year)
                }
                result.push(obj)
            }
            return res.json(new response({ docs: result, data: findTime }, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/chatBot:
*   post:
*     tags:
*       - USER
*     description: chatBot
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: section
*         description: section.
*         in: formData
*         enum: ["MENTRUAL","MENTAL","PERSONAL_SAFETY","HOME"]
*         required: false
*       - name: message
*         description: message.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Data found successfully.
*       404:
*         description: Data not found || User not found
*       501:
*         description: Something went wrong!
*/
    async chatBot(req, res, next) {
        try {
            const { section, message } = req.body;
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage("ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            // let Activity = {
            //     userId: user._id,
            //     section: section
            // }
            // await chatActivity(Activity).save()
            let chatResponse = await chat.generateResponseAI(message)
            console.log({ userQuestion: req.body.message, chatResponse: chatResponse.answer });
            if (!chatResponse.answer) {
                return res.json(new response({ userQuestion: req.body.message, chatResponse: "Sorry, can't understand you", dateAndTime: moment(new Date()).format('YYYY-MM-DD:HH:mm') }, "Chat response is=>"))
            }
            return res.json(new response({ userQuestion: req.body.message, chatResponse: chatResponse.answer, dateAndTime: moment(new Date()).format('YYYY-MM-DD:HH:mm') }, "Chat response is=>"))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/deletePeriodsData:
*   post:
*     tags:
*       - USER
*     description: deletePeriodsData
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: _id
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async deletePeriodsData(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await findPeriodData({ _id: req.body._id, status: status.ACTIVE, userId: user._id })
            if (!data) {
                throw apiError.notFound(responseMessage.PERIOD_NOT_FOUND)
            }
            let up = await updatePeriodData({ _id: data._id }, { $set: { status: status.DELETE } })
            return res.json(new response(up, responseMessage.PERIOD_DEL))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
* @swagger
* /user/getUsername:
*   get:
*     tags:
*       - USER
*     description: getUsername
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Returns success message
*/
    async getUsername(req, res, next) {
        try {
            let usercount = await usersCount({ status: status.ACTIVE, userType: userType.USER })
            let data = `User00` + String(usercount + 1)
            return res.json(new response(data, "Username get successfully."))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/listNotification:
*   get:
*     tags:
*       - USER NOTIFICATION
*     description: listNotification
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
*         description: Returns success message
*/
    async listNotification(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                sort: { createdAt: -1 }
            }
            let data = await notification.paginate({ userId: user._id, status: status.ACTIVE }, options)
            if (data.docs.length === 0) {
                return res.json(new response(data, responseMessage.NOTIFIATION_NOT_FOUND))
            }
            return res.json(new response(data, responseMessage.NOTIFICATION_FOUND))
        } catch (error) {
            console.log(error);
            return next(error)
        }
    }

    /**
* @swagger
* /user/markAsRead:
*   put:
*     tags:
*       - USER NOTIFICATION
*     description: markAsRead
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: _id of notification
*         in: query
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async markAsRead(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let data = await notification.findOne({ _id: req.query._id, status: status.ACTIVE })
            if (!data) {
                throw apiError.notFound(responseMessage.NOTIFIATION_NOT_FOUND)
            }
            let up = await notification.findByIdAndUpdate({ _id: data._id }, { $set: { read: true } }, { new: true })
            return res.json(new response(up, responseMessage.MARK_AS_READ))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/clearAllNotification:
*   put:
*     tags:
*       - USER NOTIFICATION
*     description: clearAllNotification
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*       - name: _id
*         description: _id of notification
*         in: query
*         required: false
*       - name: type
*         description: type ALL select when clear all notification
*         in: query
*         required: false
*     responses:
*       200:
*         description: Returns success message
*/
    async clearAllNotification(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            let responseMessage = await returnMessage(user.language ? user.language : "ENGLISH")
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            if (req.query.type === "ALL" && req.query._id === '') {
                let up = await notification.updateMany({ userId: user._id }, { status: status.DELETE }, { multi: true })
                return res.json(new response(up, responseMessage.ALL_NOTI_CLEAR))
            } else {
                let data = await notification.findOne({ _id: req.query._id, status: status.ACTIVE })
                if (!data) {
                    throw apiError.notFound(responseMessage.NOTIFIATION_NOT_FOUND)
                }
                let up = await notification.findByIdAndUpdate({ _id: data._id }, { status: status.DELETE }, { new: true })
                return res.json(new response(up, responseMessage.ALL_NOTI_CLEAR))

            }
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /user/logOut:
*   get:
*     tags:
*       - USER NOTIFICATION
*     description: logOut
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token
*         in: header
*         required: true
*     responses:
*       200:
*         description: Returns success message
*/
    async logOut(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.USER })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let up = await updateUser({ _id: user._id }, { $set: { deviceType: null, deviceToken: null } })
            return res.json(new response(up, "Logout successfull."))
        } catch (error) {
            return next(error)
        }
    }
}
export default new userController()


function diff_hours(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

}

function returnMessage(language) {
    let message;
    if (language == "ENGLISH") {
        message = require('../../../../../assets/englishMessages');
    }
    if (language == "HINDI") {
        message = require('../../../../../assets/hindiMessages')
    }
    if (language == "BENGALI") {
        message = require('../../../../../assets/bengaliMessages')
    }
    if (language == "MARATHI") {
        message = require('../../../../../assets/marathiMessages')
    }
    if (language == "MALAYALAM") {
        message = require('../../../../../assets/malayalamMessages')
    }
    return message;
}