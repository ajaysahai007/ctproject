webpackHotUpdate("main",{

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var src_layouts_HomeLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/layouts/HomeLayout */ "./src/layouts/HomeLayout/index.js");
/* harmony import */ var src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/layouts/DashboardLayout */ "./src/layouts/DashboardLayout/index.js");
/* harmony import */ var src_layouts_LoginLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/layouts/LoginLayout */ "./src/layouts/LoginLayout/index.js");
var _jsxFileName = "/Users/admin/Desktop/move2earn-shabuddin-21054003-reactjs-admin/src/routes.js";





const routes = [{
  exact: true,
  path: "/dashboard",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(23)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard */ "./src/views/pages/Dashboard/index.js")))
}, {
  exact: true,
  path: "/users",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(15), __webpack_require__.e(31)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Userlist */ "./src/views/pages/Dashboard/Userlist.js")))
}, {
  exact: true,
  path: "/edit-users",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(19), __webpack_require__.e(60)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/UserEdit */ "./src/views/pages/Dashboard/UserEdit.js")))
}, {
  exact: true,
  path: "/categoryMgmt",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StackingMgmt/StackingTab */ "./src/views/pages/Dashboard/StackingMgmt/StackingTab.js")))
}, {
  exact: true,
  path: "/contract-sniffed",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(30)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Contract/ContractSniffer */ "./src/views/pages/Dashboard/Contract/ContractSniffer.js")))
}, {
  exact: true,
  path: "/nft-list",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(17), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/User/ViewStake */ "./src/views/pages/Dashboard/User/ViewStake.js")))
}, {
  exact: true,
  path: "/stake",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(17), __webpack_require__.e(7), __webpack_require__.e(12), __webpack_require__.e(13), __webpack_require__.e(33)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/User/Stake */ "./src/views/pages/Dashboard/User/Stake.js")))
}, {
  exact: true,
  path: "/nft-detail",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 57).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/User/NftDetail */ "./src/views/pages/Dashboard/User/NftDetail.js")))
}, {
  exact: true,
  path: "/user-list",
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(5), __webpack_require__.e(58)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/User/UserManagement */ "./src/views/pages/Dashboard/User/UserManagement.js")))
}, {
  exact: true,
  path: "/",
  layout: src_layouts_LoginLayout__WEBPACK_IMPORTED_MODULE_4__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(8), __webpack_require__.e(9), __webpack_require__.e(41)]).then(__webpack_require__.bind(null, /*! src/views/auth/LogIn */ "./src/views/auth/LogIn/index.js")))
}, {
  exact: true,
  path: "/logo",
  layout: src_layouts_LoginLayout__WEBPACK_IMPORTED_MODULE_4__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! src/component/Logo */ "./src/component/Logo.js")))
}, {
  exact: true,
  path: "/forget-password",
  // guard:true,
  layout: src_layouts_LoginLayout__WEBPACK_IMPORTED_MODULE_4__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(8), __webpack_require__.e(9), __webpack_require__.e(24)]).then(__webpack_require__.bind(null, /*! src/views/auth/forget-password/index */ "./src/views/auth/forget-password/index.js")))
}, {
  exact: true,
  path: "/instrauctions",
  // guard:true,
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(4), __webpack_require__.e(52)]).then(__webpack_require__.bind(null, /*! src/views/auth/forget-password-link/index */ "./src/views/auth/forget-password-link/index.js")))
}, {
  exact: true,
  path: "/reset-password",
  // guard:true,{n}
  layout: src_layouts_LoginLayout__WEBPACK_IMPORTED_MODULE_4__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(8), __webpack_require__.e(9), __webpack_require__.e(25)]).then(__webpack_require__.bind(null, /*! src/views/auth/reset-password/index */ "./src/views/auth/reset-password/index.js")))
}, {
  exact: true,
  path: "/contentMgmt",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(8), __webpack_require__.e(26), __webpack_require__.e(7), __webpack_require__.e(15), __webpack_require__.e(18), __webpack_require__.e(32)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Admin/Index */ "./src/views/pages/Dashboard/Admin/Index.js")))
}, {
  exact: true,
  path: "/stackingDetail",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(34)]).then(__webpack_require__.bind(null, /*! src/component/StakingDetails */ "./src/component/StakingDetails.js")))
}, {
  exact: true,
  path: "/edit-partner",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Admin/AddPartner */ "./src/views/pages/Dashboard/Admin/AddPartner.js")))
}, {
  exact: true,
  path: "/view-partner",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Admin/AddPartner */ "./src/views/pages/Dashboard/Admin/AddPartner.js")))
}, {
  exact: true,
  path: "/pressMedia",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(18), __webpack_require__.e(22)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Press&Media/index */ "./src/views/pages/Dashboard/Press&Media/index.js")))
}, {
  exact: true,
  path: "/add-media",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(46)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Press&Media/mediaAdd */ "./src/views/pages/Dashboard/Press&Media/mediaAdd.js")))
}, {
  exact: true,
  path: "/view-media",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(45)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Press&Media/ViewMedia.js */ "./src/views/pages/Dashboard/Press&Media/ViewMedia.js")))
}, {
  exact: true,
  path: "/edit-media",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(44)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Press&Media/EditMedia.js */ "./src/views/pages/Dashboard/Press&Media/EditMedia.js")))
}, {
  exact: true,
  path: "/AddPartner",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/Admin/AddPartner */ "./src/views/pages/Dashboard/Admin/AddPartner.js")))
}, {
  exact: true,
  path: "/ViewUser",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(12), __webpack_require__.e(59)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/User/ViewUser */ "./src/views/pages/Dashboard/User/ViewUser.js")))
}, {
  exact: true,
  path: "/resouceMgmt",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(5), __webpack_require__.e(19), __webpack_require__.e(27), __webpack_require__.e(43)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/Static */ "./src/views/pages/Dashboard/StaticManagement/Static.js")))
}, {
  exact: true,
  path: "/team-management",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(14), __webpack_require__.e(56)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/TeamManagement */ "./src/views/pages/Dashboard/StaticManagement/TeamManagement.js")))
}, {
  exact: true,
  path: "/Faq-manage",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(6), __webpack_require__.e(7), __webpack_require__.e(14), __webpack_require__.e(55)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/PrivacyManage */ "./src/views/pages/Dashboard/StaticManagement/PrivacyManage.js")))
}, {
  exact: true,
  path: "/add-team",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(47)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/AddNewTeam */ "./src/views/pages/Dashboard/StaticManagement/AddNewTeam.js")))
}, {
  exact: true,
  path: "/view-team",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(49)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/ViewTeam */ "./src/views/pages/Dashboard/StaticManagement/ViewTeam.js")))
}, {
  exact: true,
  path: "/edit-team",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(48)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/Edit-team.js */ "./src/views/pages/Dashboard/StaticManagement/Edit-team.js")))
}, {
  exact: true,
  path: "/social-links",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(38)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/SocialLinks */ "./src/views/pages/Dashboard/StaticManagement/SocialLinks.js")))
}, {
  exact: true,
  path: "/edit-links",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(39)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/SocialLinksEdit */ "./src/views/pages/Dashboard/StaticManagement/SocialLinksEdit.js")))
}, {
  exact: true,
  path: "/view-content",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 53).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/About */ "./src/views/pages/Dashboard/StaticManagement/About.js")))
}, {
  exact: true,
  path: "/view-announcements",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 54).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/Announcements */ "./src/views/pages/Dashboard/StaticManagement/Announcements.js")))
}, {
  exact: true,
  path: "/edit-announcements",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(36)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/AnnouncementsEdit */ "./src/views/pages/Dashboard/StaticManagement/AnnouncementsEdit.js")))
}, {
  exact: true,
  path: "/edit-content",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(11), __webpack_require__.e(35)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/AboutEdit */ "./src/views/pages/Dashboard/StaticManagement/AboutEdit.js")))
}, {
  exact: true,
  path: "/view-terms",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/TermsCondition */ "./src/views/pages/Dashboard/StaticManagement/TermsCondition.js")))
}, {
  exact: true,
  path: "/edit-terms",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(11), __webpack_require__.e(40)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/TermsConditionEdit */ "./src/views/pages/Dashboard/StaticManagement/TermsConditionEdit.js")))
}, {
  exact: true,
  path: "/policy",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 50).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/PrivacyPolicy */ "./src/views/pages/Dashboard/StaticManagement/PrivacyPolicy.js")))
}, {
  exact: true,
  path: "/edit-policy",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(11), __webpack_require__.e(37)]).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/PrivacyPolicyEdit */ "./src/views/pages/Dashboard/StaticManagement/PrivacyPolicyEdit.js")))
}, {
  exact: true,
  path: "/view-terms",
  // guard:true,
  layout: src_layouts_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! src/views/pages/Dashboard/StaticManagement/TermsCondition */ "./src/views/pages/Dashboard/StaticManagement/TermsCondition.js")))
}, {
  exact: true,
  path: "/terms-condition",
  layout: src_layouts_HomeLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(29)]).then(__webpack_require__.bind(null, /*! src/views/pages/TermsAndConditions */ "./src/views/pages/TermsAndConditions/index.js")))
}, {
  exact: true,
  path: "/terms-services",
  layout: src_layouts_HomeLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => __webpack_require__.e(/*! import() */ 51).then(__webpack_require__.bind(null, /*! src/views/pages/TermsAndConditions/TermsServices */ "./src/views/pages/TermsAndConditions/TermsServices.js")))
}, {
  exact: true,
  path: "/privacy-policy",
  layout: src_layouts_HomeLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(28)]).then(__webpack_require__.bind(null, /*! src/views/pages/Privacy */ "./src/views/pages/Privacy/index.js")))
}, {
  exact: true,
  path: "/404",
  component: Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(42)]).then(__webpack_require__.bind(null, /*! src/views/errors/NotFound */ "./src/views/errors/NotFound.js")))
}, {
  component: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
    to: "/404",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 380,
      columnNumber: 22
    }
  })
}];

/***/ })

})
//# sourceMappingURL=main.5aeebc37f8953ee492b2.hot-update.js.map