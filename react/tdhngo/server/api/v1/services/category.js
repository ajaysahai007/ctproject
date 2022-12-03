import categoryModel from "../../../models/category";
import status from "../../../enums/status";
const categoryServices = {

    createCategory: async (insertObj) => {
        return await categoryModel.create(insertObj);
    },

    findCategory: async (query) => {
        return await categoryModel.findOne(query);
    },

    updateCategory: async (query, updateObj) => {
        return await categoryModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    updateCategoryById: async (query, updateObj) => {
        return await categoryModel.findByIdAndUpdate(query, updateObj, { new: true });
    },
    listCategory: async (validatedBody) => {
        let query = { status: status.ACTIVE };
        const { search, page, limit,fromDate,toDate } = validatedBody;
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
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        let options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: { createdAt: -1 },
        };
        return await categoryModel.paginate(query, options);
    },

}

module.exports = { categoryServices };
