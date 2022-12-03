import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import response from '../../../../../assets/response';
import bcrypt from 'bcryptjs';
import userModel from "../../../../models/user";
import { userServices } from '../../services/user';
import { feedbackServices } from '../../services/feedback';
const { createFeedback, findFeedback, updateFeedback, feedbackList, countFeedback, listFeedback, feedbackCount } = feedbackServices;
const { findUser, updateUser, checkEmailMobileNumber, getAllUser, usersCount, findAllUsers } = userServices;


import responseMessage from '../../../../../assets/responseMessage';

import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';
import userType from "../../../../enums/userType";
import moment from "moment";
import chat from '../../../../../chatbotService';
import moodData from '../../../../models/mood';
import userSymptoms from '../../../../models/userSymptoms';
import tracker from '../../../../models/sleepTracker';
import { periodTrackerServices } from '../../services/periodTracker';
const { periodTrackerCount } = periodTrackerServices;
import { menstrualHygieneServices } from '../../services/menstrualHygiene';
const { menstrualHygieneCount } = menstrualHygieneServices;
import Tracking from '../../../../models/sleepTracking';
import Training from '../../../../models/sleepTraining';
import mentalData from '../../../../models/metalHealthAndWellBeing';
import personalSafety from '../../../../models/personalSafety';
import notification from '../../../../models/notification';
import { sendNotification } from '../../../../helper/pushNotification';
import category from '../../../../models/category';

export class adminController {

