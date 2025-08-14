sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("armoryx.armoryx.controller.Dashboard", {

        onNavToCategory: function (oEvent) {
            const oTile = oEvent.getSource();
            const oBindingContext = oTile.getBindingContext("weapons");
            const sCategoryId = oBindingContext.getProperty("id"); // e.g., "small-arms"

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteWeaponList", {
                categoryId: sCategoryId
            });
        },

        onLogout: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            // Navigate back to the login screen (RouteHome) and clear the browser history
            oRouter.navTo("RouteHome", {}, true);
        }
    });
});