import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "usersymptoms",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        symptomId: { type: Schema.Types.ObjectId, ref: "symptoms" },
        userId: { type: Schema.Types.ObjectId, ref: "user" },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("usersymptoms", schemaDefination)