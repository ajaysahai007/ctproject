"use strict";(self.webpackChunkneed_a_web_developer_21043817=self.webpackChunkneed_a_web_developer_21043817||[]).push([[5462],{55462:function(e,i,t){t.r(i);var n=t(74165),r=t(15861),a=t(29439),s=t(4942),o=t(72791),l=t(38596),d=t(41971),c=t(38302),h=t(17447),g=t(13712),x=t(1288),m=t(79271),p=t(74569),f=t.n(p),u=t(7692),v=t(52688),Z=t(80184),b=[{id:1,title:"BACKGROUND",color:"#828282"},{id:2,title:"Clothing",color:"#828282"},{id:3,title:"Skin",color:"#828282"},{id:4,title:"Headwear",color:"#828282"},{id:5,title:"Body Accessory",color:"#828282"},{id:6,title:"Headphones",color:"#828282"}],j=(0,l.Z)((function(e){return{background:{padding:"23px 0",position:"relative","& .addressBox":{display:"flex",alignItems:"center","& svg":{color:"#fff",marginLeft:"6px",fontSize:"18px",cursor:"pointer"}}},imgBox:{maxWidth:"500px","& img":{borderRadius:"5px",border:"4px solid #1EB808",cursor:"pointer"}},heading:{color:"#fff",fontWeight:"700",fontSize:"30px"},centering:{justifyContent:"center",alignItems:"center"},card:{border:"1px solid #1eb808",borderRadius:"5px",maxWidth:"300px",textAlign:"center",padding:"10px","&:hover":{boxShadow:"0 0 1rem rgb(30 184 8 / 45%), 0 0 0 rgb(30 184 8 / 45%), 0 0 1rem rgb(30 184 8 / 50%), 0 0 4rem rgb(30 184 8 / 40%)",transition:".5s"},"& h4":{color:"#1EB808",fontFamily:"'Saira Semi Condensed', sans-serif",fontWeight:"700",fontSize:"21px",lineHeight:"38px"},"& h5":{color:"#fff",fontSize:"21px",lineHeight:"30px",fontWeight:"400",fontFamily:"'Saira Semi Condensed', sans-serif"}},Featuring:{display:"flex",justifyContent:"start",alignItems:"center","& .icon1":(0,s.Z)({height:"20px",paddingRight:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingRight:"7px"}),"& .icon2":(0,s.Z)({height:"20px",paddingLeft:"20px"},e.breakpoints.only("xs"),{width:"50px",height:"8px",paddingLeft:"7px"})},divider:{marginTop:"30px"}}}));i.default=function(){var e,i=o.useState(b),t=(0,a.Z)(i,2),s=t[0],l=(t[1],o.useState(!1)),p=(0,a.Z)(l,2),k=(p[0],p[1],j()),w=((0,m.k6)(),(0,m.TH)().state);console.log("fjksdukfhbgjg",w);var N=(0,o.useState)([]),S=(0,a.Z)(N,2),y=S[0],C=S[1],F=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f()({method:"GET",url:v.Z.viewNFT+w,headers:{token:window.sessionStorage.getItem("token")}});case 3:200===(i=e.sent).data.statusCode&&(console.log("Check----------",i),C(i.data.result)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){w&&F()}),[w]),(0,Z.jsxs)(d.Z,{className:k.background,children:[(0,Z.jsxs)(d.Z,{className:k.Featuring,children:[(0,Z.jsx)("img",{src:"images/Vector 83.png",className:"icon1"}),(0,Z.jsx)(c.Z,{variant:"h1",className:"headingText",children:"NFT Detail"}),(0,Z.jsx)("img",{src:"images/Vector 80.png",className:"icon2"})]}),(0,Z.jsx)(h.Z,{className:k.divider}),(0,Z.jsx)(g.Z,{style:{marginTop:"32px"},children:(0,Z.jsxs)(x.Z,{container:!0,spacing:6,children:[(0,Z.jsx)(x.Z,{item:!0,xs:12,sm:12,md:5,lg:5,className:k.centering,children:(0,Z.jsx)(d.Z,{className:k.imgBox,children:(0,Z.jsx)("img",{src:y.mediaFile,alt:"shoes images",width:"100%"})})}),(0,Z.jsxs)(x.Z,{item:!0,xs:12,sm:12,md:7,lg:7,children:[(0,Z.jsx)(c.Z,{variant:"h3",className:k.heading,children:y.title}),(0,Z.jsxs)(d.Z,{className:"addressBox",mb:3,mt:1,children:[(0,Z.jsx)(c.Z,{variant:"body1",children:null===(e=y.userId)||void 0===e?void 0:e.walletAddress}),(0,Z.jsx)(u.LhG,{})]}),(0,Z.jsx)(x.Z,{container:!0,spacing:2,children:s.map((function(e){return(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)(x.Z,{item:!0,xs:12,sm:6,md:6,lg:6,children:(0,Z.jsxs)(d.Z,{className:k.card,children:[(0,Z.jsx)(c.Z,{variant:"h4",children:e.title}),(0,Z.jsx)(c.Z,{variant:"h5",children:e.color})]})})})}))})]})]})})]})}},17447:function(e,i,t){var n=t(87462),r=t(45987),a=t(72791),s=t(28182),o=t(38317),l=t(13108),d=a.forwardRef((function(e,i){var t=e.absolute,o=void 0!==t&&t,l=e.classes,d=e.className,c=e.component,h=void 0===c?"hr":c,g=e.flexItem,x=void 0!==g&&g,m=e.light,p=void 0!==m&&m,f=e.orientation,u=void 0===f?"horizontal":f,v=e.role,Z=void 0===v?"hr"!==h?"separator":void 0:v,b=e.variant,j=void 0===b?"fullWidth":b,k=(0,r.Z)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return a.createElement(h,(0,n.Z)({className:(0,s.Z)(l.root,d,"fullWidth"!==j&&l[j],o&&l.absolute,x&&l.flexItem,p&&l.light,"vertical"===u&&l.vertical),role:Z,ref:i},k))}));i.Z=(0,o.Z)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:(0,l.Fq)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(d)}}]);
//# sourceMappingURL=5462.cf76515f.chunk.js.map