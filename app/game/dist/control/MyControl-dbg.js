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
          src: "string",
        },
        events: {
          onButtonPress: {},
          onClickCard: {},
        },
        aggregations: {
          image: {
            type: "sap.m.Image",
          },
        },
      },
      init: function () {},
      setHeader: function (header) {
        this.setProperty("header", header, true);
      },
      setSrc: function (sSrc) {
        this.setProperty("src", sSrc, true);
      },

      setSubheader: function (subheader) {
        this.setProperty("subheader", subheader, true);
      },
      setHighLight: function (highLight) {
        this.setProperty("highLight", highLight, true);
      },
      setFlip: function (flip) {
        this.setProperty("flip", flip, true);
      },
      getFlip: function () {
        const flip = this.getProperty("flip");
        return flip;
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
          .class("card__face--front")
          .openEnd();
        rm.renderControl(
          new Text({
            text: control.getHeader(),
            textAlign: TextAlign.Center,
          }).addStyleClass("header")
        );
        rm.openStart("img", control)
          .attr("src", control.getSrc())
          .class("image")
          .openEnd();
        rm.close("div");
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
        rm.renderControl(
          new Button({
            text: "Spell",
            press: () => control.fireEvent("onButtonPress"),
            width: "7rem",
          })
        );
        rm.close("div");
        rm.close("div");
        rm.close("div");
      },

      getPageIdName: function (element) {
        const className = element.id.split("--");
        return className[className.length - 1].replace(/-[0-9]/g, "");
      },

      onclick: function (event) {
        const element = event.target;
        const parent = element.closest(".card");
        // const pageIdName = this.getPageIdName(parent);
        parent.addEventListener("mouseleave", () => {
          parent.classList.remove("is-flipped");
          parent.classList.remove("highLight");
        });
        // const cards = document.querySelectorAll(`.card.${pageIdName}`);
        // cards.forEach((card) => {
        //   card.classList.remove("is-flipped");
        //   card.classList.remove("highLight");
        // });
        if (this.getFlip()) {
          parent.classList.toggle("is-flipped");
        }
        // if (
        //   element.classList.contains("card__face--front") ||
        //   element.closest("card__face--front")
        // ) {
        //   this.fireEvent("onClickCard");
        // }
        parent.classList.toggle("highLight");
      },
    });
  }
);
