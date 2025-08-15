/*
================================================================================
| File: webapp/controller/SignUp.controller.js                                 |
| Purpose: Handles new user registration and saves data to browser storage.    |
================================================================================
*/
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, ValueState, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("armoryx.controller.SignUp", {

        /**
         * Real-time validation for password confirmation.
         */
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

        /**
         * Handles the registration process when the user clicks "Register".
         */
        onRegister: function () {
            const sUsername = this.byId("usernameInput").getValue; //get the username
            const sEmail = this.byId("emailInput").getValue();
            const sPassword = this.byId("passwordInput").getValue();

            // Basic validation
            if (!sEmail || !sPassword) {
                MessageToast.show("Please fill in all fields.");
                return;
            }

            // 1. GET DATA: Retrieve existing users from localStorage or create an empty array.
            const aUsers = JSON.parse(localStorage.getItem("armoryxUsers") || "[]");

            // Check if user already exists
            if (aUsers.find(user => user.email === sEmail)) {
                MessageBox.error("This email is already registered. Please use a different email or log in.");
                return;
            }

            // 2. UPDATE DATA: Add the new user to the array.
            aUsers.push({
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