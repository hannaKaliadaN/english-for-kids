sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("game.controller.Train", {
      onInit: function () {
        this.getRouter().getRoute("Train").attachPatternMatched(this.onPatternMatched, this);
        this.getOwnerComponent().getModel("helpModel").setProperty("/isVisibleWords", true);
      },
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },
      onPatternMatched: function (oEvent) {
        var mRouteArguments = oEvent.getParameter("arguments");
        var sCategId = mRouteArguments.CategId;
        this.getOwnerComponent().getModel("helpModel").setProperty("/isVisibleWords", true);
        this.getModel()
          .metadataLoaded()
          .then(
            function () {
              var sKey = this.getModel().createKey("/Categories", {
                ID: sCategId,
                parameters: { expand: "Words" },
              });

              this.getView().bindObject({
                path: sKey,
              });
            }.bind(this)
          );
      },

      getModel: function () {
        return this.getOwnerComponent().getModel();
      },
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },
      navigateTo: function (sRoute, oParam) {
        this.getRouter().navTo(sRoute, oParam);
      },

      onButtonPress: function (oEvent) {},
      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      onButtonResultsPress: function () {
        this.navigateTo("Results", {});
      },
      onButtonResultesPress: function () {},

      onStartTrainPress: function () {
        this.getView().getModel("helpModel").setProperty("/isVisibleWords", false);

        // let context = this.getView().getBindingContext().getModel().mContexts;
        // let aPaths = Object.keys(context);
        // this.getView().getModel("helpModel").setProperty("/currentTrain", []);
        // aPaths.forEach((sPath) => {
        //   !sPath.includes("Categories") ? this.getNewObject(sPath) : null;
        // });
        // debugger
      },
      // getNewObject: function (sPath) {
      //   let oWord = this.getView().getModel().getProperty(sPath);
      //   let oCurrentTrainModel = this.getView().getModel("helpModel").getProperty("/currentTrain");
      //   this.getView()
      //     .getModel("helpModel")
      //     .setProperty("/currentTrain", [
      //       ...oCurrentTrainModel,
      //       { ...oWord, currentTranslation: "qqqq" },
      //     ]);
      // },
      // onChangeInput: function () {},
      onResultsPress: function () {
        this.getView().getModel("helpModel").setProperty("/isVisibleResults", true);
        this.getView().getModel("helpModel").setProperty("/currentTrain/rightAnswers", 0);
        this.getView().getModel("helpModel").setProperty("/currentTrain/wrongAnswers", 0);
        let items = this.byId("trainCards").getItems();
        this.getView()
          .getModel("helpModel")
          .setProperty("/currentTrain/numberOfWords", items.length);
        debugger;
        items.forEach((item) => {
          let isRight = item.getIsRight();
          let currentIsRight = this.getView()
            .getModel("helpModel")
            .getProperty("/currentTrain/rightAnswers");
          let currentIsWrong = this.getView()
            .getModel("helpModel")
            .getProperty("/currentTrain/wrongAnswers");
          isRight
            ? this.getView()
                .getModel("helpModel")
                .setProperty("/currentTrain/rightAnswers", (currentIsRight += 1))
            : this.getView()
                .getModel("helpModel")
                .setProperty("/currentTrain/wrongAnswers", (currentIsWrong += 1));
        });
      },
    });
  }
);
