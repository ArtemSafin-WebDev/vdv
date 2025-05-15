document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(".js-product"));

  function initProductCard(product) {
    const controller = new AbortController();
    const signal = controller.signal;
    const sliders = Array.from(product.querySelectorAll(".product__gallery"));

    let sliderInstances = [];

    sliders.forEach((slider) => {
      const thumbsContainer = slider.querySelector(
        ".product__gallery-thumbs .swiper"
      );
      const mainContainer = slider.querySelector(
        ".product__gallery-main .swiper"
      );
      const thumbsWrapper = slider.querySelector(
        ".product__gallery-thumbs-wrapper"
      );

      const checkScrollable = (thumbsSwiper) => {
        console.log("Is beginning", thumbsSwiper.isBeginning);
        console.log("Is end", thumbsSwiper.isEnd);
        console.log("Progress", thumbsSwiper.progress);
        if (!thumbsSwiper.isBeginning) {
          thumbsWrapper.classList.add("scrollable-top");
        } else {
          thumbsWrapper.classList.remove("scrollable-top");
        }

        if (!thumbsSwiper.isEnd) {
          thumbsWrapper.classList.add("scrollable-bottom");
        } else {
          thumbsWrapper.classList.remove("scrollable-bottom");
        }
      };

      const thumbsSwiper = new Swiper(thumbsContainer, {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 10,
        watchSlidesProgress: false,
        navigation: {
          nextEl: slider.querySelector(".product__gallery-arrow--down"),
          prevEl: slider.querySelector(".product__gallery-arrow--up"),
        },
        init: false,
        on: {
          init: (swiper) => {
            checkScrollable(swiper);
          },
          slideChange: (swiper) => {
            checkScrollable(swiper);
          },
          slideChangeTransitionEnd: (swiper) => {
            checkScrollable(swiper);
          },
          reachEnd: (swiper) => {
            checkScrollable(swiper);
            console.log("Reached end");
          },
          reachBeginning: (swiper) => {
            checkScrollable(swiper);
            console.log("Reached end");
          },
        },
      });

      thumbsSwiper.init();

      const mainSwiper = new Swiper(mainContainer, {
        slidesPerView: 1,
        spaceBetween: 0,
        thumbs: {
          swiper: thumbsSwiper,
          autoScrollOffset: 1,
        },
      });

      sliderInstances.push([thumbsSwiper, mainSwiper]);
    });
    const likeBtn = product.querySelector(".product__like-btn");

    likeBtn?.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        likeBtn.classList.toggle("active");
      },
      {
        signal,
      }
    );

    const tabBtns = Array.from(
      product.querySelectorAll(".product__tabs-nav-btn")
    );
    const tabItems = Array.from(
      product.querySelectorAll(".product__tabs-item")
    );

    tabBtns.forEach((btn, btnIndex) => {
      btn.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          tabBtns.forEach((btn) => btn.classList.remove("active"));
          tabItems.forEach((item) => item.classList.remove("active"));
          tabBtns[btnIndex]?.classList.add("active");
          tabItems[btnIndex]?.classList.add("active");
        },
        {
          signal,
        }
      );
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
      productForm.addEventListener(
        "submit",
        async (event) => {
          event.preventDefault();
          productAddToCart.classList.remove("active");
          cartWrapper.classList.add("active");
          if (counterInput) counterInput.value = 1;
          if (minus) minus.disabled = false;
          if (plus) plus.disabled = false;
          const url = productForm.action;
          try {
            const response = await fetch(url, {
              method: "POST",
              body: new FormData(productForm),
              signal,
            });
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            const data = await response.text();
            console.log("Data", data);
          } catch (error) {
            console.log("Error", error);
          }
        },
        {
          signal,
        }
      );
      if (counter) {
        counterInput.addEventListener(
          "change",
          (event) => {
            const amount = event.target.valueAsNumber;
            if (amount === 0) {
              cartWrapper.classList.remove("active");
              productAddToCart.classList.add("active");
            }
          },
          {
            signal,
          }
        );
      }
    }

    return () => {
      controller.abort();
      sliderInstances.forEach(([thumbsSwiper, mainSwiper]) => {
        thumbsSwiper.destroy(true, true);
        mainSwiper.destroy(true, true);
      });
    };
  }
  elements.forEach((product) => {
    initProductCard(product);
  });

  window.vdvApi.initProductCard = initProductCard;
});
