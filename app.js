async function loadDays() {
  const grid = document.getElementById("countdown-grid");
  const empty = document.getElementById("empty-state");

  try {
    const response = await fetch("days.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load days.json");

    const days = await response.json();
    days.sort((a, b) => Number(a.id) - Number(b.id));

    if (!days.length) {
      empty.classList.remove("hidden");
      return;
    }

    for (const day of days) {
      const link = document.createElement("a");
      link.className = "day-card";
      link.href = `day.html?id=${encodeURIComponent(day.id)}`;

      const number = document.createElement("span");
      number.className = "day-number";
      number.textContent = String(day.id).padStart(2, "0");

      const label = document.createElement("span");
      label.className = "day-card-label";
      label.textContent = "open memory";

      link.append(number, label);
      grid.appendChild(link);
    }
  } catch (error) {
    console.error(error);
    empty.textContent = "Something went wrong loading the memories.";
    empty.classList.remove("hidden");
  }
}

document.getElementById("secret-button")?.addEventListener("click", () => {
  // Replace this with your own easter egg.
  // Example: window.location.href = "crossword.html";
  document.body.classList.toggle("secret-revealed");
});

loadDays();
