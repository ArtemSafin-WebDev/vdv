document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".page-header");
  if (!header) return;
  const searchToggleBtn = header.querySelector(
    ".page-header__search-toggle-btn"
  );
  searchToggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchToggleBtn.parentElement.classList.toggle("search-shown");
  });

  document.addEventListener("click", (event) => {
    if (
      event.target.matches(".page-header__search") ||
      event.target.closest(".page-header__search")
    ) {
      return;
    }
    navListItems.forEach((item) => {
      searchToggleBtn.parentElement.classList.remove("search-shown");
    });
  });

  const navListItems = Array.from(
    header.querySelectorAll(".page-header__nav-list-item")
  );
  // Check if device is not using mouse
  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;
  if (isTouch) {
    navListItems.forEach((item) => {
      const dropdown = item.querySelector(".page-header__catalog-dropdown");
      const link = item.querySelector(".page-header__nav-link");
      if (!dropdown) return;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        navListItems.forEach((otherItem) => {
          if (otherItem === item) return;
          otherItem.classList.remove("hovered");
        });
        item.classList.toggle("hovered");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        event.target.matches(".page-header__nav-list-item") ||
        event.target.closest(".page-header__nav-list-item")
      ) {
        return;
      }
      navListItems.forEach((item) => {
        item.classList.remove("hovered");
      });
    });

    const userBtn = header.querySelector(".page-header__user-btn");
    if (userBtn) {
      userBtn.addEventListener("click", function (e) {
        e.preventDefault();
        userBtn.parentElement.classList.toggle("user-menu-shown");
      });
      document.addEventListener("click", (event) => {
        if (
          event.target.matches(".page-header__user") ||
          event.target.closest(".page-header__user")
        ) {
          return;
        }
        userBtn.parentElement.classList.remove("user-menu-shown");
      });
    }
  }

  const burger = header.querySelector(".page-header__burger");
  if (burger) {
    burger.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle("menu-open");
    });
  }

  const bottom = header.querySelector(".page-header__bottom");
  if (bottom) {
    bottom.addEventListener("click", function (e) {
      if (e.target === bottom) document.body.classList.remove("menu-open");
    });
  }

  const backBtn = header.querySelector(".page-header__back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("menu-open");
    });
  }

  const catalogBlocks = Array.from(
    header.querySelectorAll(".page-header__catalog-block")
  );
  catalogBlocks.forEach((block) => {
    const dropdown = block.querySelector(
      ".page-header__catalog-categories-dropdown"
    );
    if (!dropdown) return;
    const btn = block.querySelector(".page-header__catalog-block-title");
    btn.addEventListener("click", (event) => {
      console.log("CLICKed");
      if (!window.matchMedia("(max-width: 576px)").matches) return;
      event.preventDefault();
      catalogBlocks.forEach((otherBlock) => {
        if (otherBlock === block) return;
        otherBlock.classList.remove("active");
      });
      block.classList.toggle("active");
    });
  });

  const showAllBtns = Array.from(
    header.querySelectorAll(".page-header__catalog-categories-show-more")
  );
  showAllBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      btn.parentElement.classList.toggle("all-shown");
    });
  });
});
