sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("game.controller.Results", {
      /**
       * @override
       */
      onInit: function() {
        this.getView().byId("smartFormPage").bindElement("/Categories(1)");
        
      
      },
      onMainPagePress: function () {
        this.navigateTo("Categories", {});
      },
      // onFilterChange: function () {
      //   let oTable = this.byId("smartTable");
      //   let oFilterBar = this.byId("smartFilterBar");
      //   let oInput = this.byId("cbFilter");
      //   let oFilter = new Filter({
      //     path: "category_ID",
      //     operator: FilterOperator.EQ,
      //     value1: oInput.getValue(),
      //   });

      //   // oTable.rebindTable()
      //   debugger;
      // },

      beforeRebindTable: function (oEvent) {
        let oInput = this.byId("cbFilter");
        let sValue = oInput.getValue();
        if (sValue) {
          let oCurrentFilters = oEvent.getParameter("bindingParams").filters;
          let oFilter = new Filter({
            filters: [
              ...oCurrentFilters,
              new Filter({
                path: "Category_ID",
                operator: FilterOperator.EQ,
                value1: sValue,
              }),
            ],
            and: true,
          });
          oEvent.getParameter("bindingParams").filters = oFilter;
        }
      },
    });
  }
);
