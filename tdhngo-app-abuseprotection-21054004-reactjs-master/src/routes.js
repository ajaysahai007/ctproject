import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";

export const routes = [
  {
    exact: true,
    path: "/dashboard",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },

  {
    exact: true,
    path: "/users",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Userlist")),
  },
  // View user

  {
    exact: true,
    path: "/feedbackMgmt",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Feedback Mgmt/FeedbackHome")
    ),
  },

  {
    exact: true,
    path: "/edit-users",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/UserEdit")),
  },
  {
    exact: true,
    path: "/categoryMgmt",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StackingMgmt/StackingTab")
    ),
  },

  {
    exact: true,
    path: "/contract-sniffed",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Contract/ContractSniffer")
    ),
  },

  {
    exact: true,
    path: "/contentMgmtTable",
    layout: DashboardLayout,
    component: lazy(() => import("src/component/StaticContentTable.js")),
  },

  {
    exact: true,
    path: "/nft-detail",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/User/NftDetail")),
  },
  {
    exact: true,
    path: "/user-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/User/UserManagement")
    ),
  },
  {
    exact: true,
    path: "/userDetails",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Viewuser.js")),
  },
  {
    exact: true,
    path: "/changePassword",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Profile/ChangePassword")
    ),
  },
  {
    exact: true,
    path: "/activityView",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Activity Management/AddViewEdit")
    ),
  },
  {
    exact: true,
    path: "/emergencyView",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Emergency Management/AddviewEdit")
    ),
  },
  {
    exact: true,
    path: "/bannerView",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Banner Management/AddViewEdit")
    ),
  },
  {
    exact: true,
    path: "/subActivityView",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Sub Activity management/SubAddViewEdit")
    ),
  },
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/Login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/logo",
    layout: LoginLayout,
    component: lazy(() => import("src/component/Logo")),
  },

  {
    exact: true,
    path: "/forget-password",
    // guard:true,
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/forget-password/index")),
  },
  {
    exact: true,
    path: "/Verify-otp",
    // guard:true,
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/reset-password/VerifyOtp.js")),
  },
  {
    exact: true,
    path: "/instrauctions",
    // guard:true,
    component: lazy(() => import("src/views/auth/forget-password-link/index")),
  },
  {
    exact: true,
    path: "/reset-password",
    // guard:true,{n}
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/reset-password/index")),
  },
  {
    exact: true,
    path: "/contentMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Admin/Index")),
  },
  {
    exact: true,
    path: "/stackingDetail",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/StakingDetails")),
  },
  {
    exact: true,
    path: "/edit-partner",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Admin/AddPartner")),
  },
  {
    exact: true,
    path: "/view-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Profile/ViewProfile")
    ),
  },
  {
    exact: true,
    path: "/edit-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Profile/EditProfile")
    ),
  },
  {
    exact: true,
    path: "/viewReport",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/ReportView")),
  },
  {
    exact: true,
    path: "/view-partner",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Admin/AddPartner")),
  },
  {
    exact: true,
    path: "/addNewPartner",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Admin/AddNewPartner")
    ),
  },
  {
    exact: true,
    path: "/report-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Press&Media/index")
    ),
  },
  {
    exact: true,
    path: "/add-media",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Press&Media/mediaAdd")
    ),
  },
  {
    exact: true,
    path: "/view-media",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Press&Media/ViewMedia.js")
    ),
  },
  {
    exact: true,
    path: "/edit-media",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Press&Media/EditMedia.js")
    ),
  },
  {
    exact: true,
    path: "/AddPartner",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Admin/AddPartner")),
  },

  {
    exact: true,
    path: "/resouceMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/Static")
    ),
  },
  //Add Resource
  {
    exact: true,
    path: "/add-resource",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddResource")
    ),
  },
  {
    exact: true,
    path: "/faq-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddResource")
    ),
  },
  //View Resource
  {
    exact: true,
    path: "/add-new-resource",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddNewTeam")
    ),
  },
  {
    exact: true,
    path: "/view-resource",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/ViewResource")
    ),
  },
  {
    exact: true,
    path: "/Faq-manage",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/FaqData")
    ),
  },
  {
    exact: true,
    path: "/edit-faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/EditFaq")
    ),
  },
  {
    exact: true,
    path: "/add-faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddFaqquestion.js")
    ),
  },
  {
    exact: true,
    path: "/team-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/TeamManagement")
    ),
  },

  {
    exact: true,
    path: "/add-team",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddNewTeam")
    ),
  },
  {
    exact: true,
    path: "/view-team",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/ViewTeam")
    ),
  },
  {
    exact: true,
    path: "/edit-team",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/Edit-team.js")
    ),
  },
  {
    exact: true,
    path: "/emergencyMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Emergency Management/Index")
    ),
  },
  {
    exact: true,
    path: "/emergencyadd",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Emergency Management/AddEmergency")
    ),
  },
  {
    exact: true,
    path: "/bannerMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Banner Management/index")
    ),
  },
  {
    exact: true,
    path: "/activityMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Activity Management/Index")
    ),
  },
  {
    exact: true,
    path: "/activitycategory",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Activity Management/SubActivityTable")
    ),
  },
  {
    exact: true,
    path: "/menstrual-health",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/MensuralHealth.js")),
  },
  {
    exact: true,
    path: "/mental-health",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/MentalHealthandWellBeing.js")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/PrivacyPolicy.js")
    ),
  },
  {
    exact: true,
    path: "/personal-safety",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/PersonalSafety.js")),
  },
  {
    exact: true,
    path: "/personal-safeties",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/AddViewEdit_personal_safety.js")
    ),
  },
  {
    exact: true,
    path: "/term-and-condition",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/TermsCondition.js")
    ),
  },
  {
    exact: true,
    path: "/about-us",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/AboutUs/index")),
  },
  {
    exact: true,
    path: "/personal-safety-view",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PersonalSafety_View.js")
    ),
  },

  {
    exact: true,
    path: "/menstrual-health-list",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/MenstualHealth/Menstrual_health_List.js"
      )
    ),
  },

  {
    exact: true,
    path: "/activityorder",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Activity Management/SubActivityorder")
    ),
  },
  {
    exact: true,
    path: "/personal-safety",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Personal_Safety_List.js")
    ),
  },
  {
    exact: true,
    path: "/sub-activityMgmt",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Sub Activity management/Index")
    ),
  },
  {
    exact: true,
    path: "/addFAQ",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AddFAQ")
    ),
  },

  {
    exact: true,
    path: "/view-content",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/About")
    ),
  },
  {
    exact: true,
    path: "/view-contact",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/Contact")
    ),
  },

  {
    exact: true,
    path: "/view-announcements",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/Announcements")
    ),
  },

  {
    exact: true,
    path: "/edit-announcements",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AnnouncementsEdit")
    ),
  },

  {
    exact: true,
    path: "/edit-content",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/AboutEdit")
    ),
  },

  {
    exact: true,
    path: "/edit-terms",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/TermsConditionEdit")
    ),
  },
  {
    exact: true,
    path: "/feedbackBox",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/feedBackBox.js")),
  },
  {
    exact: true,
    path: "/policy",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/PrivacyPolicy")
    ),
  },

  {
    exact: true,
    path: "/edit-policy",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/PrivacyPolicyEdit")
    ),
  },

  {
    exact: true,
    path: "/view-terms",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/StaticManagement/TermsCondition")
    ),
  },

  {
    exact: true,
    path: "/sleep-tracking-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/SleepTracking/SleepTracking")
    ),
  },

  {
    exact: true,
    path: "/sleep-tracking",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/SleepTracking/Add_View_Edit.js")
    ),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    exact: true,
    path: "/mental-well-being-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MentalWellbeing/MentalWellbeing")
    ),
  },
  {
    exact: true,
    path: "/mental-well-being",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MentalWellbeing/ListWellBeing")
    ),
  },
  {
    exact: true,
    path: "/mental-well-being-section",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MentalWellbeing/Add_View_Edit.js")
    ),
  },
  {
    exact: true,
    path: "/period-tracker",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MenstualHealth/Add_View-Edit.js")
    ),
  },
  {
    exact: true,
    path: "/menstrual-hygiene-list",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MenstrualHygiene/Menstrual_Hygiene.js")
    ),
  },
  {
    exact: true,
    path: "/exercise-suggestion",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/ExerciseSuggestion/Exercisesuggestion")
    ),
  },
  {
    exact: true,
    path: "/menstrual-hygiene",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/MenstrualHygiene/View_add_Edit.js")
    ),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
