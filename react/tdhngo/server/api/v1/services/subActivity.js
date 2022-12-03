import subActivityModel from "../../../models/subActivity";
import status from "../../../enums/status";
import Type from "../../../enums/userType";
const subActivityServices = {

    createSubActivity: async (insertObj) => {
        return await subActivityModel.create(insertObj);
    },

    findSubActivity: async (query) => {
        return await subActivityModel.findOne(query)
    },

    updateSubActivity: async (query, updateObj) => {
        return await subActivityModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateSubActivityById: async (query, updateObj) => {
        return await subActivityModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listSubActivity: async (validatedBody, userType) => {
        let query;
        if (userType === Type.ADMIN) {
            query = { status: { $ne: status.DELETE } };
        }
        else {
            query = { status: status.ACTIVE };
        }
        const { search, page, limit, fromDate, toDate, activityId } = validatedBody;
        if (search && search != "") {
            query.content = { $regex: search, $options: 'i' }
        }
        if (activityId) {
            query.activityId = activityId
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
        return await subActivityModel.paginate(query, options);
    },

}

module.exports = { subActivityServices };
