sap.ui.define(["sap/ui/core/Control","sap/ui/core/TextAlign","sap/m/Text","sap/m/Button"],function(e,t,s,r){"use strict";return e.extend("game.control.MyControl",{metadata:{properties:{header:"string",subheader:"string",highLight:"boolean",flip:"boolean",src:"string"},events:{onButtonPress:{},onClickCard:{}},aggregations:{image:{type:"sap.m.Image"}}},init:function(){},setHeader:function(e){this.setProperty("header",e,true)},setSrc:function(e){this.setProperty("src",e,true)},setSubheader:function(e){this.setProperty("subheader",e,true)},setHighLight:function(e){this.setProperty("highLight",e,true)},setFlip:function(e){this.setProperty("flip",e,true)},getFlip:function(){const e=this.getProperty("flip");return e},renderer:function(e,n){const i=n.getId().split("--");const o=i[i.length-1].replace(/-[0-9]/g,"");e.openStart("div",n).class("scene").openEnd();e.openStart("div",n).class("card");e.class(`${o}`);if(n.getHighLight()){e.class("highLight")}e.openEnd();e.openStart("div",n).class("card__face").class("card__face--front").openEnd();e.renderControl(new s({text:n.getHeader(),textAlign:t.Center}).addStyleClass("header"));e.openStart("img",n).attr("src",n.getSrc()).class("image").openEnd();e.close("div");e.openStart("div",n).class("card__face").class("card__face--back").openEnd();e.renderControl(new s({text:n.getSubheader(),textAlign:t.Center}).addStyleClass("subheader"));e.renderControl(new r({text:"Spell",press:()=>n.fireEvent("onButtonPress"),width:"7rem"}));e.close("div");e.close("div");e.close("div")},getPageIdName:function(e){const t=e.id.split("--");return t[t.length-1].replace(/-[0-9]/g,"")},onclick:function(e){const t=e.target;const s=t.closest(".card");s.addEventListener("mouseleave",()=>{s.classList.remove("is-flipped");s.classList.remove("highLight")});if(this.getFlip()){s.classList.toggle("is-flipped")}s.classList.toggle("highLight")}})});