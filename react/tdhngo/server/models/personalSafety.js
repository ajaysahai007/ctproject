import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "personalSafety",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        id:{type:Number},
        title:{type: String,default:""},
        content: { type: String,default:"" },
        media: { type: String,default:"" },
        mediaType:{type: String,default:""},
        status: { type: String, default: status.ACTIVE },
        
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("personalSafety", schemaDefination)