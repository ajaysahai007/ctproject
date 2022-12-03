import personalSafety from "../../../models/personalSafety";
import status from "../../../enums/status";
import Type from '../../../enums/userType'
import { id } from "ethers/lib/utils";
const subActivityServices = {

    createSubActivity: async (insertObj) => {
        return await personalSafety.create(insertObj);
    },

    findSubActivity: async (query) => {
        return await personalSafety.findOne(query).populate('categoryId');
    },

    updateSubActivity: async (query, updateObj) => {
        return await personalSafety.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateSubActivityById: async (query, updateObj) => {
        return await personalSafety.findByIdAndUpdate(query, updateObj, { new: true });
    },

    listSubActivity: async (validatedBody,userType) => {
        let query 
        if (userType === Type.ADMIN) {
            query = { status: { $ne: status.DELETE } };
        }
        else {
            query = { status: status.ACTIVE };
        }
        const { search, page, limit, fromDate, toDate ,id} = validatedBody;
        if (search&&search!="") {
            query.title= { $regex: search, $options: 'i' } 
        }
        if (id) {
            query.id = id
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
        return await personalSafety.paginate(query, options);
    },

}

module.exports = { subActivityServices };
