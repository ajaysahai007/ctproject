import periodTrackerModel from "../../../models/periodTracker";
import status from "../../../enums/status";
import userType from "../../../enums/userType";
const periodTrackerServices = {

    createPeriodTracker: async (insertObj) => {
        return await periodTrackerModel.create(insertObj);
    },

    findPeriodTracker: async (query) => {
        return await periodTrackerModel.findOne(query);
    },

    updatePeriodTracker: async (query, updateObj) => {
        return await periodTrackerModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updatePeriodTrackerById: async (query, updateObj) => {
        return await periodTrackerModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listPeriodTracker: async (validatedBody, type) => {
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
        return await periodTrackerModel.paginate(query, options);
    },

    periodTrackerCount:async(query)=>{
        return await periodTrackerModel.count(query)
    }

}

module.exports = { periodTrackerServices };
