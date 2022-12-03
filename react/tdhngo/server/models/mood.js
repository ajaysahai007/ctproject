import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "mood",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        mood: { type: String,default:'' },
        userId: { type: Schema.Types.ObjectId, ref: "user" },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("mood", schemaDefination)