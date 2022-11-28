sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Device, Fragment) {
    "use strict";

    return Controller.extend("game.controller.Admin", {
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
        var result = this.byId("admin");
        return result;
      },
      onButtonPress: function (oEvent) {},

      onAddNewCategoryPress: function () {
        var oView = this.getView();
        if (!this.byId("createCategoryPopup")) {
          Fragment.load({
            name: "game.view.Fragments.CreateCategory",
            controller: this,
            id: oView.getId(),
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            var oEntryCtx = oView.getModel().createEntry("/Categories", {
              properties: {
                createdAt: "/Date(1619481600000+0000)/",
                createdBy: "hanna.kaliada@leverx.com",
                modifiedAt: "/Date(1669029021552+0000)/",
                modifiedBy: "anonymous",
                ID: "23311",
              },
            });
            oDialog.setBindingContext(oEntryCtx);
            oDialog.open();
          });
        } else {
          this.byId("createCategoryPopup").open();
        }

        // oView.addDependent(this.oDialog);

        // var oEntryCtx = this._getModel().createEntry("/Categories", {
        //   properties: {
        //     ID: nId,
        //   },
        //   headers: { "Content-ID": nId },
        // });
        // this.oDialog.setBindingContext(oEntryCtx);
        // this.oDialog.open();
      },
      onCreateCategory: function () {
        debugger;
        this.getView().getModel().submitChanges();
        this.byId("createCategoryPopup").close();
      },
      onCancelCategory: function () {
        this.getView().getModel().resetChanges();
        this.byId("createCategoryPopup").close();
      },
    });
  }
);
