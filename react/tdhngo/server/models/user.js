import bcrypt from 'bcryptjs';
import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from '../enums/status';
import boolean from 'joi/lib/types/boolean';

const options = {
  collection: "user",
  timestamps: true,
};

const userModel = new Schema(
  {
    userName: { type: String },
    email: { type: String, default: '' },
    dob: { type: String },
    gender: { type: String },
    profilePic: { type: String },
    countryCode: { type: String },
    mobileNumber: { type: String, default: '' },
    userId: { type: String },
    userType: { type: String, default: userType.USER },
    password: { type: String },
    deviceToken: { type: String },
    deviceType: { type: String },
    otp: { type: Number },
    date: { type: Date },
    emailVerification: { type: Boolean, default: false },
    otpVerification: { type: Boolean, default: false },
    otpTime: { type: Number },
    status: { type: String, default: status.ACTIVE },
    summary:{type: String},
    securityQuestion:{type:String},
    answer:{type:String},
    accountVerify:{type:String,default:false},
    flag: {
      type: Number,
      default: 0
    },
    state:{type:String},
    district:{type:String},
    isReset:{type:Boolean},
    language:{type:String,default:"ENGLISH"},
    ageBetween:{type:String},
    userActivities: {
      Menstrual_Health: {
        period_tracker:{type:Boolean, default: true},
        menstrual_hygiene:{type:Boolean, default: true}, 
        FAQ:{type:Boolean, default: true}, 
        exercise_suggestions:{type:Boolean, default: true}, 
      },
      Mental_Health: {
        sleep_tracking:{type:Boolean, default: true},
        sleep_training:{type:Boolean, default: true}, 
        mood_tracking:{type:Boolean, default: true},
        mental_well_being:{type:Boolean, default: true}, 
        exercise_suggestions:{type:Boolean, default: true},
        journal:{type:Boolean, default: true}
      },
      Personal_Safety: {
        child_abuse:{type:Boolean, default: true},
        online_safety:{type:Boolean, default: true}, 
        sexual_abuse:{type:Boolean, default: true} 
      },
      Support_Services: {
        support_services:{type:Boolean, default: true}, 
      },
      branchName: { type: String, default: "" },
      branchCode: { type: String, default: "" },
      swiftCode: { type: String, default: "" },
      accountType: { type: String, default: "" },
      accountName: { type: String, default: "" },
      accountNumber: { type: String, default: "" }
    },
  },
  
  options
);
userModel.plugin(mongoosePaginate);
userModel.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("user", userModel);

Mongoose.model("user", userModel).find({ userType: userType.ADMIN }, async (err, result) => {
  if (err) {
    console.log("Default admin creation error", err);
  }
  else if (result.length != 0) {
    console.log("Default admin already created.");
  }
  else {
    var obj = {
      userName: "Vishnu",
      email: "no-vishnu@mobiloitte.com",
      password: bcrypt.hashSync("Mobiloitte@1"),
      otpVerification: true,
      userType: userType.ADMIN,
      status: status.ACTIVE,
      userId: "user0001",
      mobileNumber: "8521529565"
    }
    Mongoose.model("user", userModel).create(obj, (err1, staticResult) => {
      if (err1) {
        console.log("Default admin error.", err1);
      }
      else {
        console.log("Default admin created.", staticResult)
      }
    })
  }
})


