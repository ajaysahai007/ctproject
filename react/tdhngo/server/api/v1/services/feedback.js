import feedbackModel from "../../../models/feedback";
import status from "../../../enums/status";

const feedbackServices = {

    createFeedback: async (insertObj) => {
        return await feedbackModel.create(insertObj);
    },

    findFeedback: async (query) => {
        return await feedbackModel.findOne(query).populate('userId');
    },
    countFeedback: async (query) => {
        return await feedbackModel.count(query);
    },

    updateFeedback: async (query, updateObj) => {
        return await feedbackModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    feedbackList: async (query) => {
        return await feedbackModel.find(query);
    },
    listFeedback: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, page, limit, fromDate, toDate } = validatedBody;
        if (search) {
            query.$or = [
                { rating: { $regex: search, $options: 'i' } },
                { feedbackId: { $regex: search, $options: 'i' } },
                { userName: { $regex: search, $options: 'i' } },
            ]
        }
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
        return await feedbackModel.paginate(query, options);
    },

    feedbackCount: async (query) => {
        return await feedbackModel.count(query)
    }

}

module.exports = { feedbackServices };