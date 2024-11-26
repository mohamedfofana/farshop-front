jQuery(document).ready(function ($) {
  "use strict";

  var header = $(".header");
  var menuActive = false;

  setHeader();

  $(window).on("resize", function () {
    setHeader();
  });

  $(document).on("scroll", function () {
    setHeader();
  });

  function setHeader() {
    if (window.innerWidth < 992) {
      if ($(window).scrollTop() > 100) {
        header.css({ top: "0" });
      } else {
        header.css({ top: "0" });
      }
    } else {
      if ($(window).scrollTop() > 100) {
        header.css({ top: "-50px" });
      } else {
        header.css({ top: "0" });
      }
    }
    if (window.innerWidth > 991 && menuActive) {
      closeMenu();
    }
  }
});
