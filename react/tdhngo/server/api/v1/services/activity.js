import activityModel from "../../../models/activity";
import status from "../../../enums/status";
const activityServices = {

    createActivity: async (insertObj) => {
        return await activityModel.create(insertObj);
    },

    findActivity: async (query) => {
        return await activityModel.findOne(query).populate('categoryId');
    },

    updateActivity: async (query, updateObj) => {
        return await activityModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateActivityById: async (query, updateObj) => {
        return await activityModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listActivity: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, page, limit, fromDate, toDate} = validatedBody;
        if (search&&search!="") {
            query.title= { $regex: search, $options: 'i' } 
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
            limit: parseInt(limit) || 15,
            sort: { createdAt: -1 }        
        };
        return await activityModel.paginate(query, options);
    },

}

module.exports = { activityServices };
