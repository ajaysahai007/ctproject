import activityFaqModel from "../../../models/activityFaq";
import status from "../../../enums/status";
const activityFaqServices = {

    createActivityFaq: async (insertObj) => {
        return await activityFaqModel.create(insertObj);
    },

    findActivityFaq: async (query) => {
        return await activityFaqModel.findOne(query);
    },

    updateActivityFaq: async (query, updateObj) => {
        return await activityFaqModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateActivityFaqById: async (query, updateObj) => {
        return await activityFaqModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listActivityFaqs: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, page, limit, fromDate, toDate,activityId} = validatedBody;
        if (search&&search!="") {
            query.question = { $regex: search, $options: 'i' }
        }
        if (fromDate && !toDate) {
            query.createdAt = { $gte: fromDate };
        }
        if (!fromDate && toDate) {
            query.createdAt = { $lte: toDate };
        }
        if (fromDate && toDate) {
            query.$and = [
                { createdAt: { $gte: new Date(new Date(fromDate).setHours(0, 0)).toISOString() } },
                { createdAt: { $lte: new Date(new Date(toDate).setHours(23, 59)).toISOString() } },
            ]
        }
        let options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 15,
            sort: { createdAt: -1 }        
        };
        return await activityFaqModel.paginate(query, options);
    },

}

module.exports = { activityFaqServices };
