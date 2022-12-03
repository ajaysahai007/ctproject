import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "chatActivity",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        userId: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
        status: { type: String, default: status.ACTIVE },
        section: { type: String }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("chatActivity", schemaDefination)