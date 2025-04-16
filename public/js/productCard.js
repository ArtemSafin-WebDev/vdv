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
      });
    }
    const likeBtn = card.querySelector(".product-card__like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        // Скрипт для добавления в избранное
        likeBtn.classList.toggle("active");
      });
    }

    const addToCartForm = card.querySelector("form");
    if (addToCartForm) {
      addToCartForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Скрипт для добавления в корзину
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
