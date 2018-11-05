/* eslint-disable */
// Source: https://dzone.com/articles/introduction-to-progressive-web-apps-offline-first
(function() {
  "use strict";
  var header = document.querySelector("header");
  var menuHeader = document.querySelector(".menu__header");

  // After DOM Loaded
  document.addEventListener("DOMContentLoaded", function(event) {
    // On initial load to check connectivity
    if (!navigator.onLine) {
      updateNetworkStatus();
    }
    window.addEventListener("online", updateNetworkStatus, false);
    window.addEventListener("offline", updateNetworkStatus, false);
  });

  // To update network status
  function updateNetworkStatus() {
    if (!navigator.onLine) {
      console.log("You are offline!");
    }
  }
})();
