document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-theme");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
  });
});
