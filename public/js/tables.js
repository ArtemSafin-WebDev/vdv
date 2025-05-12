document.addEventListener("DOMContentLoaded", () => {
  const tables = Array.from(document.querySelectorAll("table:not([class])"));

  tables.forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
});
