import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "activityFaq",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        question: { type: String },
        answer: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("activityFaq", schemaDefination)