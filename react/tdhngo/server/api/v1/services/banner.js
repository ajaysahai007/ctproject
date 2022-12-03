import status from "../../../enums/status";
import bannerModel from "../../../models/banner";

const bannerServices = {

    createBanner: async (insertObj) => {
        return await bannerModel.create(insertObj);
    },

    findBanner: async (query) => {
        return await bannerModel.findOne(query);
    },

    updateBanner: async (query, updateObj) => {
        return await bannerModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    bannerList: async (query) => {
        return await bannerModel.find(query);
    },

    paginateBannerList: async (body) => {
        const { page, limit, search , fromDate, toDate } = body
        let query = { status: { $ne: status.DELETE } }
        if (search) {
            query.title = { $regex: search, $options: 'i' }
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
            sort: { createdAt: -1 }
        }
        return await bannerModel.paginate(query, options);
    },

}

module.exports = { bannerServices };