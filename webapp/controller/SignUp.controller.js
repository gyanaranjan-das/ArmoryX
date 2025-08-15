sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, ValueState, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("armoryx.armoryx.controller.SignUp", {

        /**
         * Real-time validation for password confirmation.
         */
        onPasswordChange: function () {
            const oPasswordInput = this.byId("passwordInput");
            const oConfirmPasswordInput = this.byId("confirmPasswordInput");
            const oRegisterButton = this.byId("registerButton");
            const sPassword = oPasswordInput.getValue();
            const sConfirmPassword = oConfirmPasswordInput.getValue();

            if (sPassword && sConfirmPassword && sPassword === sConfirmPassword) {
                oConfirmPasswordInput.setValueState(ValueState.Success);
                oConfirmPasswordInput.setValueStateText("Passwords match.");
                oRegisterButton.setEnabled(true);
            } else if (sConfirmPassword) {
                oConfirmPasswordInput.setValueState(ValueState.Error);
                oConfirmPasswordInput.setValueStateText("Passwords do not match.");
                oRegisterButton.setEnabled(false);
            } else {
                oConfirmPasswordInput.setValueState(ValueState.None);
                oRegisterButton.setEnabled(false);
            }
        },

        /**
         * Handles the registration process.
         */
        onRegister: function () {
            const sUsername = this.byId("usernameInput").getValue();
            const sEmail = this.byId("emailInput").getValue();
            const sPassword = this.byId("passwordInput").getValue();

            if (!sUsername || !sEmail || !sPassword) {
                MessageToast.show("Please fill in all fields.");
                return;
            }

            // 1. GET DATA: Retrieve existing users or create an empty array.
            const aUsers = JSON.parse(localStorage.getItem("armoryxUsers") || "[]");

            // Check if username or email already exists
            if (aUsers.find(user => user.username === sUsername || user.email === sEmail)) {
                MessageBox.error("This username or email is already registered.");
                return;
            }

            // 2. ADD DATA: Add the new user to the array.
            aUsers.push({
                username: sUsername,
                email: sEmail,
                password: sPassword // NOTE: Never store plain text passwords in a real app!
            });

            // 3. SAVE DATA: Save the updated user list back to localStorage.
            localStorage.setItem("armoryxUsers", JSON.stringify(aUsers));

            MessageToast.show("Registration successful! Please log in.");
            this.onNavBack();
        },

        /**
         * Navigates back to the login page.
         */
        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome", {}, true);
        }
    });
});
