import "virtual:svg-icons-register";
import "../scss/style.scss";
import fancybox from "./fancybox";

document.addEventListener("DOMContentLoaded", () => {
  fancybox();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
