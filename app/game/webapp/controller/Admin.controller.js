sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],

  function (BaseController, Fragment, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("game.controller.Admin", {
      onTilePress: function (oEvent) {
        let oSource = oEvent.getSource();
        let oContext = oSource.getBindingContext();
        this.getSplitAppObj().toDetail(this.createId("idWordPage"), "slide", oContext, {});
        this.getSplitAppObj().getCurrentDetailPage().setBindingContext(oContext);
        this.getView().getModel("helpModel").setProperty("/isVisible", true);
      },
      getSplitAppObj: function () {
        return this.byId("idAdminPage");
      },

      onAddNewCategoryPress: function () {
        let oView = this.getView();
        let id = this.getId();
        Fragment.load({
          name: "game.view.Fragments.CreateCategory",
          controller: this,
          id: oView.getId(),
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          let oEntryCtx = oView.getModel().createEntry("/Categories", {
            properties: {
              ID: id,
            },
          });
          oDialog.setBindingContext(oEntryCtx);
          oDialog.open();
        });
      },
      onCreateCategory: function () {
        this.getModel().submitChanges();
        this.byId("createCategoryPopup").close();
        this.byId("createCategoryPopup").destroy();
      },
      onCreateWord: function () {
        this.getModel().submitChanges();
        this.byId("createWordPopup").close();
        this.byId("createWordPopup").destroy();
      },
      onCancelCategory: function () {
        this.getModel().resetChanges();
        this.byId("createCategoryPopup").close();
        this.byId("createCategoryPopup").destroy();
      },
      onCancelWord: function () {
        this.getModel().resetChanges();
        this.byId("createWordPopup").close();
        this.byId("createWordPopup").destroy();
      },
      onCancelEditWord: function () {
        this.getModel().resetChanges();
        this.byId("editWordPopup").close();
        this.byId("editWordPopup").destroy();
      },
      onSaveWord: function () {
        this.getModel().submitChanges();
        this.byId("editWordPopup").close();
        this.byId("editWordPopup").destroy();
      },
      onAddNewWordPress() {
        let oView = this.getView();
        let id = this.getId();
        let categoryId = this.getSplitAppObj()
          .getCurrentDetailPage()
          .getBindingContext()
          .getObject().ID;
        Fragment.load({
          name: "game.view.Fragments.CreateWord",
          controller: this,
          id: oView.getId(),
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          let oEntryCtx = oView.getModel().createEntry("/Words", {
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
      },

      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      onEditCardPress: function (event) {
        let binding = event.getSource().getBindingContext();
        let oView = this.getView();

        Fragment.load({
          name: "game.view.Fragments.EditWord",
          controller: this,
          id: oView.getId(),
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          oDialog.setBindingContext(binding);
          oDialog.open();
        });
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

        Fragment.load({
          name: "game.view.Fragments.EditCategory",
          controller: this,
          id: oView.getId(),
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          oDialog.setBindingContext(binding);
          oDialog.open();
        });
      },
      onSaveCategory: function () {
        this.getModel().submitChanges();
        this.byId("editCategoryPopup").close();
        this.byId("editCategoryPopup").destroy();
      },
      onCancelEditCategory: function () {
        this.getModel().resetChanges();
        this.byId("editCategoryPopup").close();
        this.byId("editCategoryPopup").destroy();
      },
      onDeleteCategoryPress: function () {
        let path = this.getSplitAppObj().getCurrentDetailPage().getBindingContext().getPath();
        let oView = this.getView();
        let itemsWords = this.byId(Fragment.createId("idWordPage", "words")).getItems();
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
      onChangeWord: function (oEvent) {
        let value = oEvent.getParameter("value");
        let valueForRequest = value.slice(value.indexOf(" ") + 1);
        let path = this.byId("createWordPopup").getBindingContext().getPath();
        let model = this.getModel();
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + valueForRequest)
          .then((response) => response.json())
          .then((data) => {
            if (data.length) {
              for (let i = 0; i < data[0].phonetics.length; i++) {
                if (data[0].phonetics[i].audio !== "") {
                  model.setProperty(path + "/audioSrc", data[0].phonetics[i].audio);
                  break;
                }
              }
            }
          });
        // let options = {
        //   method: "GET",
        //   accessKey: "tb7EB4oWFcPivR0xWHqogkP5D7HhA0VZWHv8pyPyUMU",
        //   headers: {
        //     "Cache-control": "no-cache",
        //     "Secret Key": "rewP1MivCvkPExbeuf6G-qQmMeRuTOSl_J1T2XjrGb0",
        //     "Content-type": "application/json",
        //   },
        // };
        // fetch("https://api.unsplash.com/search/photos?page=1&query=" + valueForRequest, options)
        //   .then((response) => response.json)
        //   .then((data) => console.log(data));
      },
    });
  }
);
