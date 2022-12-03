import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import mongoose from "mongoose";

const options = {
    collection: "subActivity",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        activityId: { type: Number },
        title: { type: String },
        image: { type: String, default: "" },
        description: { type: String },
        status: { type: String, default: status.ACTIVE },
        id:{type: Number}
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("subActivity", schemaDefination)
Mongoose.model("subActivity", schemaDefination).find({ status: { $ne: status.DELETE } }, (err, result) => {
    if (err) {
        console.log("Default sub activity creation error", err);
    }
    else if (result.length != 0) {
        console.log("Default sub activity created.");
    }
    else {
        var obj1 = {
            activityId: 1,
            title: "Period Tracker",
            description: "Track your period dates and get notified prior to be prepared .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472165/q05i5vglyfzkbk380rvu.png"
        };
        var obj2 = {
            activityId: 1,
            title: "Menstrual Hygiene",
            description: "When it comes to hygiene, menstrual hygiene is very important .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472192/zbpifmra9bwmeqx7c11t.png"
        };
        var obj3 = {
            activityId: 1,
            title: "FAQ",
            description: "All you want to know about menstrual health .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472213/p7i7zo6ubgmndwwg8fok.png"
        };
        // var obj4 = {
        //     activityId: 1,
        //     title: "Exercise Suggestion",
        //     description: "Exercise suggestion according to your needs and preferences,just a step to stay fit and healthy .",
        //     image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665472238/hlyozjdjeqodz3gysnzy.png"
        // };
        var obj5 = {
            activityId: 2,
            title: "Sleep Tracking",
            id:21,
            description: "This sleep tracker will help you to maintain a proper sleep everyday .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665473910/mazlcsv8hz4sxjsglsmm.png"
        };
        var obj6 = {
            activityId: 2,
            title: "Sleep Training",
            id:22,
            description: "Sleep training helps you to train you to get a proper sleep when you are unable to sleep .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665473956/lomifburrw4lnt7gpu0r.png"
        };
        var obj7 = {
            activityId: 2,
            title: "Mood Tracking",
            id:23,
            description: "Suggestion are made to improve your mood .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665473999/zqgoqgtzkemhshjxxjag.png"
        };
        var obj8 = {
            activityId: 2,
            title: "Mental Well-Being",
            id:24,
            description: "Keep your self healthy from inside using these activities for a healthy stress free mind .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474052/kh9gudscnnr9wufli177.png"
        };
        var obj9 = {
            activityId: 2,
            title: "Exercise Suggestion",
            id:25,
            description: "Exercise suggestions according to your needs and preferences, just a step to stay fit and healthy .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474085/lqppjgh5jqvrklpd3ph3.png"
        };
        var obj10 = {
            activityId: 2,
            title: "Journal",
            id:26,
            description: "Journal can help you gain control of your emotions and improve your mental health .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474120/whxw544a1oqcujqkwgfn.png"
        };
        var obj11 = {
            activityId: 3,
            title: "Child Abuse",
            id:31,
            description: "Child abuse is any form of maltreatment by an adult, which is violent or threatening for the child .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474177/pqu3fiubx3f3aaevrfz5.png"

        };
        var obj12 = {
            activityId: 3,
            title: "Online Safety",
            id:32,
            description: "Whether it's protecting yourself from hackers or cyberbullies, these tips will help you navigate the digital world safely .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474236/nchtsgodoz2pwbygcd1a.png"
        };
        var obj13 = {
            activityId: 3,
            title: "Sexual abuse",
            id:33,
            description: "When someone intentionally harms you physically, psychologically, sexually, or by acts of neglect, the crime is known as sexual abuse .",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1665474289/uukivcaaqglj7eltk7r0.png"
        };
        Mongoose.model("subActivity", schemaDefination).create(obj1, obj2, obj3, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, (staticErr, staticResult) => {
            if (staticErr) {
                console.log("Default sub activity creation error .", staticErr);
            }
            else {
                console.log("Default sub activity created .", staticResult)
            }
        })
    }
})
