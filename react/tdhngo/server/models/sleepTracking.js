import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "sleeptrack",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        bedTime: { type: String },
        wakeUpTime: { type: String },
        date: { type: Date, default: new Date() },
        userId: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
        status: { type: String, default: status.ACTIVE },
        url: { type: String },
        videoName: {
            type: String
        },
        thumbnail:{
            type:String
        }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("sleeptrack", schemaDefination)