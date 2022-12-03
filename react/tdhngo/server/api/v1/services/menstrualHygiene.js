import menstrualHygieneModel from "../../../models/menstrual";
import status from "../../../enums/status";
const menstrualHygieneServices = {

    createMenstrualHygiene: async (insertObj) => {
        return await menstrualHygieneModel.create(insertObj);
    },

    findMenstrualHygiene: async (query) => {
        return await menstrualHygieneModel.findOne(query);
    },

    updateMenstrualHygiene: async (query, updateObj) => {
        return await menstrualHygieneModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateMenstrualHygieneById: async (query, updateObj) => {
        return await menstrualHygieneModel.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listMenstrualHygiene: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, page, limit, fromDate, toDate,activityId} = validatedBody;
        if (search&&search!="") {
            query.article_name = { $regex: search, $options: 'i' }
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
        return await menstrualHygieneModel.paginate(query, options);
    },
    menstrualHygieneCount:async(query)=>{
        return await menstrualHygieneModel.count(query)
    }

}

module.exports = { menstrualHygieneServices };
