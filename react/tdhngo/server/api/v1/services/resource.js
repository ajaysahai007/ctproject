import resourceModel from "../../../models/resource";
import status from "../../../enums/status";
const resourceServices = {

    createResource: async (insertObj) => {
        return await resourceModel.create(insertObj);
    },

    findResource: async (query) => {
        return await resourceModel.findOne(query).populate('categoryId');
    },

    updateResource: async (query, updateObj) => {
        return await resourceModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    listResource: async (validatedBody) => {
        let query = { status: { $ne: status.DELETE } };
        const { search, page, limit, fromDate, toDate ,categoryId} = validatedBody;
        if (search && search!=='') {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
            ]
        }
        if(categoryId){
            query.categoryId=categoryId
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
            populate: ('categoryId')
        };
        return await resourceModel.paginate(query, options);
    },

}

module.exports = { resourceServices };
