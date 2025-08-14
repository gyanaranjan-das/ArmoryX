sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast"
], function (Controller, ValueState, MessageToast) {
    "use strict";

    return Controller.extend("armoryx.armoryx.controller.SignUp", {

        onPasswordChange: function () {
            const oPasswordInput = this.byId("passwordInput");
            const oConfirmPasswordInput = this.byId("confirmPasswordInput");
            const oRegisterButton = this.byId("registerButton");
            const sPassword = oPasswordInput.getValue();
            const sConfirmPassword = oConfirmPasswordInput.getValue();

            // Check if passwords match and are not empty
            if (sPassword && sConfirmPassword && sPassword === sConfirmPassword) {
                oConfirmPasswordInput.setValueState(ValueState.Success);
                oConfirmPasswordInput.setValueStateText("Passwords match.");
                oRegisterButton.setEnabled(true);
            } else if (sConfirmPassword) {
                oConfirmPasswordInput.setValueState(ValueState.Error);
                oConfirmPasswordInput.setValueStateText("Passwords do not match.");
                oRegisterButton.setEnabled(false);
            } else {
                // Clear state if confirm password field is empty
                oConfirmPasswordInput.setValueState(ValueState.None);
                oRegisterButton.setEnabled(false);
            }
        },

        onRegister: function () {
            // This function is only callable if the button is enabled
            MessageToast.show("Registration successful! Please log in.");
            this.onNavBack();
        },

        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome", {}, true); // "true" clears the browser history
        }
    });
});