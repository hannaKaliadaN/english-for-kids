sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/TextAlign",
    "sap/m/Text",
    "sap/m/Button",
  ],
  function (Control, TextAlign, Text, Button) {
    "use strict";
    return Control.extend("game.control.MyControl", {
      metadata: {
        properties: {
          header: "string",
          subheader: "string",
          highLight: "boolean",
          flip: "boolean",
          srcPicture: "string",
          srcAudio: "string",
          isEdit: "boolean",
        },
        events: {
          onEditPress: {},
          onDeletePress: {},
        },
        aggregations: {},
      },
      init: function () {},
      setHeader: function (header) {
        this.setProperty("header", header, true);
      },
      setSrcPicture: function (sSrc) {
        this.setProperty("srcPicture", sSrc, true);
      },
      setSrcAudio: function (sSrc) {
        this.setProperty("srcAudio", sSrc, true);
      },

      setSubheader: function (subheader) {
        this.setProperty("subheader", subheader, true);
      },
      setHighLight: function (highLight) {
        this.setProperty("highLight", highLight, true);
      },
      setIsEdit: function (isEdit) {
        this.setProperty("isEdit", isEdit, true);
      },
      setFlip: function (flip) {
        this.setProperty("flip", flip, true);
      },
      getFlip: function () {
        const flip = this.getProperty("flip");
        return flip;
      },
      onButtonPress: function (oEvent, control) {
        let header = this.getHeader();
        let audio = document.querySelector(
          ".audio-" + header.replace(/\s/g, "")
        );

        if (audio.getAttribute("src") !== "undefined") {
          audio.play();
        }
      },
      renderer: function (rm, control) {
        const pageIdName = control.getId().split("--");
        const pageId = pageIdName[pageIdName.length - 1].replace(/-[0-9]/g, "");
        rm.openStart("div", control).class("scene").openEnd();
        rm.openStart("div", control).class("card");
        rm.class(`${pageId}`);
        if (control.getHighLight()) {
          rm.class("highLight");
        }
        rm.openEnd();
        rm.openStart("div", control)
          .class("card__face")
          .class("card__face--front");
        rm.openEnd();
        if (control.getIsEdit()) {
          rm.openStart("div", control).class("buttons");
          rm.openEnd();
          rm.renderControl(
            new Button({
              icon: "sap-icon://edit",
              press: () => control.fireEvent("onEditPress"),
              type: "Transparent",
            }).addStyleClass("editButton")
          );
          rm.renderControl(
            new Button({
              icon: "sap-icon://decline",
              type: "Transparent",
              press: () => control.fireEvent("onDeletePress"),
            }).addStyleClass("deleteButton")
          );
          rm.close("div");
        }
        rm.renderControl(
          new Text({
            text: control.getHeader(),
            textAlign: TextAlign.Center,
          }).addStyleClass("header")
        );
        if (control.getSrcPicture()) {
          rm.openStart("img", control)
            .attr("src", control.getSrcPicture())
            .class("image")
            .openEnd();
          rm.close("div");
        }
        rm.openStart("div", control)
          .class("card__face")
          .class("card__face--back")
          .openEnd();
        rm.renderControl(
          new Text({
            text: control.getSubheader(),
            textAlign: TextAlign.Center,
          }).addStyleClass("subheader")
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
        rm.close("div");
        rm.close("div");
      },
      onclick: function (event) {
        const element = event.target;
        const parent = element.closest(".card");
        if (
          !element.closest(".spellButton") &&
          !element.closest(".deleteButton") &&
          !element.closest(".editButton")
        ) {
          parent.addEventListener("mouseleave", () => {
            parent.classList.remove("is-flipped");
            parent.classList.remove("highLight");
          });
          if (this.getFlip()) {
            parent.classList.toggle("is-flipped");
          }
          parent.classList.toggle("highLight");
        }
      },
    });
  }
);
