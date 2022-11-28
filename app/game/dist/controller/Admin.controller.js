sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/Device","sap/ui/core/Fragment"],function(e,t,n,o){"use strict";return e.extend("game.controller.Admin",{onInit:function(){},onAfterRendering:function(){},getModel:function(){return this.getOwnerComponent().getModel()},getRouter:function(){return this.getOwnerComponent().getRouter()},navigateTo:function(e,t){this.getRouter().navTo(e,t)},onTilePress:function(e){var t=e.getSource();var n=t.getBindingContext();this.getSplitAppObj().toDetail(this.createId("pageWord"),"slide",n,{});this.getSplitAppObj().getDetailPages()[0].setBindingContext(n);this.getView().getModel("helpModel").setProperty("/isEnabled",true)},getSplitAppObj:function(){var e=this.byId("admin");return e},onButtonPress:function(e){},onAddNewCategoryPress:function(){var e=this.getView();if(!this.byId("createCategoryPopup")){o.load({name:"game.view.Fragments.CreateCategory",controller:this,id:e.getId()}).then(function(t){e.addDependent(t);var n=e.getModel().createEntry("/Categories",{properties:{createdAt:"/Date(1619481600000+0000)/",createdBy:"hanna.kaliada@leverx.com",modifiedAt:"/Date(1669029021552+0000)/",modifiedBy:"anonymous",ID:"23311"}});t.setBindingContext(n);t.open()})}else{this.byId("createCategoryPopup").open()}},onCreateCategory:function(){debugger;this.getView().getModel().submitChanges();this.byId("createCategoryPopup").close()},onCancelCategory:function(){this.getView().getModel().resetChanges();this.byId("createCategoryPopup").close()}})});