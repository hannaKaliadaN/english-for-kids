sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Device) {
    "use strict";

    return Controller.extend("game.controller.Results", {
      onInit: function () {
      },

      onAfterRendering: function () {},
      getModel: function () {
        return this.getOwnerComponent().getModel();
      },
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },
      navigateTo: function (sRoute, oParam) {
        this.getRouter().navTo(sRoute, oParam);
      },
      onMainPagePress:function(){
        this.navigateTo("Categories", {})
      }
    });
  }
);
