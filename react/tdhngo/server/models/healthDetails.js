import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "healthDetails",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        height: { type: String },
        weight: { type: String },
        bloodGroup: { type: String },
        temperature: { type: String },
        hemoglobin: { type: String },
        bloodPressure: { type: String },
        bloodSugar: { type: String },
        date: { type: Date },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("healthDetails", schemaDefination)