document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".home-news"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: "auto",
      speed: 600,
      pagination: {
        el: element.querySelector(".home-news__slider-pagination"),
        type: "bullets",
        clickable: true,
      },
    });
  });
});
