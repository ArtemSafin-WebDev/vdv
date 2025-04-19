document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".home-news"));
  elements.forEach((element) => {
    const container = element.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,
      speed: 600,
      pagination: {
        el: element.querySelector(".home-news__slider-pagination"),
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        577: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
        },
      },
    });
  });
});
