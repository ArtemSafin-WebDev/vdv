document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".about"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 20,
      grid: {
        rows: 3,
        fill: "row",
      },

      speed: 600,
      pagination: {
        el: element.querySelector(".about__pagination"),
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        577: {
          slidesPerView: 3,
          spaceBetween: 20,
          grid: {
            rows: 2,
          },
        },
        1025: {
          slidesPerView: 4,
          spaceBetween: 20,
          grid: {
            rows: 2,
            fill: "row",
          },
        },
      },
    });
  });
});
