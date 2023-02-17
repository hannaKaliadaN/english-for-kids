sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/TextAlign",
    "sap/m/Text",
    "sap/m/Button",
    "sap/ui/core/Icon",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/ButtonType",
  ],
  function (Control, TextAlign, Text, Button, Icon, Input, Label, ButtonType) {
    "use strict";
    return Control.extend("game.controls.CardWithSound", {
      metadata: {
        properties: {
          header: { type: "string", defaultValue: "" },
          srcAudio: { type: "string", defaultValue: "" },
          isRight: "boolean",
          rightTranslation: { type: "string", defaultValue: "" },
          currentTranslation: { type: "string", defaultValue: "" },
          editable: { type: "boolean", defaultValue: "true" },
          typeOfButton: { type: "sap.m.ButtonType", defaultValue: "Neutral" },
          valueInput: { type: "string", defaultValue: "" },
        },
        events: {},
      },
      init: function () {},
      setEditable: function (editable) {
        this.setProperty("editable", editable);
      },
      setHeader: function (header) {
        this.setProperty("header", header);
      },
      setRightTranslation: function (translation) {
        this.setProperty("rightTranslation", translation);
      },
      setCurrentTranslation: function (currentTranslation) {
        this.setProperty("currentTranslation", currentTranslation);
      },
      setTypeOfButton: function (type) {
        this.setProperty("typeOfButton", type);
      },
      setSrcAudio: function (sSrc) {
        this.setProperty("srcAudio", sSrc);
      },
      onButtonPress: function (oEvent, control) {
        let header = this.getHeader();
        let audio = document.querySelector(".audio-" + header.replace(/\s/g, ""));

        if (audio.getAttribute("src") !== "undefined") {
          audio.play();
        }
      },
      onCheck: function (oEvent, control) {
        let valueInput = document
          .querySelector(".input" + control.getHeader().replace(/\s/g, ""))
          .querySelector("input").value;
        let valueInputTransform = valueInput.toLowerCase().trim();

        let rightTranslation = control.getRightTranslation();
        valueInputTransform === rightTranslation
          ? control.setTypeOfButton("Accept")
          : control.setTypeOfButton("Negative");
        control.setIsRight(valueInputTransform === rightTranslation);
        control.setValueInput(valueInput);
      },
      renderer: function (rm, control) {
        rm.openStart("div", control).class("front").openEnd();
        rm.openStart("div", control).class("line").openEnd();
        rm.renderControl(
          new Text({
            text: control.getHeader(),
            textAlign: TextAlign.Center,
          }).addStyleClass("header")
        );
        rm.renderControl(
          new Text({
            text: control.getRightTranslation(),
            textAlign: TextAlign.Center,
            visible: false,
          }).addStyleClass("translation")
        );
        rm.openStart("audio", control)
          .class("audio-" + control.getHeader().replace(/\s/g, ""))
          .attr("src", control.getSrcAudio())
          .openEnd();
        rm.close("audio");
        rm.renderControl(
          new Button({
            icon: "sap-icon://headset",
            press: (event) => control.onButtonPress(event, control),
          }).addStyleClass("spellButton")
        );
        rm.close("div");
        rm.openStart("div", control).class("icon").openEnd();
        rm.renderControl(
          new Input({
            placeholder: "Translation:",
            value: control.getValueInput(),
            editable: control.getEditable(),
            change: (event) => control.onCheck(event, control),
          }).addStyleClass("input" + control.getHeader().replace(/\s/g, ""))
        );
        rm.close("div");
        rm.openStart("div", control).class("icon").openEnd();
        rm.renderControl(
          new Button({
            icon: "sap-icon://accept",
            type: control.getTypeOfButton(),
            enabled: control.getEditable(),
            press: (event) => control.onCheck(event, control),
          }).addStyleClass("check")
        );
        rm.close("div");
        rm.close("div");
      },
      // onclick: function (event) {
      //   const element = event.target;
      //   const parent = element.closest(".card");
      // },
    });
  }
);
