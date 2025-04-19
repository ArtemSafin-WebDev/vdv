document.addEventListener("DOMContentLoaded", function () {
  const productsSlider = Array.from(
    document.querySelectorAll(".products-slider")
  );
  productsSlider.forEach((slider) => {
    const container = slider.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
      longSwipeRatio: 0.2,
      speed: 600,
      pagination: {
        el: slider.querySelector(".products-slider__pagination"),
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        577: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 30,
        },
      },
    });
  });
});
