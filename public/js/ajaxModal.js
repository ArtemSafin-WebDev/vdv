document.addEventListener("DOMContentLoaded", () => {
  const controller = new AbortController();
  const signal = controller.signal;
  document.addEventListener("click", async (event) => {
    if (
      event.target.matches(".js-open-ajax-modal") ||
      event.target.closest(".js-open-ajax-modal")
    ) {
      event.preventDefault();
      const link = event.target.matches(".js-open-ajax-modal")
        ? event.target
        : event.target.closest(".js-open-ajax-modal");
      const href = link.href;

      try {
        const response = await fetch(href, { signal });
        if (!response.ok) throw new Error("Error when loading modal");
        const text = await response.text();

        const parser = new DOMParser();
        const nextPageHtml = parser.parseFromString(text, "text/html");

        const modal = nextPageHtml.querySelector(".page-main .modal");

        document.body.appendChild(modal);
        window.vdvApi.initMasks(modal);
        const form = modal.querySelector("form[data-need-validation]");
        if (form) {
          window.vdvApi.initFormValidation(form);
        }
        const jsForm = modal.querySelector(".js-form");
        if (jsForm) {
          window.vdvApi.initJsForm(jsForm);
        }

        const productCard = modal.querySelector(".js-product");
        let productCleanUpFunction = null;
        if (productCard) {
          productCleanUpFunction = window.vdvApi.initProductCard(productCard);
        }

        await new Promise((resolve) => setTimeout(resolve, 200));
        Array.from(document.querySelectorAll(".js-modal")).forEach(
          (otherModal) => {
            if (otherModal === modal) {
              return;
            }
            otherModal.classList.remove("active");
          }
        );
        document.body.classList.remove("modal-open");
        modal.classList.add("active");
        document.body.classList.add("modal-open");

        const transitionEndHandler = () => {
          modal.removeEventListener("transitionend", transitionEndHandler);
          modal.remove();
          if (productCleanUpFunction) {
            productCleanUpFunction();
          }
        };

        document.addEventListener("modalclose", () => {
          modal.addEventListener("transitionend", transitionEndHandler);
        });

        console.log("Response text", modal);
      } catch (err) {
        console.error(`Download error: ${err.message}`);
      }
    }
  });
});
