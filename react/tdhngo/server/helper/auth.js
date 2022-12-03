import config from "config";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import apiError from './apiError';
import responseMessage from '../../assets/responseMessage';

module.exports = {

  verifyToken(req, res, next) {
    if (req.headers.token) {
      jwt.verify(req.headers.token, config.get('jwtsecret'), (err, result) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            return res.status(200).send({
              responseCode: 440,
              responseMessage: "Session Expired, Please login again.",
            });
          }
          else {
            throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
          }
        }
        else {
          console.log(result)
          userModel.findOne({ _id: result._id }, (error, result2) => {
            //console.log("17============",result2);
            if (error) {
              return next(error)
            }
            else if (!result2) {
              console.log(result2);
              //throw apiError.notFound(responseMessage.USER_NOT_FOUND);
              return res.status(200).json({
                responseCode: 404,
                responseMessage: "User not exists."
              })
            }
            else {
              if (result2.status == "BLOCK") {
                return res.status(200).json({
                  responseCode: 450,
                  responseMessage: "You have been blocked by admin."
                })
              }
              else if (result2.status == "DELETE") {
                return res.status(200).json({
                  responseCode: 460,
                  responseMessage: "Your account has been deleted by admin."
                })
              }
              else {
                req.userId = result._id;
                req.userDetails = result
                next();
              }
            }
          })
        }
      })
    } else {
      throw apiError.invalidRequest(responseMessage.NO_TOKEN);
    }
  }
  
}



