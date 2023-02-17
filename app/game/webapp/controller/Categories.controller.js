sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("game.controller.Categories", {
      onTilePress: function (oEvent) {
        let oSource = oEvent.getSource();
        let oContext = oSource.getBindingContext();
        this.getSplitAppObj().toDetail(
          this.createId("idWordPage"),
          "slide",
          oContext,
          {}
        );

        this.getSplitAppObj().getDetailPages()[0].setBindingContext(oContext);
        this.getView().getModel("helpModel").setProperty("/isEnabled", true);
      },
      getSplitAppObj: function () {
        return this.byId("idCategoryPage");
      },
      // onButtonPress: function (oEvent) {
      //   let control = oEvent.getSource();
      //   let word = control.getHeader();
      //   this.getPronunsationLink(word).then((data) => {
      //     control.setSrcAudio(data.audio)
      //   }).then(()=>{
      //     debugger
      //   });
      // },
      getBindingOfPage() {
        return this.getSplitAppObj().getDetailPages()[0].getBindingContext();
      },
      onButtonTrainPress: function () {
        let oContext = this.getBindingOfPage();
        this.navigateTo("Train", {
          CategId: oContext.getObject("ID"),
        });
      },
      onAdminPagePress: function () {
        this.navigateTo("Admin", {});
      },
      onSmartControlPress: function () {
        this.navigateTo("Results", {});
      },

    
    });
  }
);
