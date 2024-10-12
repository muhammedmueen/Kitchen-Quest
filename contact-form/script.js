// Handle contact form submission
const contactForm = document.getElementById("contactForm");
const submitMsg = document.getElementById("submit-msg");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission
  submitMsg.classList.remove("d-none"); // Show the success message
});

// DARK LIGHT THEME
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected theme
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
} else {
  document.body.classList.add(darkTheme); // Default to dark theme
}

// Theme toggle button event listener
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem(
    "selected-theme",
    document.body.classList.contains(darkTheme) ? "dark" : "light"
  );
  localStorage.setItem(
    "selected-icon",
    themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun"
  );
});
