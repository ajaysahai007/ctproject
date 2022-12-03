import emergencyModel from "../../../models/emergency";
import status from "../../../enums/status";

const emergencyServices = {

    createEmergency: async (insertObj) => {
        return await emergencyModel.create(insertObj);
    },

    findEmergency: async (query) => {
        return await emergencyModel.findOne(query);
    },

    updateEmergency: async (query, updateObj) => {
        return await emergencyModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    emergencyList: async (query) => {
        return await emergencyModel.find(query);
    },

    listEmergencyPaginate: async (validatedBody) => {
        let query = { status: status.ACTIVE };
        const { search, page, limit,fromDate,toDate,emergencyType } = validatedBody;
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
        if (search && search!=='') {
            query.$or = [
                { district: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]
        }
        if (emergencyType) {
            query.emergencyType =emergencyType
        }

        let options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: { createdAt: -1 },
        };
        return await emergencyModel.paginate(query, options);
    },

}

module.exports = { emergencyServices };