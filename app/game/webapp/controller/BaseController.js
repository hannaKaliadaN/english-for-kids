sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("game.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },
    navigateTo: function (sRoute, oParam) {
      this.getRouter().navTo(sRoute, oParam);
    },
    getModel: function () {
      return this.getOwnerComponent().getModel();
    },
    getId() {
      return Number(new Date().getTime().toString().slice(9));
    },
  });
});
