import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "menstrualHygiene",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        article_name: { type: String },
        image: { type: String },
        video: { type: String },
        objective: { type: String },
        status: { type: String, default: status.ACTIVE },
        thumbnail:{type:String}
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("menstrualHygiene", schemaDefination)