    /**
     * @swagger
     * /admin/login:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: login
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: login
     *         description: login
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/login'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async login(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
            password: Joi.string().required(),
            deviceType: Joi.string().optional(),
            deviceToken: Joi.string().optional()
        };
        try {
            const { email, password } = await Joi.validate(req.body, validationSchema);
            let query = { $and: [{ userType: { $in: [userType.ADMIN] } }, { $or: [{ email: email }, { mobileNumber: email }] }] }
            var userResult = await findUser(query);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }

            if (!bcrypt.compareSync(password, userResult.password)) {
                throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
            }
            let token = await commonFunction.getToken({ _id: userResult._id, email: userResult.email, userType: userResult.userType });
            let obj = {
                _id: userResult._id,
                name: userResult.name,
                token: token,
                userType: userResult.userType,
                status: userResult.status
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
     * /admin/forgotPassword:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: forgotPassword
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: forgotPassword
     *         description: forgotPassword
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/forgotPassword'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async forgotPassword(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
        };
        try {
            const { email } = await Joi.validate(req.body, validationSchema);
            let query = { $and: [{ userType: { $in: [userType.ADMIN] } }, { $or: [{ email: email }, { mobileNumber: email }] }] }
            var userResult = await findUser(query);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let otp = commonFunction.getOTP()
            commonFunction.sendMailWithTemplate(userResult.email, otp)
            let update = await updateUser({ _id: userResult._id }, { otp: otp, otpTime: new Date().getTime() });
            // let obj = {
            //     _id: update._id,
            //     email: update.email || update.mobileNumber,
            //     name: update.name
            // }
            return res.json(new response(update, responseMessage.OTP_SEND));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/resendOTP:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: resendOTP
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: forgotPassword
     *         description: forgotPassword
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/forgotPassword'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async resendOTP(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
        };
        try {
            const { email } = await Joi.validate(req.body, validationSchema);
            let query = { $and: [{ userType: { $in: [userType.ADMIN] } }, { $or: [{ email: email }, { mobileNumber: email }] }] }
            var userResult = await findUser(query);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let otp = commonFunction.getOTP()
            commonFunction.sendMailWithTemplate(userResult.email, otp)
            let update = await updateUser({ _id: userResult._id }, { otp: otp, otpTime: new Date().getTime() });
            // let obj = {
            //     _id: update._id,
            //     email: update.email || update.mobileNumber,
            //     name: update.name
            // }
            return res.json(new response(update, responseMessage.OTP_SEND));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/verifyOTP:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: verifyOTP
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: verifyOtp
     *         description: verifyOtp
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/verifyOtp'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async verifyOTP(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
            otp: Joi.string().required(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            let query = { $and: [{ userType: { $in: [userType.ADMIN] } }, { $or: [{ email: validatedBody.email }, { mobileNumber: validatedBody.email }] }] }
            var userResult = await findUser(query);
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let diff = new Date().getTime() - userResult.otpTime
            if (diff >= 5 * 60 * 1000) {
                throw apiError.badRequest(responseMessage.OTP_EXPIRED);
            }
            if (userResult.otp != validatedBody.otp) {
                throw apiError.badRequest(responseMessage.INCORRECT_OTP);
            }
            var updateResult = await updateUser({ _id: userResult._id }, { otpVerification: true })
            var token = await commonFunction.getToken({ _id: updateResult._id, email: updateResult.email, mobileNumber: updateResult.mobileNumber, userType: updateResult.userType });
            var obj = {
                _id: updateResult._id,
                name: updateResult.name,
                email: updateResult.email,
                token: token
            }
            return res.json(new response(obj, responseMessage.OTP_VERIFY));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/getProfile:
     *   get:
     *     tags:
     *       - ADMIN
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
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            return res.json(new response(userResult, responseMessage.USER_DETAILS));
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/resetPassword:
     *   put:
     *     tags:
     *       - ADMIN
     *     description: resetPassword
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
     *       - name: confirmPassword
     *         description: confirmPassword
     *         in: formData
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async resetPassword(req, res, next) {
        const validationSchema = {
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        };
        try {
            const { password, confirmPassword } = await Joi.validate(req.body, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (password === confirmPassword) {
                let update = await updateUser({ _id: userResult._id }, { password: bcrypt.hashSync(password) });
                return res.json(new response(update, responseMessage.PWD_CHANGED));
            }
            throw apiError.notFound(responseMessage.PWD_CPWD_NOT_MATCH);
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/updateProfile:
     *   put:
     *     tags:
     *       - ADMIN
     *     description: updateProfile
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
     *         required: false
     *       - name: email
     *         description: email
     *         in: formData
     *         required: false
     *       - name: mobileNumber
     *         description: mobileNumber
     *         in: formData
     *         required: false
     *       - name: profilePic
     *         description: profilePic
     *         in: formData
     *         type: file
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async updateProfile(req, res, next) {
        const validationSchema = {
            name: Joi.string().allow('').optional(),
            email: Joi.string().allow('').optional(),
            mobileNumber: Joi.string().allow('').optional(),
            profilePic: Joi.string().allow('').optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            let checkEmailMobile = await checkEmailMobileNumber(validatedBody.email, validatedBody.mobileNumber, userResult._id)
            if (checkEmailMobile) {
                if (checkEmailMobile.email == validatedBody.email) {
                    throw apiError.conflict(responseMessage.EMAIL_EXIST)
                } else {
                    throw apiError.conflict(responseMessage.MOBILE_EXIST)
                }
            }
            if (req.files.length !== 0) {
                console.log(req.files);
                validatedBody.profilePic = await commonFunction.getImageUrl(req.files)
            }
            let updateRes = await updateUser({ _id: userResult._id }, { $set: validatedBody })
            return res.json(new response(updateRes, responseMessage.PROFILE_UPDATED))
        }
        catch (error) {
            console.log("===error====", error)
            return next(error);
        }
    }

    /**
     * @swagger
     * /admin/listUsers:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: listUsers
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
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
     *       - name: userStatus
     *         description: status ("ACTIVE","BLOCK")
     *         enum: ["ACTIVE","BLOCK"]
     *         in: formData
     *         required: false
     *       - name: states
     *         description: state
     *         in: formData
     *         required: false
     *       - name: districs
     *         description: distric
     *         in: formData
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async listUsers(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.string().optional(),
            limit: Joi.string().optional(),
            userStatus: Joi.string().optional(),
            states: Joi.string().optional(),
            districs: Joi.string().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let data = await getAllUser(validatedBody)
            if (data.docs.length == 0) {
                return res.json(new response(data, responseMessage.USER_NOT_FOUND))
            }
            return res.json(new response(data, responseMessage.USER_DETAILS))
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/viewUsers:
     *   get:
     *     tags:
     *       - ADMIN
     *     description: viewUsers
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: userId
     *         description: userId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewUsers(req, res, next) {
        const validationSchema = {
            userId: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let data = await findUser({ _id: validatedBody.userId, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            return res.json(new response(data, responseMessage.USER_DETAILS))
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/blockUnblockUsers:
     *   put:
     *     tags:
     *       - ADMIN
     *     description: blockUnblockUsers
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: userId
     *         description: userId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async blockUnblockUsers(req, res, next) {
        const validationSchema = {
            userId: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, status: { $ne: status.DELETE } });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let data = await findUser({ _id: validatedBody.userId, userType: { $ne: userType.ADMIN }, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            if (data.status == status.ACTIVE) {
                let updateRes = await updateUser({ _id: data._id }, { status: status.BLOCK, deviceType: null, deviceToken: null })
                return res.json(new response(updateRes, responseMessage.BLOCK_BY_ADMIN))
            }
            let updateRes = await updateUser({ _id: data._id }, { status: status.ACTIVE })
            return res.json(new response(updateRes, responseMessage.USER_DETAILS))
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/feedbackList:
     *   post:
     *     tags:
     *       - ADMIN
     *     description: feedbackList
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
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
    async feedbackList(req, res, next) {
        const validationSchema = {
            search: Joi.string().optional(),
            fromDate: Joi.string().optional(),
            toDate: Joi.string().optional(),
            page: Joi.string().optional(),
            limit: Joi.string().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let data = await listFeedback(validatedBody)
            if (data.docs.length == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/feedbackView:
     *   get:
     *     tags:
     *       - ADMIN
     *     description: feedbackView
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: feedbackId
     *         description: feedbackId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async feedbackView(req, res, next) {
        const validationSchema = {
            feedbackId: Joi.string().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let data = await findFeedback({ _id: validatedBody.feedbackId, status: { $ne: status.DELETE } })
            if (!data) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(data, responseMessage.DATA_FOUND))
        } catch (error) {
            return next(error)
        }
    }

    /**
     * @swagger
     * /admin/adminDashboard:
     *   get:
     *     tags:
     *       - DASHBOARD
     *     description: adminDashboard
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token of admin
     *         in: header
     *         required: true
     *     responses:
     *       200:
     *         description: Dashboard data get successfully.
     */
     async adminDashboard(req, res, next) {
        try {
            var userResult = await findUser({ _id: req.userId, userType: userType.ADMIN, });
            if (!userResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let [totalUsers, activeUsers, inactiveUsers, totalFeedback, periodtrackerCount, menstrualCount, sleepTracking, sleepTraining, mental, safety ,totalNotification] = await Promise.all([usersCount({ status: {$ne:status.DELETE},userType: { $ne: userType.ADMIN } }), usersCount({ status: status.ACTIVE, userType: { $ne: userType.ADMIN } }), usersCount({ userType: { $ne: userType.ADMIN }, status: status.BLOCK }), feedbackCount({ status: status.ACTIVE }), periodTrackerCount({ status: { $ne: status.DELETE } }), menstrualHygieneCount({ status: { $ne: status.DELETE } }), Tracking.count({ status: { $ne: status.DELETE } }), Training.count({ status: { $ne: status.DELETE } }), mentalData.count({ status: { $ne: status.DELETE } }), personalSafety.count({ status: { $ne: status.DELETE } }),category.count({status:status.ACTIVE})])
            let totalArticles = periodtrackerCount + menstrualCount + sleepTracking + sleepTraining + mental + safety
            let obj = {
                totalUsers: totalUsers,
                activeUsers: activeUsers,
                inactiveUsers: inactiveUsers,
                totalFeedback: totalFeedback,
                totalArticles: totalArticles,
                totalNotification:totalNotification
            }
            return res.json(new response(obj, "Dashboard data get successfully."))
        } catch (error) {
            return next(error)
        }
    }


    /**
* @swagger
* /admin/registeredUserGraph:
*   get:
*     tags:
*       - DASHBOARD
*     description: registeredUserGraph
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
    async registeredUserGraph(req, res, next) {
        try {
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND)
            }
            let query = {
                status: { $ne: status.DELETE },
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

            let findResult = await findAllUsers(query)
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
                console.log("previousYear", previousYear)
                let userTotal = 0;
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
                        userTotal = userTotal + j

                    }
                }
                let obj = {
                    month: moment(`${(monthfake + 1) >= 13 ? (monthfake - 12 + 1) : (months + 1)}-${date}-2021`).format('MMM'),
                    totalRegisteredUser: {
                        userTotal
                    },
                    year: String(req.query.year)
                }
                result.push(obj)
            }
            return res.json(new response({ docs: result }, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error)
        }
    }

    async getMessageFromChatBot(req, res, next) {
        try {
            let message = await chat.generateResponseAI(req.body.question)
            return res.json(new response(message.answer, "Answer is==-=--=="))
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /admin/listReport:
*   post:
*     tags:
*       - REPORTS
*     description: listReport
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: type
*         description: type.
*         enum: ["MOOD","PERIOD_TRACKER","SLEEP_TRACKING","CHAT"]
*         in: formData
*         required: true
*       - name: district
*         description: district.
*         in: formData
*         required: false
*       - name: page
*         description: page.
*         in: formData
*         required: false
*       - name: limit
*         description: limit.
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Reports found successfully.
*       404:
*         description: Reports data not found || Admin not found
*       501:
*         description: Something went wrong!
*/
    async listReport(req, res, next) {
        try {
            const validatedBody = req.body;
            let user = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!user) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            if (validatedBody.type === "MOOD") {
                let data = []
                const { fromDate, toDate, page, limit, district, state } = validatedBody;
                data.push(
                    {
                        $lookup: {
                            from: 'user',
                            let: {
                                userId: "$userId"
                            },
                            as: 'userId',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$userId", "$_id"] },
                                        "status": status.ACTIVE,
                                    }
                                }
                            ],
                        }
                    },
                    {
                        $unwind: {
                            path: "$userId",
                            preserveNullAndEmptyArrays: true
                        }

                    },
                    { $sort: { createdAt: -1 } }
                )

