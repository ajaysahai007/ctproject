import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import status from '../enums/status';
import { languages } from 'language-list';

var languageModel = new Schema(
    {
        code: { type: String },
        name: { type: String },
        status: { type: String, default: status.ACTIVE }

    },
    { timestamps: true }
);

languageModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("language", languageModel);
// Mongoose.model("language", languageModel).find({ status: status.ACTIVE }, (err, result) => {
//     if (err) {
//         console.log("Default language creation error.", err);
//     }
//     else if (result.length != 0) {
//         console.log("Default language already created.");
//     }
//     else {
//         let languageData = languages.getData();
//         Mongoose.model("language", languageModel).insertMany(languageData, (err, result) => {
//             if (err) {
//                 console.log("Default language creation error.", err);
//             }
//             else {
//                 console.log("Default language created.", result);
//             }
//         })

//     }
// })