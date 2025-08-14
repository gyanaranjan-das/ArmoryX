sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("armoryx.armoryx.controller.Home", {

      onLogin: function () {
          const sUsername = this.byId("usernameInput").getValue();
          const bRememberMe = this.byId("rememberMeCheckbox").getSelected();

          let sMessage = "Welcome, " + sUsername + ".";
          if (bRememberMe) {
              sMessage += " Your session will be remembered.";
          }
          MessageToast.show(sMessage);

          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteDashboard");
      },

      onInputChange: function () {
          const oUsernameInput = this.byId("usernameInput");
          const oPasswordInput = this.byId("passwordInput");
          const oLoginButton = this.byId("loginButton");

          const bInputsFilled = oUsernameInput.getValue() && oPasswordInput.getValue();
          oLoginButton.setEnabled(bInputsFilled);
      },

      onForgotPassword: function () {
          // In a real app, this would open a dialog or navigate to a password reset page.
          MessageToast.show("Password reset instructions have been sent to your email.");
      },

      onNavToSignUp: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteSignUp"); // Navigate to the new sign-up route
      }
  });
});
