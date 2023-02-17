sap.ui.define(
  ["./BaseController"],

  function (BaseController) {
    "use strict";

    return BaseController.extend("game.controller.Train", {
      onInit: function () {
        this.getRouter().getRoute("Train").attachPatternMatched(this.onPatternMatched, this);
        this.getOwnerComponent().getModel("helpModel").setProperty("/isVisibleWords", true);
      },

      onPatternMatched: function (oEvent) {
        this.getOwnerComponent().getModel("helpModel").setProperty("/isVisibleResults", false);
        this.getOwnerComponent().getModel("helpModel").setProperty("/isVisibleWords", true);
        let mRouteArguments = oEvent.getParameter("arguments");
        
        let sCategId = mRouteArguments.CategId;
        this.getModel()
          .metadataLoaded()
          .then(
            function () {
              let sKey = this.getModel().createKey("/Categories", {
                ID: sCategId,
                parameters: { expand: "Words" },
              });

              this.getView().bindObject({
                path: sKey,
              });
            }.bind(this)
          );
      },

      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      onButtonResultsPress: function () {
        this.navigateTo("Results", {});
      },
      onStartTrainPress: function () {
        debugger
        this.getView().getModel("helpModel").setProperty("/isVisibleWords", false);
      },
      onResultsPress: function () {
        this.getView().getModel("helpModel").setProperty("/isVisibleResults", true);
        this.getView().getModel("helpModel").setProperty("/currentTrain/rightAnswers", 0);
        this.getView().getModel("helpModel").setProperty("/currentTrain/wrongAnswers", 0);
        let items = this.byId("trainCards").getItems();
        this.getView()
          .getModel("helpModel")
          .setProperty("/currentTrain/numberOfWords", items.length);
    
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
