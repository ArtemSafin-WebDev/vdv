document.addEventListener("DOMContentLoaded", function () {
  const productsSlider = Array.from(
    document.querySelectorAll(".products-slider")
  );
  productsSlider.forEach((slider) => {
    const container = slider.querySelector(".swiper");
    if (!container) return;
    new Swiper(container, {
      slidesPerView: "auto",
      speed: 600,
      pagination: {
        el: ".products-slider__pagination",
        type: "bullets",
        clickable: true,
      },
    });
  });
});
