import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "metalHealthAndWellBeing",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        article_name: { type: String },
        content: { type: String },
        url: { type: String },
        objective: { type: String },
        status: { type: String, default: status.ACTIVE },
        videoDuration:{
            type:String
        },
        type:{
            type:String,
            enum:["POSITIVE_THINKING","SELF_CARE","MINDFULNESS","MANAGING_STRESS","MANAGING_EMOTION","RELATIONSHIP","RUNNING","YOGA"]
        }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("metalHealthAndWellBeing", schemaDefination)