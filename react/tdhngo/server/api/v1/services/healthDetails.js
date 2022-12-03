import healthDetailsModel from "../../../models/healthDetails";
import status from "../../../enums/status";
const healthDetailsServices = {

    createHealthDetails: async (insertObj) => {
        return await healthDetailsModel.create(insertObj);
    },

    findHealthDetails: async (query) => {
        return await healthDetailsModel.findOne(query).populate('userId');
    },

    updateHealthDetails: async (query, updateObj) => {
        return await healthDetailsModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    listHealthDetails: async (query) => {
        return await healthDetailsModel.find(query).populate('userId');
    },

    healthDetailsWithPaginate: async (validatedBody, _id) => {
        let query = { status: { $ne: status.DELETE}, userId: validatedBody.userId };
        const { page, limit, fromDate, toDate } = validatedBody;
        if (fromDate && !toDate) {
            query.createdAt = { $gte: fromDate };
        }
        if (!fromDate && toDate) {
            query.createdAt = { $lte: toDate };
        }
        if (fromDate && toDate) {
            query.$and = [
                { createdAt: { $gte: fromDate } },
                { createdAt: { $lte: toDate } },
            ]
        }
        let options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: { createdAt: -1 },
            populate: ('userId')
        };
        return await healthDetailsModel.paginate(query, options);
    },


}

module.exports = { healthDetailsServices };