                if (district) {
                    data.push({ $match: { "userId.district": district } })
                }
                if (state) {
                    data.push({ $match: { "userId.state": state } })
                }

                if (fromDate && !toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$gte": ["$createdAt", new Date(fromDate)] }
                        }
                    })
                }
                if (!fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$lte": ["$createdAt", new Date(toDate)] }
                        }
                    })
                }
                if (fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$and": [{ "$lte": ["$createdAt", new Date(toDate)] }, { "$gte": ["$createdAt", new Date(fromDate)] }] }
                        }
                    })
                }
                let aggregate = moodData.aggregate(data)
                let options = {
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 10
                }
                let finalData = await moodData.aggregatePaginate(aggregate, options)
                if (finalData.docs.length === 0) {
                    return res.json(new response(finalData, 'Reports data not found.'))
                }
                return res.json(new response(finalData, 'Reports found successfully.'))
            }
            else if (validatedBody.type === "PERIOD_TRACKER") {
                let data = []
                const { fromDate, toDate, page, limit, district, state } = validatedBody;
                data.push(
                    {
                        $lookup: {
                            from: 'user',
                            let: {
                                userId: "$userId"
                            },
                            as: 'userId',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$userId", "$_id"] },
                                        "status": status.ACTIVE,
                                    }
                                }
                            ],
                        }
                    },
                    {
                        $unwind: {
                            path: "$userId",
                            preserveNullAndEmptyArrays: true
                        }

                    },
                    {
                        $lookup: {
                            from: 'symptoms',
                            let: {
                                symptomId: "$symptomId"
                            },
                            as: 'symptomId',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$symptomId", "$_id"] },
                                        "status": status.ACTIVE,
                                    }
                                }
                            ],
                        }
                    },
                    {
                        $unwind: {
                            path: "$symptomId",
                            preserveNullAndEmptyArrays: true
                        }

                    },
                    {
                        $lookup: {
                            from: 'userPeriodData',
                            let: {
                                userId: "$userId._id"
                            },
                            as: 'periodDetails',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$userId", "$userId"] }
                                        ,
                                        "status": status.ACTIVE,
                                    }
                                }
                            ],
                        }
                    },
                    { $sort: { createdAt: -1 } }
                )

                if (district) {
                    data.push({ $match: { "userId.district": district } })
                }
                if (state) {
                    data.push({ $match: { "userId.state": state } })
                }

                if (fromDate && !toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$gte": ["$createdAt", new Date(fromDate)] }
                        }
                    })
                }
                if (!fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$lte": ["$createdAt", new Date(toDate)] }
                        }
                    })
                }
                if (fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$and": [{ "$lte": ["$createdAt", new Date(toDate)] }, { "$gte": ["$createdAt", new Date(fromDate)] }] }
                        }
                    })
                }
                let aggregate = userSymptoms.aggregate(data)
                let options = {
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 10
                }
                let finalData = await userSymptoms.aggregatePaginate(aggregate, options)
                if (finalData.docs.length === 0) {
                    return res.json(new response(finalData, 'Reports data not found.'))
                }
                return res.json(new response(finalData, 'Reports found successfully.'))
            }
            else if (validatedBody.type === "SLEEP_TRACKING") {
                let data = []
                const { fromDate, toDate, page, limit, district, state } = validatedBody;
                data.push(
                    {
                        $lookup: {
                            from: 'user',
                            let: {
                                userId: "$userId"
                            },
                            as: 'userId',
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$userId", "$_id"] },
                                        "status": status.ACTIVE,
                                    }
                                }
                            ],
                        }
                    },
                    {
                        $unwind: {
                            path: "$userId",
                            preserveNullAndEmptyArrays: true
                        }

                    },
                    { $sort: { createdAt: -1 } }
                )

                if (district) {
                    data.push({ $match: { "userId.district": district } })
                }
                if (state) {
                    data.push({ $match: { "userId.state": state } })
                }

                if (fromDate && !toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$gte": ["$createdAt", new Date(fromDate)] }
                        }
                    })
                }
                if (!fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$lte": ["$createdAt", new Date(toDate)] }
                        }
                    })
                }
                if (fromDate && toDate) {
                    searchData.push({
                        "$match": {
                            "$expr": { "$and": [{ "$lte": ["$createdAt", new Date(toDate)] }, { "$gte": ["$createdAt", new Date(fromDate)] }] }
                        }
                    })
                }
                let aggregate = tracker.aggregate(data)
                let options = {
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 10
                }
                let finalData = await tracker.aggregatePaginate(aggregate, options)
                if (finalData.docs.length === 0) {
                    return res.json(new response(finalData, 'Reports data not found.'))
                }
                return res.json(new response(finalData, 'Reports found successfully.'))
            }
            else if (validatedBody.type === "CHAT") {
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
* @swagger
* /admin/addPushNotificationToUser:
*   post:
*     tags:
*       - NOTIFICATIONS
*     description: addPushNotificationToUser
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token of admin
*         in: header
*         required: true
*       - name: subject
*         description: subject.
*         in: formData
*         required: true
*       - name: message
*         description: message.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Reports found successfully.
*       404:
*         description: Reports data not found || Admin not found
*       501:
*         description: Something went wrong!
*/
    async addPushNotificationToUser(req, res, next) {
        const schema = {
            subject: Joi.string().allow('').required(),
            message: Joi.string().allow('').required()
        }
        try {
            const validBody = await Joi.validate(req.body, schema)
            const { subject, message } = validBody
            let admin = await findUser({ _id: req.userId, userType: userType.ADMIN })
            if (!admin) {
                throw apiError.notFound(responseMessage.ADMIN_NOT_FOUND)
            }
            let allUser = await findAllUsers({ status: status.ACTIVE, userType: userType.USER })
            let device_tokens = []
            allUser.forEach(t => {
                if (t.deviceToken) {
                    return device_tokens.push(t.deviceToken)
                }
            });
            if (device_tokens.length === 0) {
                throw apiError.notFound("There is no user to send notification.")
            }
            const sendNotifyPayload = {
                notification: {
                    title: subject,
                    body: message
                }
            }
            await sendNotification(device_tokens, sendNotifyPayload);
            userEntry(allUser, subject, message)
            return res.json(new response(sendNotifyPayload, responseMessage.NOTIFICATION_SENT))
        } catch (error) {
            return next(error)
        }
    }


}

export default new adminController()


async function userEntry(users, title, message) {
    console.log("Hi from functions.", users);
    let userAll = []
    for (const user of users) {
        let obj = {
            userId: user._id,
            title: title,
            message: message
        }
        userAll.push(notification.create(obj))
    }
    await Promise.all(userAll)
    console.log("Users entry done===>>");
}

