document.addEventListener("DOMContentLoaded", function () {
  const clearRegion = document.querySelector(".checkout__region-button");
  clearRegion?.addEventListener("click", function () {
    clearRegion.parentElement.querySelector("input").value = "";
    clearRegion.parentElement
      .querySelector("input")
      .dispatchEvent(new Event("input"));
  });
});
