import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "userPeriodData",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        userId: { type: Schema.Types.ObjectId,ref:'user'},
        periodDate:{type:String},
        periodEndDate:{type:String},
        periodsDate:{type:Array},
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("userPeriodData", schemaDefination)