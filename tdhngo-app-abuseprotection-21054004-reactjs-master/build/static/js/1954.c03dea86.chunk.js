"use strict";(self.webpackChunkneed_a_web_developer_21043817=self.webpackChunkneed_a_web_developer_21043817||[]).push([[1954],{64673:function(e,t,n){n(72791);var r=n(41971),i=n(35720),o=n(38317),a=n(80184);t.Z=(0,o.Z)((function(e){return{circularProgress:{color:"green"}}}),{withTheme:!0})((function(e){var t=e.size,n=e.classes;return(0,a.jsx)(r.Z,{color:"secondary.main",pl:1.5,display:"flex",children:(0,a.jsx)(i.Z,{size:t||24,thickness:t?t/5*24:5,className:n.circularProgress})})}))},51040:function(e,t,n){n.d(t,{Z:function(){return E}});var r=n(74165),i=n(15861),o=n(29439),a=n(38317),s=n(43486),c=n(41971),l=n(92206),d=n(66556),u=n(9773),h=n(17631),x=n(46593),p=n(67025),Z=n(38302),f=n(26513),g=n(71900),v=n(63401),j=n(21079),m=n(72791),b=n(64673),k=n(74569),y=n.n(k),S=n(2703),w=n(22612),C=n(57407),D=n(79271),_=n(83837),I=n(20269),N=n(94026),B=n(46169),F=n(85159),R=n(11412),T=n(52688),z=n(80184),W=(0,v.Z)((function(e){return{dengerous:{},tablecell:{width:"200px"},tokenouter:{display:"flex",justifyContent:"space-between",alignItems:"center"},headingSection:{"& h3":{padding:"1rem 0",fontSize:"50px"}},currencyBox:{height:"20px",width:"100%",background:"#00dcff40",display:"flex",justifyContent:"center",alignItems:"center"},tokenheading:{width:"100px","& h5":{fontSize:"15px",fontWeight:"300",width:"150px"},"& h6":{fontSize:"12px",fontWeight:"200"}},actionIcons:{display:"flex"},devicelistHeading:{"& h3":{padding:"0px 0 10px 0"}},tablerow:{"& th":{color:e.palette.text.black},"& td":{color:e.palette.text.black}},iconcolor:{"& svg":{fontSize:"25px"}},mainbox:{"& p":{color:"black"},"& .tableHead":{backgroundColor:"#1EB808","& th":{color:"#fff"}}}}})),A=(0,a.Z)((function(e){return{root:{"&:nth-of-type(even)":{backgroundColor:"#ffdead87"}}}}))(s.Z);function E(e){var t=m.useState(!1),n=(0,o.Z)(t,2),a=n[0],v=n[1],k=(0,D.k6)(),E=(0,m.useState)(),H=(0,o.Z)(E,2),M=(H[0],H[1],function(){v(!1)}),U=(0,m.useState)(),L=(0,o.Z)(U,2),P=L[0],V=L[1],O=(0,m.useState)(),Y=(0,o.Z)(O,2),q=Y[0],G=Y[1],J=(0,m.useState)(1),K=(0,o.Z)(J,2),Q=K[0],X=(K[1],(0,m.useState)()),$=(0,o.Z)(X,2),ee=$[0],te=$[1],ne=(0,m.useState)(),re=(0,o.Z)(ne,2),ie=re[0],oe=re[1],ae=(0,m.useState)(),se=(0,o.Z)(ae,2),ce=se[0],le=se[1],de=(0,m.useState)(1),ue=(0,o.Z)(de,2),he=(ue[0],ue[1],(0,m.useState)(0)),xe=(0,o.Z)(he,2),pe=(xe[0],xe[1],(0,m.useState)([])),Ze=(0,o.Z)(pe,2),fe=Ze[0],ge=Ze[1],ve=(0,m.useState)(!1),je=(0,o.Z)(ve,2),me=je[0],be=je[1],ke=(0,m.useState)(""),ye=(0,o.Z)(ke,2),Se=ye[0],we=ye[1],Ce=(0,m.useState)(!1),De=(0,o.Z)(Ce,2),_e=De[0],Ie=De[1],Ne=(0,m.useState)("All Users"),Be=(0,o.Z)(Ne,2),Fe=Be[0],Re=Be[1],Te=(0,m.useState)("".concat(10)),ze=(0,o.Z)(Te,2),We=ze[0],Ae=(ze[1],(0,m.useState)("Select Category")),Ee=(0,o.Z)(Ae,2),He=Ee[0],Me=Ee[1],Ue=(0,m.useState)("Select"),Le=(0,o.Z)(Ue,2),Pe=Le[0],Ve=Le[1],Oe=W(),Ye=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,be(!0),e.next=4,y()({url:T.Z.listResource,method:"POST",headers:{token:window.sessionStorage.getItem("token")},data:{page:"".concat(Q),limit:We,search:ce,states:P,districs:q,fromDate:ie,toDate:ee}});case 4:(t=e.sent)&&(ge(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(i=n.result)||void 0===i?void 0:i.docs),be(!1),console.log("res----222",t)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),be(!1),console.log("error--",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),qe=window.sessionStorage.getItem("token"),Ge=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,be(!0),e.next=4,y()({url:T.Z.deleteResource,method:"DELETE",headers:{token:qe},data:{resourceId:Se}});case 4:200===(null===(n=e.sent)||void 0===n||null===(t=n.data)||void 0===t?void 0:t.responseCode)&&(be(!1),console.log(""),Ye(),v(!1)),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),be(!1),console.log("error--",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return(0,m.useEffect)((function(){Ye()}),[]),(0,z.jsxs)(c.Z,{className:Oe.mainbox,children:[(0,z.jsx)(R.Z,{ListResourchFunction:Ye,_resourchlist:fe,type:"resourceManagement",search:ce,setSearch:le,states:P,setStates:V,destrict:q,setDistrict:G,openUserBlockUnblock:_e,setOpenUserBlockUnblick:Ie,toDate:ee,settoDate:te,fromDate:ie,setfromDate:oe,setusertype:Re,usertype:Fe,currentvalue:He,setCurrentValue:Me,currentvalue1:Pe,setCurrentValue1:Ve}),(0,z.jsx)(l.Z,{children:(0,z.jsxs)(d.Z,{style:{minWidth:"900px"},children:[(0,z.jsx)(u.Z,{children:(0,z.jsxs)(s.Z,{className:"".concat(Oe.tablerow1," tableHead"),children:[(0,z.jsx)(h.Z,{style:{width:"50px",padding:"11px"},children:"Sr.No"}),(0,z.jsx)(h.Z,{children:"Image"}),(0,z.jsx)(h.Z,{children:"Title"}),(0,z.jsx)(h.Z,{children:"Created Date & Time"}),(0,z.jsx)(h.Z,{children:"Category Name"}),(0,z.jsx)(h.Z,{align:"center",children:"Action"})]})}),(0,z.jsx)(x.Z,{children:fe&&fe.map((function(e,t){var n;return(0,z.jsxs)(A,{className:Oe.tablerow,children:[(0,z.jsx)(h.Z,{children:t+1}),(0,z.jsx)(h.Z,{children:(0,z.jsx)(c.Z,{mt:1,children:(0,z.jsx)("img",{src:e.image,style:{width:"45px",height:"45px",borderRadius:"50%",objectFit:"cover"}})})}),(0,z.jsx)(h.Z,{children:(0,z.jsx)("div",{dangerouslySetInnerHTML:{__html:e.title}})}),(0,z.jsx)(h.Z,{children:(0,S.jF)(e.createdAt)}),(0,z.jsx)(h.Z,{children:null===e||void 0===e||null===(n=e.categoryId)||void 0===n?void 0:n.name}),(0,z.jsxs)(h.Z,{align:"center",children:[(0,z.jsx)(p.Z,{children:(0,z.jsx)(g.Z,{onClick:function(){return k.push({pathname:"/add-resource",search:"View",state:{id:null===e||void 0===e?void 0:e._id}})},style:{color:"#F38500",cursor:"pointer"}})}),(0,z.jsx)(p.Z,{children:(0,z.jsx)(j.Z,{style:{color:"#F38500"},onClick:function(){return k.push({pathname:"/add-resource",search:"Edit",state:{id:null===e||void 0===e?void 0:e._id}})}})}),(0,z.jsx)(p.Z,{children:(0,z.jsx)(C.Z,{style:{color:"#F38500"},onClick:function(){return t="".concat(null===e||void 0===e?void 0:e._id),we(t),void v(!0);var t}})})]})]})}))})]})}),0===fe.length&&(0,z.jsx)(w.Z,{}),(0,z.jsxs)(_.Z,{open:a,fullWidth:!0,maxWidth:"sm",onClose:M,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,z.jsx)(F.Z,{align:"center",id:"alert-dialog-title",children:(0,z.jsx)(Z.Z,{variant:"h2",children:"Delete Resource"})}),(0,z.jsx)(N.Z,{children:(0,z.jsx)(B.Z,{id:"alert-dialog-description",align:"center",children:(0,z.jsxs)(Z.Z,{variant:"h5",children:[" ","Are you sure you want to delete this resource?"]})})}),(0,z.jsxs)(I.Z,{children:[(0,z.jsx)(f.Z,{onClick:M,variant:"contained",color:"secondary",children:"No"}),(0,z.jsxs)(f.Z,{onClick:Ge,variant:"contained",color:"primary",children:["Yes ",me?(0,z.jsx)(b.Z,{}):""]})]})]})]})}},2703:function(e,t,n){n.d(t,{UC:function(){return o},jF:function(){return a}});var r=n(72426),i=n.n(r);function o(e){return"".concat(null===e||void 0===e?void 0:e.slice(0,6),"...").concat(null===e||void 0===e?void 0:e.slice(e.length-4))}var a=function(e){var t=new Date(e);return i()(t).format("DD-MMM-yyyy hh:mm a")}},71954:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=n(4942),i=(n(72791),n(38596)),o=n(41971),a=n(38302),s=n(50158),c=n(51040),l=n(79271),d=(n(74569),n(80184)),u=(0,i.Z)((function(e){return{mainBox:{color:"#fff",padding:"23px 0 36px","& button":{"&.active":{background:" linear-gradient(272.26deg, #DC668F 36.78%, #DA4378 86.13%)",color:"#fff",border:"2px solid #DE337A "}},"& p":{fontSize:"16px",textTransform:"uppercase",color:"black"}},lockddataBtn:{margin:"20px 0px 30px",paddingBottom:"30px",borderBottom:"1px solid #16182e",textAlign:"center"},lockddata:{"& label":{fontSize:"16px",fontWeight:800},"& .output":{fontWeight:300,color:"#ccc"}},devicelistHeading:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",alignItems:"center","& .icon1":(0,r.Z)({height:"20px",paddingRight:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingRight:"7px"}),"& .icon2":(0,r.Z)({height:"20px",paddingLeft:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingLeft:"7px"})},divider:{marginTop:"10px",backgroundColor:"#F38500"}}}));function h(){var e=u();(0,l.k6)();return(0,d.jsx)(s.Z,{title:"Resource",children:(0,d.jsxs)(o.Z,{className:e.mainBox,children:[(0,d.jsx)(o.Z,{className:e.devicelistHeading,children:(0,d.jsx)(a.Z,{variant:"h1",className:"headingText",children:"Resource Management"})}),(0,d.jsx)(o.Z,{mt:3,mb:3,children:(0,d.jsx)(c.Z,{})})]})})}}}]);
//# sourceMappingURL=1954.c03dea86.chunk.js.map