sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Device, Fragment, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("game.controller.Admin", {
      onInit: function () {},

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
        this.getSplitAppObj().toDetail(this.createId("pageWord"), "slide", oContext, {});
        this.getSplitAppObj().getCurrentDetailPage().setBindingContext(oContext);
        this.getView().getModel("helpModel").setProperty("/isVisible", true);
      },
      getSplitAppObj: function () {
        return this.byId("admin");
      },
      getId() {
        return Number(new Date().getTime().toString().slice(9));
      },
      onAddNewCategoryPress: function () {
        var oView = this.getView();
        let id = this.getId();
        if (!this.byId("createCategoryPopup")) {
          Fragment.load({
            name: "game.view.Fragments.CreateCategory",
            controller: this,
            id: oView.getId(),
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            var oEntryCtx = oView.getModel().createEntry("/Categories", {
              properties: {
                ID: id,
              },
            });
            oDialog.setBindingContext(oEntryCtx);
            oDialog.open();
          });
        } else {
          this.byId("createCategoryPopup").open();
        }
      },
      onCreateCategory: function () {
        this.getModel().submitChanges();
        this.byId("createCategoryPopup").close();
      },
      onCreateWord: function () {
        this.getModel().submitChanges();
        this.byId("createWordPopup").close();
      },
      onCancelCategory: function () {
        this.getModel().resetChanges();
        this.byId("createCategoryPopup").close();
      },
      onCancelWord: function () {
        this.getModel().resetChanges();
        this.byId("createWordPopup").close();
      },
      onCancelEditWord: function () {
        this.getModel().resetChanges();
        this.byId("editWordPopup").close();
      },
      onSaveWord: function () {
        this.getModel().submitChanges();
        this.byId("editWordPopup").close();
      },
      onAddNewWordPress() {
        var oView = this.getView();
        let id = this.getId();
        debugger;
        let categoryId = this.getSplitAppObj()
          .getCurrentDetailPage()
          .getBindingContext()
          .getObject().ID;
        if (!this.byId("createWordPopup")) {
          Fragment.load({
            name: "game.view.Fragments.CreateWord",
            controller: this,
            id: oView.getId(),
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            var oEntryCtx = oView.getModel().createEntry("/Words", {
              properties: {
                ID: id,
                Category_ID: categoryId,
                createdAt: new Date(),
                createdBy: "hanna.kaliada@leverx.com",
                modifiedAt: new Date(),
                modifiedBy: "hanna.kaliada@leverx.com",
              },
            });
            oDialog.setBindingContext(oEntryCtx);
            oDialog.open();
          });
        } else {
          this.byId("createWordPopup").open();
        }
      },

      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      onEditCardPress: function (event) {
        let binding = event.getSource().getBindingContext();
        let oView = this.getView();
        if (!this.byId("editWordPopup")) {
          Fragment.load({
            name: "game.view.Fragments.EditWord",
            controller: this,
            id: oView.getId(),
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.setBindingContext(binding);
            oDialog.open();
          });
        } else {
          this.byId("editWordPopup").open();
        }
      },
      onDeleteCardPress: function (event) {
        let path = event.getSource().getBindingContext().getPath();
        let oView = this.getView();
        MessageBox.confirm("Do you want to delete this item?", {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              oView.getModel().remove(path);
              oView.getModel().submitChanges();
              MessageToast.show("Success");
            }
            if (oAction === MessageBox.Action.CANCEL) {
              oView.getModel().resetChanges();
            }
          },
        });
      },
      onEditCategoryPress: function () {
        let binding = this.getSplitAppObj().getCurrentDetailPage().getBindingContext();
        let oView = this.getView();
        if (!this.byId("editCategoryPopup")) {
          Fragment.load({
            name: "game.view.Fragments.EditCategory",
            controller: this,
            id: oView.getId(),
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.setBindingContext(binding);
            oDialog.open();
          });
        } else {
          this.byId("editCategoryPopup").open();
        }
      },
      onSaveCategory: function () {
        this.getModel().submitChanges();
        this.byId("editCategoryPopup").close();
      },
      onCancelEditCategory: function () {
        this.getModel().resetChanges();
        this.byId("editCategoryPopup").close();
      },
      onDeleteCategoryPress: function () {
        let path = this.getSplitAppObj().getCurrentDetailPage().getBindingContext().getPath();
        let oView = this.getView();
        let itemsWords = this.byId(Fragment.createId("pageWord", "words")).getItems();
        let aPaths = itemsWords.map((item) => item.getBindingContext().getPath());

        MessageBox.confirm("Do you want to delete this category?", {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              oView.getModel().remove(path);
              aPaths.forEach((path) => oView.getModel().remove(path));
              oView.getModel().submitChanges();
              oView.getModel("helpModel").setProperty("/isVisible", false);
              oView.getModel().updateBindings();
              MessageToast.show("Success");
            }
            if (oAction === MessageBox.Action.CANCEL) {
              oView.getModel().resetChanges();
            }
          },
        });
      },
    });
  }
);
