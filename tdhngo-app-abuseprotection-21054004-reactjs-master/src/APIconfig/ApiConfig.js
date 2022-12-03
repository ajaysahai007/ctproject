export const baseurl = "https://node-tdhngo.mobiloitte.com";
// export const baseurl = "http://172.16.1.246:1936";

let user = `${baseurl}/api/v1/user`;
let category = `${baseurl}/api/v1/category`;
let admin = `${baseurl}/api/v1/admin`;
let emergency = `${baseurl}/api/v1/emergency`;
let resource = `${baseurl}/api/v1/resource`;
let staticbanner = `${baseurl}/api/v1/static`;
let periodTracker = `${baseurl}/api/v1/periodTracker`;
let static1 = `${baseurl}/api/v1/static`;
let faq = `${baseurl}/api/v1/static`;
let activities = `${baseurl}/api/v1/activities`;
let menstrualHygiene = `${baseurl}/api/v1/menstrualHygiene`;

const apiConfig = {
  // user api
  login: `${admin}/login`,
  forgotPassword: `${admin}/forgotPassword`,
  verifyOTP: `${admin}/verifyOTP`,
  resetPassword: `${admin}/resetPassword`,
  listUsers: `${admin}/listUsers`,
  viewUsers: `${admin}/viewUsers`,
  blockUnblockUsers: `${admin}/blockUnblockUsers`,
  updateProfile: `${admin}/updateProfile`,
  getProfile: `${admin}/getProfile`,
  feedbackList: `${admin}/feedbackList`,
  feedbackView: `${admin}/feedbackView`,
  adminDashboard: `${admin}/adminDashboard`,
  registeredUserGraph: `${admin}/registeredUserGraph`,
  listReport: `${admin}/listReport`,

  //category api
  listCategory: `${category}/listCategory`,
  viewCategory: `${category}/viewCategory`,
  editCategory: `${category}/editCategory`,
  addCategory: `${category}/addCategory`,
  deleteCategory: `${category}/deleteCategory`,

  // deleteCategory`${category}/deleteCategory`,
  // emergency
  listEmergency: `${emergency}/listEmergency`,
  viewEmergency: `${emergency}/viewEmergency`,
  editEmergency: `${emergency}/editEmergency`,
  addEmergency: `${emergency}/addEmergency`,
  deleteEmergency: `${emergency}/deleteEmergency`,

  //user

  //ACTIVITY MANAGEMENT
  listActivity: `${user}/listActivity`,
  listSubActivity: `${user}/listSubActivity`,
  //   listAllUser: `${admin}/listAllUser`,
  //Resource management
  addResource: `${resource}/addResource`,
  listResource: `${resource}/listResource`,
  viewResource: `${resource}/viewResource`,
  deleteResource: `${resource}/deleteResource`,
  editResource: `${resource}/editResource`,
  deleteResource: `${resource}/deleteResource`,

  //BANNER MANAGEMENT
  addBanner: `${staticbanner}/addBanner`,
  listBanner: `${staticbanner}/listBanner`,
  listAdminBanner: `${staticbanner}/listAdminBanner`,
  blockunblockBanner: `${staticbanner}/blockunblockBanner`,

  viewBanner: `${staticbanner}/viewBanner`,

  deleteBanner: `${staticbanner}/deleteBanner`,
  editBanner: `${staticbanner}/editBanner`,

  //periodTracker management section
  listPeriodTracker: `${periodTracker}/listPeriodTracker`,
  addPeriodTracker: `${periodTracker}/addPeriodTracker`,
  editPeriodTracker: `${periodTracker}/editPeriodTracker`,
  viewPeriodTracker: `${periodTracker}/viewPeriodTracker`,
  blockUnblockPeriodTracker: `${periodTracker}/blockUnblockPeriodTracker`,

  staticContentList: `${static1}/staticContentList`,
  viewStaticContent: `${static1}/staticContent`,
  editStaticContent: `${static1}/staticContent`,

  //faq section
  listFAQ: `${faq}/listFAQ`,
  addFaq: `${faq}/addFaq`,

  //LIST SUBACTIVITIES
  personalSafetySubList: `${activities}/personalSafetySubList`,
  viewPersonalSafetySubData: `${activities}/viewPersonalSafetySubData`,
  updatePersonalSafetySubData: `${activities}/updatePersonalSafetySubData`,
  addPersonalSafetySubData: `${activities}/addPersonalSafetySubData`,
  listSleepTrainingData: `${activities}/listSleepTrainingData`,
  viewSleepTrainingData: `${activities}/viewSleepTrainingData`,
  editSleepTrainingData: `${activities}/editSleepTrainingData`,
  blockPersonalSafetySubData: `${activities}/blockPersonalSafetySubData`,
  blockSleepTrainingData: `${activities}/blockSleepTrainingData`,
  listSleepTrackingData: `${activities}/listSleepTrackingData`,
  addSleepTrackingData: `${activities}/addSleepTrackingData`,
  editSleepTrackingData: `${activities}/editSleepTrackingData`,
  viewSleepTrackingData: `${activities}/viewSleepTrackingData`,
  blockSleepTrackingData: `${activities}/blockSleepTrackingData`,
  addSleepTrainingData: `${activities}/addSleepTrainingData`,
  listMentalAndWellBeingData: `${activities}/listMentalAndWellBeingData`,
  viewMentalAndWellBeingData: `${activities}/viewMentalAndWellBeingData`,
  addMentalAndWellBeingData: `${activities}/addMentalAndWellBeingData`,
  editMentalAndWellBeingData: `${activities}/editMentalAndWellBeingData`,
  blockMentalAndWellBeingData: `${activities}/blockMentalAndWellBeingData`,

  // menstrualHygiene
  listMenstrualHygiene: `${menstrualHygiene}/listMenstrualHygiene`,
  addMenstrualHygiene: `${menstrualHygiene}/addMenstrualHygiene`,
  editMenstrualHygiene: `${menstrualHygiene}/editMenstrualHygiene`,
  viewMenstrualHygiene: `${menstrualHygiene}/viewMenstrualHygiene`,
  blockUnblockMenstrualHygiene: `${menstrualHygiene}/blockUnblockMenstrualHygiene`,
};

export default apiConfig;
