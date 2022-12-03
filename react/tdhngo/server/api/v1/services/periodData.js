import periodData from "../../../models/periodData";
import status from "../../../enums/status";
import userType from "../../../enums/userType";
const periodDataServices = {

    createPeriodData: async (insertObj) => {
        return await periodData.create(insertObj);
    },

    findPeriodData: async (query) => {
        return await periodData.findOne(query);
    },

    updatePeriodData: async (query, updateObj) => {
        return await periodData.findOneAndUpdate(query, updateObj, { new: true });
    },

    updatePeriodDataById: async (query, updateObj) => {
        return await periodData.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listPeriodData: async (validatedBody, type) => {
        let query;
        if (type === userType.ADMIN) {
            query = { status: { $ne: status.DELETE } };
        }
        else {
            query = { status: status.ACTIVE };
        }
        const { search, page, limit, fromDate, toDate } = validatedBody;
        if (search && search != "") {
            query.videoName = { $regex: search, $options: 'i' }
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
        return await periodData.paginate(query, options);
    },

}

module.exports = { periodDataServices };
