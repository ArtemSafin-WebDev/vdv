document.addEventListener("DOMContentLoaded", () => {
  const initCard = (card) => {
    const container = card.querySelector(".swiper");
    if (container) {
      // Иниициализация слайдера
      const instance = new Swiper(container, {
        speed: 600,
        pagination: {
          type: "bullets",
          el: card.querySelector(".product-card__slider-pagination"),
          clickable: true,
        },
        effect: "fade",
        nested: container.closest(".swiper") ? true : false,
        allowTouchMove:
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          !window.matchMedia("(max-width: 1024px)").matches,
      });

      // Add mouse move handling for non-touch devices
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let isMouseMoving = false;
        let mouseMoveTimeout;
        let lastMouseX = 0;

        container.addEventListener("mousemove", (e) => {
          if (!isMouseMoving) {
            isMouseMoving = true;
            lastMouseX = e.clientX;
          }

          clearTimeout(mouseMoveTimeout);
          mouseMoveTimeout = setTimeout(() => {
            isMouseMoving = false;
          }, 100);

          const rect = container.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const cardWidth = rect.width;
          const slideCount = instance.slides.length;
          const slideWidth = cardWidth / slideCount;

          const currentSlide = Math.floor(mouseX / slideWidth);
          if (
            currentSlide !== instance.activeIndex &&
            currentSlide < slideCount
          ) {
            instance.slideTo(currentSlide);
          }
        });
      }
    }
    const likeBtn = card.querySelector(".product-card__like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const url = likeBtn.href;
        try {
          const response = await fetch(url, {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error("Не удалось добавить товар в избранное");
          }
          const data = await response.text();
          console.log("Data", data);
        } catch (error) {
          console.log("Error", error);
        } finally {
          likeBtn.classList.toggle("active");
        }
      });
    }

    const addToCartForm = card.querySelector("form");
    if (addToCartForm) {
      const submitBtn = addToCartForm.querySelector("button[type='submit']");
      addToCartForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(addToCartForm);
        const url = addToCartForm.action;
        submitBtn.disabled = true;
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            throw new Error("Не удалось добавить товар в корзину");
          }
          const data = await response.text();
          console.log("Товар успешно добавлен в корзину", data);
        } catch (error) {
          console.log("Ошибка при добавлении в корзину", error);
        } finally {
          // Перенести потом добавление active внутрь блока try
          submitBtn.classList.add("active");
          submitBtn.disabled = false;
        }
      });
    }
  };

  const cards = Array.from(document.querySelectorAll(".product-card"));
  cards.forEach((card) => initCard(card));

  if (!window.vdvApi) {
    window.vdvApi = {};
  }

  window.vdvApi.initCard = initCard;
});
