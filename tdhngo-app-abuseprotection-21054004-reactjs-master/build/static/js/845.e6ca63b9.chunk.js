(self.webpackChunkneed_a_web_developer_21043817=self.webpackChunkneed_a_web_developer_21043817||[]).push([[845],{64673:function(e,t,n){"use strict";n(72791);var i=n(41971),r=n(35720),a=n(38317),l=n(80184);t.Z=(0,a.Z)((function(e){return{circularProgress:{color:"green"}}}),{withTheme:!0})((function(e){var t=e.size,n=e.classes;return(0,l.jsx)(i.Z,{color:"secondary.main",pl:1.5,display:"flex",children:(0,l.jsx)(r.Z,{size:t||24,thickness:t?t/5*24:5,className:n.circularProgress})})}))},2703:function(e,t,n){"use strict";n.d(t,{UC:function(){return a},jF:function(){return l}});var i=n(72426),r=n.n(i);function a(e){return"".concat(null===e||void 0===e?void 0:e.slice(0,6),"...").concat(null===e||void 0===e?void 0:e.slice(e.length-4))}var l=function(e){var t=new Date(e);return r()(t).format("DD-MMM-yyyy hh:mm a")}},90332:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return B}});var i=n(74165),r=n(15861),a=n(29439),l=n(4942),o=n(72791),s=n(38596),d=n(41971),c=n(38302),u=n(17447),h=n(13712),p=n(1288),f=n(67025),x=n(66828),m=n(89431),v=n(76782),g=n(76863),j=(n(64673),n(26513)),y=n(92506),Z=n(23853),b=(n(2703),n(79271)),w=(n(56960),n(74569)),S=n.n(w),_=n(52688),k=(n(5282),n(78845)),C=n(96710),N=n(80184),A=(0,s.Z)((function(e){return{select_image:{marginTop:"-20px",textAlign:"center"},subitBtn:{"@media (max-width:514px)":{marginTop:"10px",marginLeft:"-5px"}},NftBreed:{padding:"23px 0 "},formControl:{minWidth:120,width:"100%"},main:{border:"1px solid #F38500",padding:"40px",borderRadius:"15px",backgroundColor:"#FEDDB6"},divider:{marginTop:"10px",background:"#F38500"},textField:{maxWidth:"100%"},image:{cursor:"pointer"},upload:{height:"200px",margin:"16px 0",cursor:"pointer",borderRadius:"20px",position:"relative","& img":{width:"100%",height:"100%",border:"1px solid #F38500",objectFit:"cover"},"& button":{position:"absolute",border:"3px solid black",bottom:0,right:0,backgroundColor:"#fff",color:"#000",fontSize:"15px","&:hover":{backgroundColor:"#fff",border:"3px solid black"},"& input":{width:"100%",height:"100%",position:"absolute",top:"0",left:"0",opacity:0}}},devicelistHeading:{display:"flex",justifyContent:"start",alignItems:"center","& h3":{padding:"1rem 0",color:e.palette.text.black},"& .icon1":(0,l.Z)({height:"20px",paddingRight:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingRight:"7px"}),"& .icon2":(0,l.Z)({height:"20px",paddingLeft:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingLeft:"7px"})},newbtn:{"@media(max-width:400px)":{marginTop:"10px"}}}}));function B(e){var t=A(),n=(0,b.k6)(),l=((0,o.useRef)(null),(0,o.useState)("")),s=(0,a.Z)(l,2),w=(s[0],s[1],(0,o.useState)("")),B=(0,a.Z)(w,2),F=(B[0],B[1],(0,o.useState)()),V=(0,a.Z)(F,2),O=(V[0],V[1],(0,b.TH)()),T=(0,o.useState)("Select"),P=(0,a.Z)(T,2),R=(P[0],P[1],O.state),z=null!==R&&void 0!==R&&R._id?null===R||void 0===R?void 0:R._id:null===R||void 0===R?void 0:R.id,L=(0,o.useState)(!0),U=(0,a.Z)(L,2),D=U[0],E=U[1],M=(0,o.useState)(null),I=(0,a.Z)(M,2),q=I[0],W=I[1],H=(0,o.useState)(""),Y=(0,a.Z)(H,2),$=(Y[0],Y[1],(0,o.useState)()),G=(0,a.Z)($,2),J=G[0],K=G[1],Q=null===R||void 0===R?void 0:R.logo,X=(0,o.useState)(),ee=(0,a.Z)(X,2),te=(ee[0],ee[1],O.search.split("?")[1]),ne=(0,o.useState)(""),ie=(0,a.Z)(ne,2),re=ie[0],ae=ie[1],le=O.state,oe=le.type,se=le.Add_send_id,de=le.titleSubActivity,ce=le.titleActivity;console.log("_imgDeffunctionKey---\x3e>",de,ce);var ue=(0,o.useState)("image"),he=(0,a.Z)(ue,2),pe=(he[0],he[1],(0,o.useState)("")),fe=(0,a.Z)(pe,2),xe=(fe[0],fe[1],g.Ry().shape({title:g.Z_().required("Video name is required").min(2,"Please enter at least 2 characters").max(35,"You can enter only 35 characters")})),me=(0,o.useState)(""),ve=(0,a.Z)(me,2),ge=(ve[0],ve[1]);(0,o.useEffect)((function(){Q&&ge(Q)}),[Q]);var je=(0,o.useState)({_imageurl:"",title:"",content:""}),ye=(0,a.Z)(je,2),Ze=ye[0],be=ye[1];console.log("_initalstate--\x3e>",Ze);var we=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t){var r,a,l;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(!0),r="Add"===te?_.Z.addPeriodTracker:_.Z.editPeriodTracker,(a=new FormData).append("videoName",t.title),a.append("video",null!==q?q:re),e.prev=5,e.next=8,S()({url:r,method:"Add"===te?"POST":"PUT",headers:{token:window.sessionStorage.getItem("token"),"Content-Type":"application/json"},data:a,params:{_id:z}});case 8:(l=e.sent)&&(E(!1),console.log(l),n.push({pathname:"/menstrual-health-list",state:{Add_send_id:se,type:oe}})),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(5),E(!1),console.log("error",e.t0);case 16:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(t){return e.apply(this,arguments)}}(),Se=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t,n,r,a,l,o,s,d,c,u,h,p,f;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,E(!0),e.next=4,S()({url:_.Z.viewPeriodTracker,method:"GET",headers:{token:window.sessionStorage.getItem("token")},params:{_id:z}});case 4:(t=e.sent)&&(E(!1),console.log("res123---\x3e>>",t),K(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.result),f={title:null===t||void 0===t||null===(r=t.data)||void 0===r||null===(a=r.result)||void 0===a?void 0:a.videoName,content:null===t||void 0===t||null===(l=t.data)||void 0===l||null===(o=l.result)||void 0===o?void 0:o.url,_imgDef:null===t||void 0===t||null===(s=t.data)||void 0===s||null===(d=s.result)||void 0===d?void 0:d.url,_imageurl:null===t||void 0===t||null===(c=t.data)||void 0===c||null===(u=c.result)||void 0===u?void 0:u.url},W(null===t||void 0===t||null===(h=t.data)||void 0===h||null===(p=h.result)||void 0===p?void 0:p.url),be(f)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),E(!1),console.log("error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){Se()}),[z]),(0,N.jsxs)(d.Z,{className:t.NftBreed,children:[D?(0,N.jsx)(k.Z,{}):"",(0,N.jsx)(d.Z,{className:t.devicelistHeading,children:(0,N.jsx)(c.Z,{variant:"h1",className:"headingText",children:"".concat(te," Activity")})}),(0,N.jsx)(u.Z,{className:t.divider}),(0,N.jsx)(h.Z,{maxWidth:"md",children:(0,N.jsx)(y.J9,{initialValues:Ze,enableReinitialize:!0,initialStatus:{success:!1,successMsg:""},onSubmit:function(e){return we(e)},validationSchema:xe,children:function(e){var i=e.errors,r=e.handleBlur,a=e.handleChange,l=(e.handleSubmit,e.touched),o=e.values;e.setFieldValue;return(0,N.jsxs)(y.l0,{children:[console.log("Sadqeqacc",o),(0,N.jsxs)(d.Z,{mt:5,mb:2,className:t.main,children:[(0,N.jsxs)(p.Z,{container:!0,spacing:2,children:[(0,N.jsx)(p.Z,{item:!0,md:12,sm:12,lg:12,xs:12,children:(0,N.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsxs)(d.Z,{children:["Add"===te?(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)("figure",{className:t.upload,children:[(0,N.jsx)(C.Z,{url:re||"/images/mentalIll.png",width:"100%",height:"20vh",controls:!0}),(0,N.jsxs)(f.Z,{children:[(0,N.jsx)(Z.Yjd,{}),(0,N.jsx)("input",{type:"file",accept:"image/*, video/*, .mp3,audio/*, docs/*",onChange:function(e){W(e.target.files[0]),ae(URL.createObjectURL(e.target.files[0]))}})]})]})}):"View"===te?(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(C.Z,{url:null!==J&&void 0!==J&&J.url?null===J||void 0===J?void 0:J.url:null===J||void 0===J?void 0:J.video,width:"100%",height:"20vh",controls:!0})}):(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)("figure",{className:t.upload,children:[(0,N.jsx)(C.Z,{url:""===re?q:re,width:"100%",height:"20vh",controls:!0}),(0,N.jsxs)(f.Z,{children:[(0,N.jsx)(Z.Yjd,{}),(0,N.jsx)("input",{type:"file",accept:"image/*, video/*, .mp3,audio/*, docs/*",onChange:function(e){W(e.target.files[0]),ae(URL.createObjectURL(e.target.files[0]))}})]})]})}),"Add"===te?(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(d.Z,{className:t.imgsec,children:(0,N.jsx)(c.Z,{variant:"h6",color:"primary",className:t.select_image,children:"Please select Video"})})}):"View"===te?(0,N.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsx)(c.Z,{variant:"h6",color:"primary",children:"Activity video"})}):(0,N.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,N.jsx)(c.Z,{variant:"h6",color:"primary",children:"Please select Video"})})]})})}),(0,N.jsx)(p.Z,{item:!0,md:12,sm:12,lg:12,xs:12,className:t.image,children:(0,N.jsx)(d.Z,{children:(0,N.jsx)("form",{className:"formBox p-0",autoComplete:"off",children:(0,N.jsx)(x.Z,{variant:"outlined",className:t.formControl,children:(0,N.jsx)(d.Z,{mt:2,children:"Add"===te?(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)(d.Z,{mt:2,children:[(0,N.jsx)(c.Z,{variant:"h6",color:"primary",children:"Video Name :"}),(0,N.jsx)(m.Z,{variant:"outlined",name:"title",type:"text",value:o.title,error:Boolean(l.title&&i.title),onBlur:r,onChange:a,placeholder:"Please enter Title",className:t.textField}),(0,N.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.title&&i.title})]})}):"View"===te?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(c.Z,{variant:"h5",color:"primary",style:{paddingBottom:"8px"},children:"Video Name"}),(0,N.jsx)(d.Z,{children:(0,N.jsx)(m.Z,{disabled:!0,readOnly:!0,variant:"outlined",value:null===J||void 0===J?void 0:J.videoName,inputProps:{readOnly:"true"}})}),(0,N.jsxs)(d.Z,{mt:3,children:[(0,N.jsx)(c.Z,{variant:"h5",color:"primary",style:{paddingBottom:"8px"},children:"Video URL :"}),(0,N.jsx)(m.Z,{readOnly:!0,variant:"outlined",value:null!==J&&void 0!==J&&J.url?null===J||void 0===J?void 0:J.url:null===J||void 0===J?void 0:J.video,inputProps:{readOnly:"true"}})]})]}):(0,N.jsxs)(d.Z,{children:[(0,N.jsx)(c.Z,{variant:"h6",color:"primary",children:"Video Name :"}),(0,N.jsx)(m.Z,{name:"title",error:Boolean(l.title&&i.title),onBlur:r,onChange:a,variant:"outlined",value:null===o||void 0===o?void 0:o.title}),(0,N.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.title&&i.title}),(0,N.jsxs)(d.Z,{mt:2,children:[(0,N.jsx)(c.Z,{variant:"h6",color:"primary",children:"Video URL :"}),(0,N.jsx)(m.Z,{disabled:!0,variant:"outlined",name:"content",type:"text",value:o.content,error:Boolean(l.content&&i.content),onBlur:r,onChange:a,placeholder:"Please enter Content",className:t.textField}),(0,N.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.content&&i.content})]})]})})})})})})]}),(0,N.jsxs)(d.Z,{style:{marginTop:"25px",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:" center"},children:["View"===te?(0,N.jsx)(j.Z,{variant:"contained",color:"secondary",onClick:function(){return n.push({pathname:"/menstrual-health-list",state:{Add_send_id:se,type:oe,titleSubActivity:de,titleActivity:ce}})},className:t.newbtn,children:"Back"}):(0,N.jsx)(j.Z,{variant:"contained",color:"primary",onClick:function(){return n.push({pathname:"/menstrual-health-list",state:{Add_send_id:se,type:oe}})},className:t.newbtn,children:"Cancel"}),"\xa0\xa0","Add"===te?(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(d.Z,{children:(0,N.jsx)(j.Z,{variant:"contained",type:"submit",color:"primary",children:"Submit"})})}):"View"===te?(0,N.jsx)(N.Fragment,{}):(0,N.jsx)(d.Z,{children:(0,N.jsx)(j.Z,{variant:"contained",type:"submit",color:"primary",children:"Update"})})]})]})]})}})})]})}},50077:function(e){var t="undefined"!==typeof Element,n="function"===typeof Map,i="function"===typeof Set,r="function"===typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,l){if(e===l)return!0;if(e&&l&&"object"==typeof e&&"object"==typeof l){if(e.constructor!==l.constructor)return!1;var o,s,d,c;if(Array.isArray(e)){if((o=e.length)!=l.length)return!1;for(s=o;0!==s--;)if(!a(e[s],l[s]))return!1;return!0}if(n&&e instanceof Map&&l instanceof Map){if(e.size!==l.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!l.has(s.value[0]))return!1;for(c=e.entries();!(s=c.next()).done;)if(!a(s.value[1],l.get(s.value[0])))return!1;return!0}if(i&&e instanceof Set&&l instanceof Set){if(e.size!==l.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!l.has(s.value[0]))return!1;return!0}if(r&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(l)){if((o=e.length)!=l.length)return!1;for(s=o;0!==s--;)if(e[s]!==l[s])return!1;return!0}if(e.constructor===RegExp)return e.source===l.source&&e.flags===l.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===l.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===l.toString();if((o=(d=Object.keys(e)).length)!==Object.keys(l).length)return!1;for(s=o;0!==s--;)if(!Object.prototype.hasOwnProperty.call(l,d[s]))return!1;if(t&&e instanceof Element)return!1;for(s=o;0!==s--;)if(("_owner"!==d[s]&&"__v"!==d[s]&&"__o"!==d[s]||!e.$$typeof)&&!a(e[d[s]],l[d[s]]))return!1;return!0}return e!==e&&l!==l}e.exports=function(e,t){try{return a(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}}}]);
//# sourceMappingURL=845.e6ca63b9.chunk.js.map