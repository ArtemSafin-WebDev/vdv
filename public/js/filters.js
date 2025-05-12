document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".filters"));
  elements.forEach((element) => {
    const selects = Array.from(element.querySelectorAll(".filters__select"));
    const modal = element.querySelector(".filters__modal");
    const countOutputElement = element.querySelector(
      ".filters__open-btn-text span"
    );

    const calculateCheckedCount = () => {
      const checkedCount = Array.from(
        modal.querySelectorAll('input[type="checkbox"]')
      ).filter((input) => input.checked)?.length;

      console.log(
        "Calculating",
        checkedCount,
        Array.from(modal.querySelectorAll('input[type="checkbox"]'))
      );
      if (!checkedCount) {
        countOutputElement.textContent = "";
      } else {
        countOutputElement.textContent = checkedCount;
      }
    };

    selects.forEach((select) => {
      const btn = select.querySelector(".filters__select-btn");
      const wrapper = select.querySelector(".filters__select-wrapper");
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        selects.forEach((someSelect) => {
          if (someSelect === select) return;
          someSelect.classList.remove("open");
        });
        select.classList.toggle("open");
      });

      wrapper.addEventListener("mouseenter", () => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
          return;
        select.classList.add("open");
      });
      wrapper.addEventListener("mouseleave", () => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
          return;
        select.classList.remove("open");
      });

      document.addEventListener("click", (event) => {
        if (
          event.target.matches(".filters__select") ||
          event.target.closest(".filters__select") ||
          event.target.closest(".filters__open-btn")
        )
          return;
        if (
          event.target.closest(".filters__modal") &&
          window.matchMedia("(max-width: 576px)").matches
        )
          return;

        console.log("Clicked outside");
        select.classList.remove("open");
      });

      if (select.matches(".js-classic-select")) {
        const inputs = Array.from(select.querySelectorAll("input"));
        const btnText = select.querySelector(".filters__select-btn-text");
        const setActiveInput = () => {
          const checkedInput = inputs.find((input) => input.checked);
          const checkedText =
            checkedInput.parentElement.querySelector(
              "span:last-child"
            ).textContent;
          btnText.textContent = checkedText;
          select.classList.remove("open");
        };

        inputs.forEach((input) =>
          input.addEventListener("change", setActiveInput)
        );
      }

      if (
        select.matches(".js-brands-select") ||
        select.matches(".js-colors-select")
      ) {
        const inputs = Array.from(select.querySelectorAll("input"));

        let tags = [];
        const update = () => {
          const checkedInputs = inputs.filter((input) => input.checked);

          const newTags = checkedInputs.map((item) => {
            const value = item.value;
            const tag = document.createElement("div");
            if (select.matches(".js-brands-select")) {
              const labelText = item.parentElement.querySelector(
                ".filters__select-radio-text"
              ).textContent;
              tag.className = "filters__select-brand-tag js-select-tag";
              tag.innerHTML = `
                ${labelText}
                <svg width="14" height="14" aria-hidden="true">
                    <use xlink:href="#clear"></use>
                </svg>
            `;
            } else {
              const colorBox = item.parentElement.querySelector(
                ".filters__select-radio-colorbox"
              );
              tag.className = "filters__select-color-tag js-select-tag";
              tag.appendChild(colorBox.cloneNode(true));
            }
            tag.setAttribute("data-value", value);
            return tag;
          });
          tags.forEach((tag) => tag.remove());
          tags = newTags;
          select.append(...tags);

          calculateCheckedCount();
        };
        update();

        inputs.forEach((input) => input.addEventListener("change", update));

        select.addEventListener("click", (event) => {
          if (
            event.target.matches(".js-select-tag") ||
            event.target.closest(".js-select-tag")
          ) {
            event.preventDefault();
            const tag = event.target.matches(".js-select-tag")
              ? event.target
              : event.target.closest(".js-select-tag");
            const value = tag.getAttribute("data-value");
            const correspondingInput = inputs.find(
              (input) => input.value === value
            );
            if (correspondingInput) {
              correspondingInput.checked = false;
              correspondingInput.dispatchEvent(new Event("change"));
            }
          }
        });
      }
    });
  });
});
