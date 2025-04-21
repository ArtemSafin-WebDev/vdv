document.addEventListener("DOMContentLoaded", () => {
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  const elements = Array.from(document.querySelectorAll(".js-countdown-timer"));

  elements.forEach((element) => {
    const deadline = element.getAttribute("data-deadline");
    const hours = element.querySelector(".js-hours");
    const minutes = element.querySelector(".js-minutes");
    const seconds = element.querySelector(".js-seconds");
    let timeinterval = setInterval(() => {
      const t = getTimeRemaining(deadline);
      hours.innerHTML = t.hours
        .toString()
        .padStart(2, "0")
        .split("")
        .map(
          (item) =>
            `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
        )
        .join("");
      minutes.innerHTML = t.minutes
        .toString()
        .padStart(2, "0")
        .split("")
        .map(
          (item) =>
            `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
        )
        .join("");
      seconds.innerHTML = t.seconds
        .toString()
        .padStart(2, "0")
        .split("")
        .map(
          (item) =>
            `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
        )
        .join("");

      if (t.total <= 0) {
        clearInterval(timeinterval);
        hours.innerHTML = Number(0)
          .toString()
          .padStart(2, "0")
          .split("")
          .map(
            (item) =>
              `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
          )
          .join("");
        minutes.innerHTML = Number(0)
          .toString()
          .padStart(2, "0")
          .split("")
          .map(
            (item) =>
              `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
          )
          .join("");
        seconds.innerHTML = Number(0)
          .toString()
          .padStart(2, "0")
          .split("")
          .map(
            (item) =>
              `<span class="catalog__promo-countdown-group-value-number">${item}</span>`
          )
          .join("");
      }
    }, 1000);
  });
});
