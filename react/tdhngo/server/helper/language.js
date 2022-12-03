module.exports = {
    responseMessage: async (language) => {
        if (language == "ENGLISH") {
            message = require('../../assets/englishMessages');
        }
        if (language == "HINDI") {
            message = require('../../assets/hindiMessages')
        }
        if (language == "BENGALI") {
            message = require('../../assets/bengaliMessages')
        }
        if (language == "MARATHI") {
            message = require('../../assets/marathiMessages')
        }
        if (language == "MALAYALAM") {
            message = require('../../assets/malayalamMessages')
        }
        return message;
    }
}