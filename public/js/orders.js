document.addEventListener("DOMContentLoaded", () => {
  const orders = document.querySelectorAll(".account__orders");
  orders.forEach((order) => {
    const cards = order.querySelectorAll(".account__orders-card");
    cards.forEach((card) => {
      const btn = card.querySelector(".account__orders-card-btn");
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        cards.forEach((otherCard) => {
          if (card === otherCard) return;
          otherCard.classList.remove("active");
        });
        card.classList.toggle("active");
      });
    });
  });
});
