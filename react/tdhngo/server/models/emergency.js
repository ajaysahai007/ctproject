import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import emergencyType from '../enums/emergency'

const options = {
    collection: "emergency",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        contactNumber: { type: Number },
        district: { type: String },
        state: { type: String },
        image: { type: String },
        location: { type: String },
        emergencyType: { type: String, enum: emergencyType },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("emergency", schemaDefination)