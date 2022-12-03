import Joi from "joi";
import _ from "lodash";
import config from "config";
import apiError from '../../../../helper/apiError';
import userType from '../../../../enums/userType';
import response from '../../../../../assets/response';
import responseMessage from '../../../../../assets/responseMessage';
import { staticServices } from '../../services/static';
import { bannerServices } from '../../services/banner'
import { userServices } from '../../services/user';
import { faqServices } from '../../services/faq';
const { createFaq, findFaq, updateFaq, faqList } = faqServices
const { findUser } = userServices;
const { createBanner, findBanner, updateBanner, bannerList ,paginateBannerList} = bannerServices
const { createStaticContent, findStaticContent, updateStaticContent, staticContentList } = staticServices;
import commonFunction from '../../../../helper/util';
import status from '../../../../enums/status';


export class staticController {

    /**
     * @swagger
     * /static/staticContent:
     *   post:
     *     tags:
     *       - STATIC
     *     description: addStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: addStaticContent
     *         description: addStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/addStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addStaticContent(req, res, next) {
        const validationSchema = {
            type: Joi.string().valid('termsConditions', 'privacyPolicy', 'aboutUs', 'contactUs').required(),
            title: Joi.string().required(),
            description: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            const { type, title, description } = validatedBody;
            var result = await createStaticContent({ type: type, title: title, description: description })
            return res.json(new response(result, responseMessage.CMS_SAVED));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContent:
     *   get:
     *     tags:
     *       - STATIC
     *     description: viewStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: type
     *         description: type
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewStaticContent(req, res, next) {
        const validationSchema = {
            type: Joi.string().valid('termsConditions', 'privacyPolicy', 'aboutUs', 'contactUs').required(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var result = await findStaticContent({ type: validatedBody.type })
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContent:
     *   put:
     *     tags:
     *       - STATIC
     *     description: editStaticContent
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: editStaticContent
     *         description: editStaticContent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/editStaticContent'
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async editStaticContent(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            title: Joi.string().optional(),
            description: Joi.string().optional()
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var result = await updateStaticContent({ _id: validatedBody._id }, validatedBody)
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/staticContentList:
     *   get:
     *     tags:
     *       - STATIC
     *     description: staticContentList
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async staticContentList(req, res, next) {
        try {
            var result = await staticContentList()
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/addBanner:
     *   post:
     *     tags:
     *       - BANNER
     *     description: addBanner
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
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
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async addBanner(req, res, next) {
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            if (req.files.length != 0) {
                let imageRes = await commonFunction.getImageUrl(req.files);
                validatedBody.image = imageRes
            }
            var result = await createBanner(validatedBody)
            return res.json(new response(result, responseMessage.ADD_BANNER));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/listBanner:
     *   get:
     *     tags:
     *       - BANNER
     *     description: listBanner
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async listBanner(req, res, next) {
        try {
            let findRes = await bannerList({ status: status.ACTIVE })
            if (findRes.length == 0) {
                throw apiError.notFound("Banner not available.");
            }
            return res.json(new response(findRes, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

        /**
     * @swagger
     * /static/listAdminBanner:
     *   post:
     *     tags:
     *       - BANNER
     *     description: listAdminBanner
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
         async listAdminBanner(req, res, next) {
            try {
                let findRes = await paginateBannerList(req.body)
                if (findRes.length == 0) {
                    throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
                }
                return res.json(new response(findRes, responseMessage.DATA_FOUND));
            } catch (error) {
                return next(error);
            }
        }

    /**
     * @swagger
     * /static/viewBanner:
     *   get:
     *     tags:
     *       - BANNER
     *     description: viewBanner
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: bannerId
     *         description: bannerId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewBanner(req, res, next) {
        const validationSchema = {
            bannerId: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            let findRes = await findBanner({ _id: validatedBody.bannerId, status: { $ne: status.DELETE } })
            if (!findRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(findRes, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/deleteBanner:
     *   delete:
     *     tags:
     *       - BANNER
     *     description: deleteBanner
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: bannerId
     *         description: bannerId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async deleteBanner(req, res, next) {
        const validationSchema = {
            bannerId: Joi.string().required()
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let findRes = await findBanner({ _id: validatedBody.bannerId, status: { $ne: status.DELETE } })
            if (!findRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            let updateRes = await updateBanner({ _id: findRes._id }, { status: status.DELETE })
            return res.json(new response(updateRes, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

        /**
     * @swagger
     * /static/blockunblockBanner:
     *   put:
     *     tags:
     *       - BANNER
     *     description: blockunblockBanner
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: bannerId
     *         description: bannerId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
         async blockunblockBanner(req, res, next) {
            const validationSchema = {
                bannerId: Joi.string().required()
            };
            try {
                const validatedBody = await Joi.validate(req.query, validationSchema);
                var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
                if (!adminResult) {
                    throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
                }
                let findRes = await findBanner({ _id: validatedBody.bannerId, status: { $ne: status.DELETE } })
                console.log(findRes);
                if (findRes.status === status.ACTIVE) {
                    let updateRes = await updateBanner({ _id: findRes._id }, { status: status.BLOCK })
                    return res.json(new response(updateRes, "Banner blocked successfully."));
                }
                let updateRes = await updateBanner({ _id: findRes._id }, { status: status.ACTIVE })
                return res.json(new response(updateRes, "Banner unblocked successfully."));
            } catch (error) {
                return next(error);
            }
        }

    /**
     * @swagger
     * /static/editBanner:
     *   put:
     *     tags:
     *       - BANNER
     *     description: editBanner
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         description: token
     *         in: header
     *         required: true
     *       - name: bannerId
     *         description: bannerId
     *         in: formData
     *         required: true
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
    async editBanner(req, res, next) {
        // const validationSchema = {
        //     bannerId: Joi.string().required(),
        //     title: Joi.string().allow('').optional(),
        //     description: Joi.string().allow('').optional()
        // };
        try {
            const validatedBody = await Joi.validate(req.body);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            let findRes = await findBanner({ _id: validatedBody.bannerId, status: { $ne: status.DELETE } })
            if (!findRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            if (req.files.length != 0) {
                let imageRes = await commonFunction.getImageUrl(req.files);
                validatedBody.image = imageRes
            }
            var result = await updateBanner({ _id: findRes._id }, validatedBody)
            return res.json(new response(result, responseMessage.EDIT_BANNER));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/addFaq:
     *   post:
     *     tags:
     *       - FAQ
     *     description: addFaq
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
    async addFaq(req, res, next) {
        const validationSchema = {
            question: Joi.string().required(),
            answer: Joi.string().allow().optional(),
        };
        try {
            const validatedBody = await Joi.validate(req.body, validationSchema);
            var adminResult = await findUser({ _id: req.userId, userType: userType.ADMIN });
            if (!adminResult) {
                throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
            }
            var result = await createFaq(validatedBody)
            return res.json(new response(result, responseMessage.FAQ_ADDED));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/viewFAQ:
     *   get:
     *     tags:
     *       - FAQ
     *     description: viewFAQ
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: faqId
     *         description: faqId
     *         in: query
     *         required: true
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async viewFAQ(req, res, next) {
        const validationSchema = {
            faqId: Joi.string().required(),
        };
        try {
            const validatedBody = await Joi.validate(req.query, validationSchema);
            var result = await findFaq({ _id: validatedBody.faqId, status: { $ne: status.DELETE } })
            if(!result){
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @swagger
     * /static/listFAQ:
     *   get:
     *     tags:
     *       - FAQ
     *     description: listFAQ
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Returns success message
     */
     async listFAQ(req, res, next) {
        try {
            var result = await faqList({ status: { $ne: status.DELETE } })
            if(result.length==0){
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            return next(error);
        }
    }

}

export default new staticController()
