import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import status from '../enums/status';
var notificationModel = new Schema(

  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    title: {
      type: String
    },
    message: {
      type: String
    },
    read:{
      type:Boolean,
      default:false
    },
    status: { type: String, default: status.ACTIVE },
  },
  { timestamps: true }
);

notificationModel.plugin(mongoosePaginate);
module.exports = Mongoose.model("notification", notificationModel);