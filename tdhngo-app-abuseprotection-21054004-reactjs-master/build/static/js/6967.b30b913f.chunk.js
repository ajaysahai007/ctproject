"use strict";(self.webpackChunkneed_a_web_developer_21043817=self.webpackChunkneed_a_web_developer_21043817||[]).push([[6967],{64673:function(e,t,n){n(72791);var i=n(41971),r=n(35720),o=n(38317),a=n(80184);t.Z=(0,o.Z)((function(e){return{circularProgress:{color:"green"}}}),{withTheme:!0})((function(e){var t=e.size,n=e.classes;return(0,a.jsx)(i.Z,{color:"secondary.main",pl:1.5,display:"flex",children:(0,a.jsx)(r.Z,{size:t||24,thickness:t?t/5*24:5,className:n.circularProgress})})}))},22612:function(e,t,n){n.d(t,{Z:function(){return a}});var i=n(41971),r=n(38302),o=(n(72791),n(80184));function a(){return(0,o.jsx)(i.Z,{style:{display:"flex",justifyContent:"center",paddingTop:"10px"},children:(0,o.jsx)(r.Z,{style:{color:"black",fontSize:"16px"},children:"No data found"})})}},50158:function(e,t,n){n.d(t,{Z:function(){return o}});n(72791);var i=n(54270),r=n(80184);function o(e){var t=e.title,n=e.children;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.q,{children:(0,r.jsx)("title",{children:t})}),(0,r.jsx)("div",{children:n})]})}},2703:function(e,t,n){n.d(t,{UC:function(){return o},jF:function(){return a}});var i=n(72426),r=n.n(i);function o(e){return"".concat(null===e||void 0===e?void 0:e.slice(0,6),"...").concat(null===e||void 0===e?void 0:e.slice(e.length-4))}var a=function(e){var t=new Date(e);return r()(t).format("DD-MMM-yyyy hh:mm a")}},46967:function(e,t,n){n.r(t),n.d(t,{default:function(){return W}});var i=n(74165),r=n(15861),o=n(29439),a=n(4942),l=n(72791),d=n(38317),c=n(43486),s=n(41971),u=n(38302),h=n(17447),p=n(26513),v=n(92206),x=n(66556),Z=n(9773),f=n(17631),g=n(46593),j=n(67025),m=n(83837),y=n(85159),k=n(94026),b=n(46169),C=n(20269),S=n(50158),w=n(38596),_=n(71900),A=n(86327),z=n(82971),T=n(79271),M=n(52688),N=n(64673),R=n(74569),L=n.n(R),H=n(78845),P=n(51625),B=(n(96710),n(2703)),E=n(22612),F=n(80184),I=(0,w.Z)((function(e){return{root:{paddingRight:0},inputAdornment:{backgroundColor:"#f5d5da",height:40,maxHeight:40,paddingRight:10,paddingLeft:10,borderTopRightRadius:20,borderBottomRightRadius:20},mainbox:{padding:"21px 0 36px"},devicelistHeading:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",alignItems:"center","& h3":{padding:"1rem 0",color:e.palette.text.black},"& .icon1":(0,a.Z)({height:"20px",paddingRight:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingRight:"7px"}),"& .icon2":(0,a.Z)({height:"20px",paddingLeft:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingLeft:"7px"})},buttonApprove:(0,a.Z)({borderRadius:"5px",minHeight:"34px",color:"rgb(255, 255, 255)",backgroundColor:"rgb(228, 106, 118)",alignItems:"center",justifyContent:"center",fontSize:"14px",lineHeight:"1.5",fontWeight:"500",transition:"0.26s ease",paddingBottom:"3px",textTransform:"capitalize",marginRight:"15px"},"backgroundColor","rgb(3, 201, 215)"),divider:{marginTop:"10px",background:"#F38500"},reactClass:{width:"50px !important",height:"50px !important"}}})),V=(0,d.Z)((function(e){return{root:{"&:nth-of-type(even)":{backgroundColor:"#ffdead87"}}}}))(c.Z);function W(){var e,t=I(),n=(0,l.useState)(!1),a=(0,o.Z)(n,2),d=a[0],w=a[1],R=(0,T.k6)(),W=(0,l.useState)(""),U=(0,o.Z)(W,2),D=U[0],O=U[1],Y=function(){J(!1)},q=(0,l.useState)(!1),K=(0,o.Z)(q,2),G=K[0],J=K[1],Q=function(){w(!1)},X=(0,T.TH)(),$=null===X||void 0===X||null===(e=X.state)||void 0===e?void 0:e.id,ee=(0,l.useState)(""),te=(0,o.Z)(ee,2),ne=(te[0],te[1],(0,l.useState)("")),ie=(0,o.Z)(ne,2),re=(ie[0],ie[1]),oe=(0,l.useState)(),ae=(0,o.Z)(oe,2),le=ae[0],de=ae[1],ce=(0,l.useState)(1),se=(0,o.Z)(ce,2),ue=se[0],he=se[1],pe=(0,l.useState)(!1),ve=(0,o.Z)(pe,2),xe=ve[0],Ze=ve[1],fe=(0,l.useState)([]),ge=(0,o.Z)(fe,2),je=ge[0],me=ge[1],ye=(0,l.useState)(1),ke=(0,o.Z)(ye,2),be=ke[0],Ce=ke[1],Se=(0,l.useState)("".concat(10)),we=(0,o.Z)(Se,2),_e=we[0],Ae=(we[1],window.sessionStorage.getItem("token")),ze=null!==X&&void 0!==X&&X.state?null===X||void 0===X?void 0:X.state:"",Te=ze.titleActivity,Me=ze.titleSubActivity,Ne=ze.Add_send_id;console.log("765726t76234--\x3e>",Me,Te);var Re=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t,n,r,o,a,l,d,c;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,Ze(!0),e.next=4,L()({url:M.Z.listPeriodTracker,method:"POST",headers:{token:Ae},data:{page:"".concat(be),limit:_e,activityId:$}});case 4:(n=e.sent)?(Ze(!1),console.log("ViewsetSubActivityManagement>>",n),me(null===n||void 0===n||null===(r=n.data)||void 0===r||null===(o=r.result)||void 0===o?void 0:o.docs),de(null===n||void 0===n||null===(a=n.data)||void 0===a||null===(l=a.result)||void 0===l?void 0:l.total),he(null===n||void 0===n||null===(d=n.data)||void 0===d||null===(c=d.result)||void 0===c?void 0:c.pages)):404===(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.responseCode)&&(Ze(!1),re(0)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Ze(!1),console.log("error>>",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),Le=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t,n,r,o,a,l,d,c;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,Ze(!0),e.next=4,L()({url:M.Z.listMenstrualHygiene,method:"POST",headers:{token:Ae},data:{page:"".concat(be),limit:_e,activityId:$}});case 4:(n=e.sent)?(Ze(!1),console.log("ViewsetSubActivity--------\x3e>",n),me(null===n||void 0===n||null===(r=n.data)||void 0===r||null===(o=r.result)||void 0===o?void 0:o.docs),de(null===n||void 0===n||null===(a=n.data)||void 0===a||null===(l=a.result)||void 0===l?void 0:l.total),he(null===n||void 0===n||null===(d=n.data)||void 0===d||null===(c=d.result)||void 0===c?void 0:c.pages)):404===(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.responseCode)&&(Ze(!1),re(0)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),Ze(!1),console.log("error>>",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){console.log("6666Add_send_id---\x3e>",Ne),11==Ne?Re():12==Ne?Le():13==Ne||console.log("Not run ListSleepTrainingData")}),[Ne,be]);var He=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ze(!0),e.prev=1,e.next=4,L()({url:M.Z.blockUnblockPeriodTracker,headers:{token:Ae},method:"PUT",params:{_id:D}});case 4:(t=e.sent)&&(Ze(!1),console.log("block activity function--\x3e>",t),w(!1),J(!1),Re()),e.next=14;break;case 8:e.prev=8,e.t0=e.catch(1),Ze(!1),w(!1),J(!1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){}),[be]),(0,F.jsxs)(S.Z,{title:"Activity",children:[xe?(0,F.jsx)(H.Z,{}):"",(0,F.jsxs)(s.Z,{mt:3,children:[(0,F.jsx)(s.Z,{className:t.devicelistHeading,children:(0,F.jsxs)(u.Z,{variant:"h1",className:"headingText",children:["Activity Management "," - ",Te||"Personal Safety "," "," - ",Me||"Sexual abuse"]})}),(0,F.jsx)(h.Z,{className:t.divider}),(0,F.jsxs)(s.Z,{mt:3,display:"flex",justifyContent:"space-between",children:[(0,F.jsx)(p.Z,{variant:"contained",color:"secondary",onClick:function(){return R.push({pathname:"/menstrual-health",state:{_id:$}})},style:{marginRight:"10px"},children:"Back"}),(0,F.jsx)(p.Z,{variant:"contained",color:"primary",onClick:function(){return R.push({pathname:"/period-tracker",search:"Add",state:{_id:Ne,Add_send_id:Ne}})},children:"Add Activity"})]}),(0,F.jsx)(s.Z,{mt:4,children:(0,F.jsxs)(v.Z,{children:[(0,F.jsxs)(x.Z,{children:[(0,F.jsx)(Z.Z,{children:(0,F.jsxs)(c.Z,{className:"".concat(t.tablerow1," tableHead"),children:[(0,F.jsx)(f.Z,{children:"Sr.No"}),(0,F.jsx)(f.Z,{children:"Video Name"}),(0,F.jsx)(f.Z,{children:"Status"}),(0,F.jsx)(f.Z,{children:"Created At"}),(0,F.jsx)(f.Z,{align:"center",children:"Action"})]})}),(0,F.jsx)(g.Z,{children:je&&je.map((function(e,t){return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(V,{children:[(0,F.jsx)(f.Z,{children:t+1}),(0,F.jsx)(f.Z,{children:e.videoName}),(0,F.jsx)(f.Z,{children:e.status}),(0,F.jsx)(f.Z,{children:(0,B.jF)(e.createdAt)}),(0,F.jsxs)(f.Z,{align:"center",children:[(0,F.jsxs)(j.Z,{onClick:function(){return R.push({pathname:"/period-tracker",search:"View",state:{id:null===e||void 0===e?void 0:e._id,Add_send_id:Ne,titleSubActivity:Me,titleActivity:Te}})},children:[console.log("Add_send_id---\x3e>>",Ne),(0,F.jsx)(_.Z,{style:{color:"#F38500"}})]}),"\xa0\xa0",(0,F.jsx)(j.Z,{children:(0,F.jsx)(A.Z,{style:{fontSize:"20px",color:"#F38500",cursor:"pointer"},onClick:function(){return R.push({pathname:"/period-tracker",search:"Edit",state:{id:null===e||void 0===e?void 0:e._id,Add_send_id:Ne}})}})}),"\xa0\xa0","BLOCK"===(null===e||void 0===e?void 0:e.status)?(0,F.jsx)(j.Z,{onClick:function(){return t="".concat(null===e||void 0===e?void 0:e._id),O(t),void J(!0);var t},children:(0,F.jsx)(z.Z,{style:{fontSize:"20px",color:"red",cursor:"pointer"}})}):(0,F.jsx)(j.Z,{onClick:function(){return t="".concat(null===e||void 0===e?void 0:e._id),O(t),void w(!0);var t},children:(0,F.jsx)(z.Z,{style:{fontSize:"20px",color:"green",cursor:"pointer"}})})]})]}),(0,F.jsxs)(m.Z,{open:d,fullWidth:!0,maxWidth:"sm","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,F.jsx)(y.Z,{align:"center",id:"alert-dialog-title",children:(0,F.jsxs)(u.Z,{variant:"h2",children:[" ","Block Activity"]})}),(0,F.jsx)(k.Z,{children:(0,F.jsx)(b.Z,{id:"alert-dialog-description",align:"center",children:(0,F.jsxs)(u.Z,{variant:"h5",children:[" ","Are you sure you want to Block this activity ?"]})})}),(0,F.jsxs)(C.Z,{children:[(0,F.jsx)(p.Z,{onClick:Q,variant:"contained",color:"secondary",children:"No"}),(0,F.jsxs)(p.Z,{variant:"contained",color:"primary",onClick:He,children:["Yes ",xe?(0,F.jsx)(N.Z,{}):""]})]})]}),(0,F.jsxs)(m.Z,{open:G,fullWidth:!0,maxWidth:"sm","aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,F.jsx)(y.Z,{align:"center",id:"alert-dialog-title",children:(0,F.jsxs)(u.Z,{variant:"h2",children:[" ","Unblock Activity"]})}),(0,F.jsx)(k.Z,{children:(0,F.jsx)(b.Z,{id:"alert-dialog-description",align:"center",children:(0,F.jsxs)(u.Z,{variant:"h5",children:[" ","Are you sure you want to Unblock this activity ?"]})})}),(0,F.jsxs)(C.Z,{children:[(0,F.jsx)(p.Z,{onClick:Y,variant:"contained",color:"secondary",children:"No"}),(0,F.jsxs)(p.Z,{variant:"contained",color:"primary",onClick:He,children:["Yes ",xe?(0,F.jsx)(N.Z,{}):""]})]})]})]})}))})]}),0===je.length?(0,F.jsx)(E.Z,{}):"",le&&le>10&&(0,F.jsx)(s.Z,{mb:2,mt:2,style:{width:"100%",display:"flex",justifyContent:"center"},children:(0,F.jsx)(P.Z,{onChange:function(e,t){return Ce(t)},count:parseInt(ue),color:"primary"})})]})})]})]})}},71900:function(e,t,n){var i=n(64836),r=n(75263);t.Z=void 0;var o=r(n(72791)),a=(0,i(n(44894)).default)(o.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=a},82971:function(e,t,n){var i=n(72791),r=n(94327);t.Z=(0,r.Z)(i.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"}),"Block")},86327:function(e,t,n){var i=n(72791),r=n(94327);t.Z=(0,r.Z)(i.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit")}}]);
//# sourceMappingURL=6967.b30b913f.chunk.js.map