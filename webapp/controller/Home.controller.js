sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast" // Add MessageToast to your dependencies
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("armoryx.armoryx.controller.Home", {

      onLogin: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteDashboard");
      },

      onNavToSignUp: function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteSignUp");
      },

      /**
       * NEW: Placeholder function for the "Forgot Password" link.
       */
      onForgotPassword: function () {
          // In a real app, this would open a dialog or navigate to a password reset page.
          MessageToast.show("Password reset functionality is not yet implemented.");
      },

      /**
       * New: placehilder for google login.
       */
      onGoogleLogin: function(){
        MessageToast.show("Signining in with Google...");
      },

      /**
       * New placeholder for github login.
       */
      onGithubLogin: function(){
        MessageToast.show("Signing in with Github...")
      }
  });
});
