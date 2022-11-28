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

    return Controller.extend("game.controller.Train", {
      onInit: function () {
        // var oDeviceModel = new JSONModel(Device);
        // oDeviceModel.setDefaultBindingMode("OneWay");
        // this.getView().setModel(oDeviceModel, "device");
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
      onTilePress: function (oEvent) {
        var oSource = oEvent.getSource();
        var oContext = oSource.getBindingContext();
        this.getSplitAppObj().toDetail(
          this.createId("pageWord"),
          "slide",
          oContext,
          {}
        );

        this.getSplitAppObj().getDetailPages()[0].setBindingContext(oContext);
        this.getView().getModel("helpModel").setProperty("/isEnabled", true);
      },
      getSplitAppObj: function () {
        var result = this.byId("english");
        return result;
      },
      onButtonPress: function (oEvent) {},
      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      onButtonResultsPress: function () {
        this.navigateTo("Results", {});
      },
      onButtonResultesPress: function () {},
    });
  }
);
