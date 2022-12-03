
import userModel from "../../../models/user";
import status from '../../../enums/status';
import userType from "../../../enums/userType";
import mongoose from "mongoose";
import { query } from "express";



const userServices = {
  createUser: async (insertObj) => {
    return await userModel.create(insertObj);
  },

  findUser: async (query) => {
    return await userModel.findOne(query);
  },
  countUser: async (query) => {
    return await userModel.count(query);
  },

  updateUser: async (query, updateObj) => {
    return await userModel.findOneAndUpdate(query, updateObj, { new: true });
  },
  checkEmailMobileNumber: async (email, mobileNumber, id) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: id } }, { $or: [{ email: email }, { mobileNumber: mobileNumber }] }] }
    return await userModel.findOne(query);
  },
  checkUserName: async (userName, id) => {
    let query = { $and: [{ status: { $ne: status.DELETE } }, { _id: { $ne: id } }, { $or: [{ userName: userName }] }] }
    return await userModel.findOne(query);
  },

  getAllUser: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE }, userType: userType.USER };
    const { search, page, limit, fromDate, toDate, userStatus, states, districs } = validatedBody;
    if (search && search !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } },
      ]
    }
    if (userStatus) {
      query.status = userStatus
    }
    if (states) {
      query.states = states
    }
    if (districs) {
      query.districs = districs
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ]
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 }
    };
    return await userModel.paginate(query, options);
  },

  updateUserById: async (query, updateObj) => {
    return await userModel.findByIdAndUpdate(query, updateObj, { new: true })
  },

  usersCount: async (query) => {
    return await userModel.count(query)
  },

  findAllUsers: async (query) => {
    return await userModel.find(query)
  }
}

module.exports = { userServices };
