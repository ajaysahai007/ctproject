import Mongoose, { Schema } from "mongoose";
import status from '../enums/status';
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const options = {
    collection: "symptoms",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        image: { type: String },
        name: { type: String },
        status: { type: String, default: status.ACTIVE }
    },
    options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("symptoms", schemaDefination)

Mongoose.model("symptoms", schemaDefination).find({ status: status.ACTIVE }, (err, res) => {
    if (err) {
        console.log('Symtoms creations error.');
    }
    else if (res.length !== 0) {
        console.log("Symtoms already added");
    }
    else {
        let symptoms1 = {
            name: "Fine",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961799/1666961799051_Fine.png"
        }
        let symptoms2 = {
            name: "Tender",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961821/1666961820340_Tender.png"
        }
        let symptoms3 = {
            name: "Acne",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961735/1666961734214_ACNE.png"
        }
        let symptoms4 = {
            name: "Fatigue",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961840/1666961839577_Fatigue.png"
        }
        let symptoms5 = {
            name: "Carvings",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961860/1666961859703_Carving.png"
        }
        let symptoms6 = {
            name: "Headache",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961881/1666961880264_Headache.png"
        }
        let symptoms7 = {
            name: "Backache",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961771/1666961770681_Backache.png"
        }
        let symptoms8 = {
            name: "Blaoting",
            image: "https://res.cloudinary.com/dt6xwgl81/image/upload/v1666961902/1666961901380_Blaoting.png"
        }
        Mongoose.model("symptoms", schemaDefination).create(symptoms1, symptoms2, symptoms3, symptoms4, symptoms5, symptoms6, symptoms7, symptoms8, (createErr, createRes) => {
            if (createErr) {
                console.log('Creation error!!');
            }
            else {
                console.log("Symptoms created successfully.", createRes);
            }
        })
    }

})