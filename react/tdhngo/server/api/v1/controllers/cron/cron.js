import cron from "node-cron";
import userModel from '../../../../models/user';
import tracker from '../../../../models/sleepTracker';
import status from '../../../../enums/status';
import userType from '../../../../enums/userType'
console.log("from cron-=============");
cron.schedule('0 0 * * * *', async () => {
    console.log("Hi from adding date cron---------====")
    let users = await userModel.find({ status: status.ACTIVE,userType:userType.USER })
    console.log("cron users",users);
    if (users.length === 0) {
        console.log("No users is the list");
    }
    else {
        for (let i = 0; i < users.length; i++) {
            let sleepTrackingData = await tracker.findOne({status:status.ACTIVE,userId:users[i]._id}).sort({createdAt:-1})
            console.log("sleep data-=-=-=-=-=--=cron",sleepTrackingData);
            let saveObj ={
                bedTime:sleepTrackingData.bedTime,
                wakeUpTime:sleepTrackingData.wakeUpTime,
                userId:sleepTrackingData.userId
            }
            await tracker.create(saveObj)
        }
        console.log("Tracking data added");
    }
}).start();