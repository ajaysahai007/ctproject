import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "sleepTraining",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        videoName:{
            type:String
        },
        url:{
            type:String
        },
        status:{
            type:String,
            default:status.ACTIVE
        },
        thumbnail:{
            type:String
        }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("sleepTraining", schemaDefination)