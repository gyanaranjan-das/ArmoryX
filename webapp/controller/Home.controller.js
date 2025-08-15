/*
================================================================================
| File: webapp/controller/Home.controller.js (Login Page)                      |
| Purpose: Handles user login by checking credentials against browser storage. |
================================================================================
*/
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("armoryx.controller.Home", {

        /**
         * Handles the login process when the user clicks "Login".
         */
        onLogin: function () {
            const sUsername = this.byId("usernameInput").getValue(); // Using email as username
            const sPassword = this.byId("passwordInput").getValue();

            // 1. GET DATA: Retrieve the list of users from localStorage.
            const aUsers = JSON.parse(localStorage.getItem("armoryxUsers") || "[]");

            // 2. CHECK DATA: Find a user whose email and password match the input.
            const oUser = aUsers.find(user => user.email === sUsername && user.password === sPassword);

            if (oUser) {
                // 3. SUCCESS: If user is found, show a success popup and navigate.
                MessageBox.success("Login Successful!", {
                    title: "Welcome Back!",
                    onClose: () => {
                        // Navigate to the dashboard after the user closes the popup
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteDashboard");
                    }
                });
            } else {
                // 4. FAILURE: If user is not found, show an error message.
                MessageBox.error("Login Failed. Please check your username and password.");
            }
        },

        /**
         * Enables the login button only when both input fields have text.
         */
        onInputChange: function () {
            const oUsernameInput = this.byId("usernameInput");
            const oPasswordInput = this.byId("passwordInput");
            const oLoginButton = this.byId("loginButton");

            const bInputsFilled = oUsernameInput.getValue() && oPasswordInput.getValue();
            oLoginButton.setEnabled(bInputsFilled);
        },

        /**
         * Navigates to the sign-up page.
         */
        onNavToSignUp: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSignUp");
        },
        
        /**
         * Placeholder for forgot password functionality.
         */
        onForgotPassword: function () {
            MessageToast.show("Password reset instructions have been sent to your email.");
        }
    });
});