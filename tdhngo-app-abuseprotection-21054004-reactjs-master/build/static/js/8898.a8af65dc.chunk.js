(self.webpackChunkneed_a_web_developer_21043817=self.webpackChunkneed_a_web_developer_21043817||[]).push([[8898],{64673:function(e,t,n){"use strict";n(72791);var r=n(41971),i=n(35720),a=n(38317),l=n(80184);t.Z=(0,a.Z)((function(e){return{circularProgress:{color:"green"}}}),{withTheme:!0})((function(e){var t=e.size,n=e.classes;return(0,l.jsx)(r.Z,{color:"secondary.main",pl:1.5,display:"flex",children:(0,l.jsx)(i.Z,{size:t||24,thickness:t?t/5*24:5,className:n.circularProgress})})}))},2703:function(e,t,n){"use strict";n.d(t,{UC:function(){return a},jF:function(){return l}});var r=n(72426),i=n.n(r);function a(e){return"".concat(null===e||void 0===e?void 0:e.slice(0,6),"...").concat(null===e||void 0===e?void 0:e.slice(e.length-4))}var l=function(e){var t=new Date(e);return i()(t).format("DD-MMM-yyyy hh:mm a")}},91193:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var r=n(74165),i=n(15861),a=n(29439),l=n(4942),o=n(72791),s=n(38596),d=n(41971),c=n(38302),u=n(17447),p=n(13712),h=n(1288),x=n(67025),f=n(66828),m=n(89431),v=n(76782),g=n(76863),j=(n(64673),n(26513)),y=n(92506),Z=n(23853),b=(n(2703),n(79271)),w=(n(56960),n(74569)),_=n.n(w),S=n(52688),C=(n(5282),n(78845)),k=n(96710),A=n(80184),B=(0,s.Z)((function(e){return{select_image:{marginTop:"-20px",textAlign:"center"},subitBtn:{"@media (max-width:514px)":{marginTop:"10px",marginLeft:"-5px"}},NftBreed:{padding:"23px 0 "},formControl:{minWidth:120,width:"100%"},main:{border:"1px solid #F38500",padding:"40px",borderRadius:"15px",backgroundColor:"#FEDDB6"},divider:{marginTop:"10px",background:"#F38500"},textField:{maxWidth:"100%"},image:{cursor:"pointer"},upload:{height:"200px",margin:"16px 0",cursor:"pointer",borderRadius:"20px",position:"relative","& img":{width:"100%",height:"100%",border:"1px solid #F38500",objectFit:"cover"},"& button":{position:"absolute",border:"3px solid black",bottom:0,right:0,backgroundColor:"#fff",color:"#000",fontSize:"15px","&:hover":{backgroundColor:"#fff",border:"3px solid black"},"& input":{width:"100%",height:"100%",position:"absolute",top:"0",left:"0",opacity:0}}},devicelistHeading:{display:"flex",justifyContent:"start",alignItems:"center","& h3":{padding:"1rem 0",color:e.palette.text.black},"& .icon1":(0,l.Z)({height:"20px",paddingRight:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingRight:"7px"}),"& .icon2":(0,l.Z)({height:"20px",paddingLeft:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingLeft:"7px"})},newbtn:{"@media(max-width:400px)":{marginTop:"10px"}}}}));function N(e){var t=B(),n=(0,b.k6)(),l=((0,o.useRef)(null),(0,o.useState)("")),s=(0,a.Z)(l,2),w=(s[0],s[1],(0,o.useState)("")),N=(0,a.Z)(w,2),F=(N[0],N[1],(0,o.useState)()),O=(0,a.Z)(F,2),P=(O[0],O[1],(0,b.TH)()),T=(0,o.useState)("Select"),R=(0,a.Z)(T,2),V=(R[0],R[1],P.state),z=null!==V&&void 0!==V&&V._id?null===V||void 0===V?void 0:V._id:null===V||void 0===V?void 0:V.id,D=(0,o.useState)(!0),M=(0,a.Z)(D,2),L=M[0],U=M[1],E=(0,o.useState)(null),W=(0,a.Z)(E,2),q=W[0],I=W[1],Y=(0,o.useState)(""),H=(0,a.Z)(Y,2),$=(H[0],H[1],(0,o.useState)()),G=(0,a.Z)($,2),J=G[0],K=G[1],Q=null===V||void 0===V?void 0:V.logo,X=(0,o.useState)(),ee=(0,a.Z)(X,2),te=(ee[0],ee[1],P.search.split("?")[1]),ne=(0,o.useState)(""),re=(0,a.Z)(ne,2),ie=re[0],ae=re[1],le=P.state,oe=le.type,se=le.Add_send_id;console.log("_imgDeffunctionKey---\x3e>",se);var de=(0,o.useState)("image"),ce=(0,a.Z)(de,2),ue=(ce[0],ce[1],(0,o.useState)("")),pe=(0,a.Z)(ue,2),he=(pe[0],pe[1],g.Ry().shape({title:g.Z_().required("Title name is required").min(2,"Please enter at least 2 characters").max(35,"You can enter only 35 characters"),content:g.Z_().required("Content is required").min(2,"Please enter at least 2 characters").max(35,"You can enter only 35 characters")})),xe=(0,o.useState)(""),fe=(0,a.Z)(xe,2),me=(fe[0],fe[1]);(0,o.useEffect)((function(){Q&&me(Q)}),[Q]);var ve=(0,o.useState)({_imageurl:"",title:"",content:""}),ge=(0,a.Z)(ve,2),je=ge[0],ye=ge[1];console.log("_initalstate--\x3e>",je);var Ze=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){var i,a,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(!0),i="Add"===te?S.Z.addMentalAndWellBeingData:S.Z.editMentalAndWellBeingData,(a=new FormData).append("article_name",t.title),a.append("type",oe),a.append("content",t.content),a.append("video",null!==q?q:ie),e.prev=7,e.next=10,_()({url:i,method:"Add"===te?"POST":"PUT",headers:{token:window.sessionStorage.getItem("token"),"Content-Type":"application/json"},data:a,params:{_id:se}});case 10:(l=e.sent)&&(U(!1),console.log(l),n.push({pathname:"/mental-well-being",state:{Add_send_id:se,type:oe}})),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),U(!1),console.log("error",e.t0);case 18:case"end":return e.stop()}}),e,null,[[7,14]])})));return function(t){return e.apply(this,arguments)}}(),be=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n,i,a,l,o,s,d,c,u,p,h,x;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,U(!0),e.next=4,_()({url:S.Z.viewMentalAndWellBeingData,method:"GET",headers:{token:window.sessionStorage.getItem("token")},params:{_id:z}});case 4:(t=e.sent)&&(U(!1),console.log("res123---\x3e>>",t),K(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.result),x={title:null===t||void 0===t||null===(i=t.data)||void 0===i||null===(a=i.result)||void 0===a?void 0:a.article_name,content:null===t||void 0===t||null===(l=t.data)||void 0===l||null===(o=l.result)||void 0===o?void 0:o.content,_imgDef:null===t||void 0===t||null===(s=t.data)||void 0===s||null===(d=s.result)||void 0===d?void 0:d.url,_imageurl:null===t||void 0===t||null===(c=t.data)||void 0===c||null===(u=c.result)||void 0===u?void 0:u.url},I(null===t||void 0===t||null===(p=t.data)||void 0===p||null===(h=p.result)||void 0===h?void 0:h.url),ye(x)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),U(!1),console.log("error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){be()}),[z]),(0,A.jsxs)(d.Z,{className:t.NftBreed,children:[L?(0,A.jsx)(C.Z,{}):"",(0,A.jsx)(d.Z,{className:t.devicelistHeading,children:(0,A.jsx)(c.Z,{variant:"h1",className:"headingText",children:"".concat(te," Activity")})}),(0,A.jsx)(u.Z,{className:t.divider}),(0,A.jsx)(p.Z,{maxWidth:"md",children:(0,A.jsx)(y.J9,{initialValues:je,enableReinitialize:!0,initialStatus:{success:!1,successMsg:""},onSubmit:function(e){return Ze(e)},validationSchema:he,children:function(e){var r=e.errors,i=e.handleBlur,a=e.handleChange,l=(e.handleSubmit,e.touched),o=e.values;e.setFieldValue;return(0,A.jsxs)(y.l0,{children:[console.log("Sadqeqacc",o),(0,A.jsxs)(d.Z,{mt:5,mb:2,className:t.main,children:[(0,A.jsxs)(h.Z,{container:!0,spacing:2,children:[(0,A.jsx)(h.Z,{item:!0,md:12,sm:12,lg:12,xs:12,children:(0,A.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,A.jsxs)(d.Z,{children:["Add"===te?(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)("figure",{className:t.upload,children:[(0,A.jsx)(k.Z,{url:ie||"/images/mentalIll.png",width:"100%",height:"20vh",controls:!0}),(0,A.jsxs)(x.Z,{children:[(0,A.jsx)(Z.Yjd,{}),(0,A.jsx)("input",{type:"file",accept:"image/*, video/*, .mp3,audio/*, docs/*",onChange:function(e){I(e.target.files[0]),ae(URL.createObjectURL(e.target.files[0]))}})]})]})}):"View"===te?(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(k.Z,{url:null!==J&&void 0!==J&&J.url?null===J||void 0===J?void 0:J.url:null===J||void 0===J?void 0:J.video,width:"100%",height:"20vh",controls:!0})}):(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)("figure",{className:t.upload,children:[(0,A.jsx)(k.Z,{url:""===ie?q:ie,width:"100%",height:"20vh",controls:!0}),(0,A.jsxs)(x.Z,{children:[(0,A.jsx)(Z.Yjd,{}),(0,A.jsx)("input",{type:"file",accept:"image/*, video/*, .mp3,audio/*, docs/*",onChange:function(e){I(e.target.files[0]),ae(URL.createObjectURL(e.target.files[0]))}})]})]})}),"Add"===te?(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(d.Z,{className:t.imgsec,children:(0,A.jsx)(c.Z,{variant:"h6",color:"primary",className:t.select_image,children:"Please select Video"})})}):"View"===te?(0,A.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Activity video"})}):(0,A.jsx)(d.Z,{style:{display:"flex",justifyContent:"center",width:"100%"},children:(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Please select Video"})})]})})}),(0,A.jsx)(h.Z,{item:!0,md:12,sm:12,lg:12,xs:12,className:t.image,children:(0,A.jsx)(d.Z,{children:(0,A.jsx)("form",{className:"formBox p-0",autoComplete:"off",children:(0,A.jsx)(f.Z,{variant:"outlined",className:t.formControl,children:(0,A.jsx)(d.Z,{mt:2,children:"Add"===te?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(d.Z,{mt:2,children:[(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Artical Name :"}),(0,A.jsx)(m.Z,{variant:"outlined",name:"title",type:"text",value:o.title,error:Boolean(l.title&&r.title),onBlur:i,onChange:a,placeholder:"Please enter Title",className:t.textField}),(0,A.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.title&&r.title})]}),(0,A.jsxs)(d.Z,{mt:2,children:[(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Content :"}),(0,A.jsx)(m.Z,{variant:"outlined",name:"content",type:"text",value:o.content,error:Boolean(l.content&&r.content),onBlur:i,onChange:a,placeholder:"Please enter Content",className:t.textField}),(0,A.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.content&&r.content})]})]}):"View"===te?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(c.Z,{variant:"h5",color:"primary",style:{paddingBottom:"8px"},children:"Article Name"}),(0,A.jsx)(d.Z,{children:(0,A.jsx)(m.Z,{disabled:!0,readOnly:!0,variant:"outlined",value:null===J||void 0===J?void 0:J.article_name,inputProps:{readOnly:"true"}})}),(0,A.jsxs)(d.Z,{mt:3,children:[(0,A.jsx)(c.Z,{variant:"h5",color:"primary",style:{paddingBottom:"8px"},children:"Content"}),(0,A.jsx)(d.Z,{children:(0,A.jsx)(m.Z,{disabled:!0,readOnly:!0,variant:"outlined",value:null===J||void 0===J?void 0:J.content,inputProps:{readOnly:"true"}})})]}),(0,A.jsxs)(d.Z,{mt:3,children:[(0,A.jsx)(c.Z,{variant:"h5",color:"primary",style:{paddingBottom:"8px"},children:"Video URL :"}),(0,A.jsx)(m.Z,{readOnly:!0,variant:"outlined",value:null!==J&&void 0!==J&&J.url?null===J||void 0===J?void 0:J.url:null===J||void 0===J?void 0:J.video,inputProps:{readOnly:"true"}})]})]}):(0,A.jsxs)(d.Z,{children:[(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Article Name :"}),(0,A.jsx)(m.Z,{name:"title",error:Boolean(l.title&&r.title),onBlur:i,onChange:a,variant:"outlined",value:null===o||void 0===o?void 0:o.title}),(0,A.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.title&&r.title}),(0,A.jsxs)(d.Z,{mt:2,children:[(0,A.jsx)(c.Z,{variant:"h6",color:"primary",children:"Content :"}),(0,A.jsx)(m.Z,{variant:"outlined",name:"content",type:"text",value:o.content,error:Boolean(l.content&&r.content),onBlur:i,onChange:a,placeholder:"Please enter Content",className:t.textField}),(0,A.jsx)(v.Z,{error:!0,style:{margin:"0px",fontSize:"12px"},children:l.content&&r.content})]})]})})})})})})]}),(0,A.jsxs)(d.Z,{style:{marginTop:"25px",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:" center"},children:["View"===te?(0,A.jsx)(j.Z,{variant:"contained",color:"secondary",onClick:function(){return n.push({pathname:"/mental-well-being",state:{Add_send_id:"22",type:oe}})},className:t.newbtn,children:"Back"}):(0,A.jsx)(j.Z,{variant:"contained",color:"primary",onClick:function(){return n.push({pathname:"/mental-well-being",state:{Add_send_id:"22",type:oe}})},className:t.newbtn,children:"Cancel"}),"\xa0\xa0","Add"===te?(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(d.Z,{children:(0,A.jsx)(j.Z,{variant:"contained",type:"submit",color:"primary",children:"Submit"})})}):"View"===te?(0,A.jsx)(A.Fragment,{}):(0,A.jsx)(d.Z,{children:(0,A.jsx)(j.Z,{variant:"contained",type:"submit",color:"primary",children:"Update"})})]})]})]})}})})]})}},50077:function(e){var t="undefined"!==typeof Element,n="function"===typeof Map,r="function"===typeof Set,i="function"===typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,l){if(e===l)return!0;if(e&&l&&"object"==typeof e&&"object"==typeof l){if(e.constructor!==l.constructor)return!1;var o,s,d,c;if(Array.isArray(e)){if((o=e.length)!=l.length)return!1;for(s=o;0!==s--;)if(!a(e[s],l[s]))return!1;return!0}if(n&&e instanceof Map&&l instanceof Map){if(e.size!==l.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!l.has(s.value[0]))return!1;for(c=e.entries();!(s=c.next()).done;)if(!a(s.value[1],l.get(s.value[0])))return!1;return!0}if(r&&e instanceof Set&&l instanceof Set){if(e.size!==l.size)return!1;for(c=e.entries();!(s=c.next()).done;)if(!l.has(s.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(l)){if((o=e.length)!=l.length)return!1;for(s=o;0!==s--;)if(e[s]!==l[s])return!1;return!0}if(e.constructor===RegExp)return e.source===l.source&&e.flags===l.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===l.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===l.toString();if((o=(d=Object.keys(e)).length)!==Object.keys(l).length)return!1;for(s=o;0!==s--;)if(!Object.prototype.hasOwnProperty.call(l,d[s]))return!1;if(t&&e instanceof Element)return!1;for(s=o;0!==s--;)if(("_owner"!==d[s]&&"__v"!==d[s]&&"__o"!==d[s]||!e.$$typeof)&&!a(e[d[s]],l[d[s]]))return!1;return!0}return e!==e&&l!==l}e.exports=function(e,t){try{return a(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}}}]);
//# sourceMappingURL=8898.a8af65dc.chunk.js.map