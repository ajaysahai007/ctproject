import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "journal",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        title: { type: String ,default:''},
        myGoalanswer: { type: String, default: "" },
        achieveGoalanswer: { type: String, default: "" },
        rewardGoalanswer: { type: String, default: "" },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        completionDate:{
            type:String,
            default:""
        },
        type:{
            type:String,
            enum:["JOURNAL","GOAL"]
        },
        status:{
            type:String,
            default:status.ACTIVE
        }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("journal", schemaDefination)