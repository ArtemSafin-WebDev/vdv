document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-product"));
  elements.forEach((product) => {
    const sliders = Array.from(product.querySelectorAll(".product__gallery"));

    sliders.forEach((slider) => {
      const thumbsContainer = slider.querySelector(
        ".product__gallery-thumbs .swiper"
      );
      const mainContainer = slider.querySelector(
        ".product__gallery-main .swiper"
      );
    });
    const likeBtn = product.querySelector(".product__like-btn");

    likeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      likeBtn.classList.toggle("active");
    });

    const tabBtns = Array.from(
      product.querySelectorAll(".product__tabs-nav-btn")
    );
    const tabItems = Array.from(
      product.querySelectorAll(".product__tabs-item")
    );

    tabBtns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        tabBtns.forEach((btn) => btn.classList.remove("active"));
        tabItems.forEach((item) => item.classList.remove("active"));
        tabBtns[btnIndex]?.classList.add("active");
        tabItems[btnIndex]?.classList.add("active");
      });
    });

    const productForm = product.querySelector(".product__form");
    const productAddToCart = product.querySelector(".product__add-to-cart");
    const cartWrapper = product.querySelector(".product__cart-wrapper");
    const counter = product.querySelector(".counter");
    const counterInput = counter.querySelector("input");
    const minus = counter.querySelector(".counter__btn--minus");
    const plus = counter.querySelector(".counter__btn--plus");
    console.log("Add to cart", productForm);
    if (productForm && cartWrapper) {
      productForm.addEventListener("submit", (event) => {
        event.preventDefault();
        productAddToCart.classList.remove("active");
        cartWrapper.classList.add("active");
        if (counterInput) counterInput.value = 1;
        if (minus) minus.disabled = false;
        if (plus) plus.disabled = false;
      });
      if (counter) {
        counterInput.addEventListener("change", (event) => {
          const amount = event.target.valueAsNumber;
          if (amount === 0) {
            cartWrapper.classList.remove("active");
            productAddToCart.classList.add("active");
          }
        });
      }
    }
  });
});
