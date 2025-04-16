document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".sales"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: "auto",
      speed: 600,
      pagination: {
        el: element.querySelector(".sales__slider-pagination"),
        type: "bullets",
        clickable: true,
      },
    });
  });
});
