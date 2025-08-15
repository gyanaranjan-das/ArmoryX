sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("armoryx.armoryx.controller.Home", {

      /**
       * Handles the login process.
       */
      onLogin: function () {
          const sLoginInput = this.byId("loginInput").getValue();
          const sPassword = this.byId("passwordInput").getValue();
          const oRouter = this.getOwnerComponent().getRouter();

          if (!sLoginInput || !sPassword) {
              MessageToast.show("Please enter your credentials.");
              return;
          }

          // 1. GET DATA: Retrieve the list of users from localStorage.
          const aUsers = JSON.parse(localStorage.getItem("armoryxUsers") || "[]");

          // 2. CHECK DATA: Find a user whose credentials match the input.
          const oUser = aUsers.find(user =>
              (user.username === sLoginInput || user.email === sLoginInput) && user.password === sPassword
          );

          if (oUser) {
              // 3. SUCCESS: If user is found, navigate to the dashboard.
              MessageToast.show("Welcome back, " + oUser.username + "!");
              oRouter.navTo("RouteDashboard");
          } else {
              // 4. FAILURE: If user is not found, show an error.
              MessageBox.error("Login Failed. Please check your credentials or create an account.");
          }
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
          MessageToast.show("Password reset functionality is not yet implemented.");
      }
  });
});
