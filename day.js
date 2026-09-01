function getDayId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadDay() {
  const content = document.getElementById("day-content");
  const label = document.getElementById("day-label");
  const id = getDayId();

  if (!id) {
    content.innerHTML = `
      <div class="error-card">
        <h1>Hmm.</h1>
        <p>This memory doesn't have a day number.</p>
        <a href="index.html">Go home</a>
      </div>`;
    return;
  }

  try {
    const response = await fetch("days.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load days.json");

    const days = await response.json();
    const day = days.find(item => String(item.id) === String(id));

    if (!day) {
      content.innerHTML = `
        <div class="error-card">
          <h1>Not yet ❤️</h1>
          <p>This memory hasn't been added yet.</p>
          <a href="index.html">Go home</a>
        </div>`;
      return;
    }

    label.textContent = `day ${String(day.id).padStart(2, "0")}`;

    // iframe is deliberate: each day can be a completely independent HTML page,
    // with its own CSS and JavaScript, without needing to modify this renderer.
    const frame = document.createElement("iframe");
    frame.className = "memory-frame";
    frame.title = `Memory for day ${day.id}`;
    frame.src = day.html;
    frame.setAttribute("loading", "eager");

    content.replaceChildren(frame);
  } catch (error) {
    console.error(error);
    content.innerHTML = `
      <div class="error-card">
        <h1>Oops.</h1>
        <p>I couldn't open this memory right now.</p>
        <a href="index.html">Go home</a>
      </div>`;
  }
}

loadDay();
