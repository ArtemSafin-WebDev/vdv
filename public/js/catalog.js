document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.querySelector(".catalog");
  if (!catalog) return;

  const sidebarCards = Array.from(
    catalog.querySelectorAll(".catalog__categories-card")
  );

  sidebarCards.forEach((card) => {
    const btn = card.querySelector(".catalog__categories-card-btn");
    btn?.addEventListener("click", (e) => {
      console.log("BTN TARGET", e.target);
      if (!e.target.matches(".catalog__categories-card-arrow")) return;
      e.preventDefault();
      sidebarCards.forEach((otherCard) => {
        if (otherCard === card) return;
        otherCard.classList.remove("active");
      });
      card.classList.toggle("active");
    });
  });
});
