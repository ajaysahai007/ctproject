import faqModel from "../../../models/faq";
import status from "../../../enums/status";

const faqServices = {

    createFaq: async (insertObj) => {
        return await faqModel.create(insertObj);
    },

    findFaq: async (query) => {
        return await faqModel.findOne(query);
    },

    updateFaq: async (query, updateObj) => {
        return await faqModel.findOneAndUpdate(query, updateObj, { new: true });
    },

    faqList: async (query) => {
        return await faqModel.find(query);
    },

}

module.exports = { faqServices };