document.addEventListener("DOMContentLoaded", () => {
  const initMasks = (context = document) => {
    const phoneInputs = Array.from(context.querySelectorAll(".js-phone-input"));

    phoneInputs.forEach((input) => {
      const instance = new Inputmask({ mask: "+7 (999) 999-99-99" });
      instance.mask(input);
    });

    const onlyNumericInputsNoFormatting = Array.from(
      context.querySelectorAll(".js-numeric-input")
    );

    onlyNumericInputsNoFormatting.forEach((input) => {
      input.addEventListener("input", () => {
        const value = input.value;
        const newCleanedValue = parseInt(value.replace(/[^\d]+/g, ""), 10);
        if (isNaN(newCleanedValue)) {
          input.value = "";
        } else {
          input.value = newCleanedValue;
        }
      });
    });
  };

  initMasks();
  if (!window.vdvApi) {
    window.vdvApi = {};
  }
  window.vdvApi.initMasks = initMasks;
});
