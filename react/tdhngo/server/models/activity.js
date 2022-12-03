import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "activity",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        id:{type:Number},
        title: { type: String },
        image: { type: String,default:"" },
        bgImage:{type: String,default:""},
        description: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("activity", schemaDefination)
Mongoose.model("activity", schemaDefination).find({status:{$ne:status.DELETE}}, (err, result) => {
    if (err) {
        console.log("Default activity creation error", err);
    }
    else if (result.length != 0) {
        console.log("Default activity created.");
    }
    else {
        var obj1 = {
            id: 1,
            title: "Menstrual Health",
            description: "Keeping track of menstrual health is also very important.",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665471860/il7rug0kpuvyubfutcdw.png",
            bgImage: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665471919/kci1pnmnk9uujsovanyj.png"
        };
        var obj2 = {
            id: 2,
            title: "Mental Health & Wellbeing",
            description: "These activities will help you maintain a balanced mental health.",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665471940/enmgb0ntm7v1i8eng5zm.png",
            bgImage: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665471961/ehrpmghapw5ciby5yxxh.png"
        };
        var obj3 = {
            id: 3,
            title: "Personal Safety",
            description: "These activities will help you maintain a balanced mental health.",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665471983/irc2gjallgwyhyjtmv7j.png",
            bgImage: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472002/vmkkrayi0fihqlmzrfju.png"
        };
        var obj4 = {
            id: 4,
            title: "Support Services",
            description: "It aims to bring togather all the information about different kind of resources at one place.",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472022/nl9fl9r0nqv5hiikoher.png",
            bgImage: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472048/wg76td6iqnt6djl4vmaj.png"
        };
        Mongoose.model("activity", schemaDefination).create(obj1, obj2, obj3,obj4, (staticErr, staticResult) => {
            if (staticErr) {
                console.log("Default activity creation error .", staticErr);
            }
            else {
                console.log("Default activity created .", staticResult)
            }
        })
    }
})
