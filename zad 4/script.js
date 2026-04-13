console.log("Strona załadowana pomyślnie. Numer indeksu: 12345");

const themeStyle = document.getElementById("theme-style");
const themeToggleBtn = document.getElementById("theme-toggle");
const projectsSection = document.getElementById("projects-section");
const toggleProjectsBtn = document.getElementById("toggle-projects-btn");

themeToggleBtn.addEventListener("click", function () {
  const currentTheme = themeStyle.getAttribute("href");

  if (currentTheme === "red.css") {
    themeStyle.setAttribute("href", "green.css");
    themeToggleBtn.innerText = "Zmień motyw na Czerwony";
  } else {
    themeStyle.setAttribute("href", "red.css");
    themeToggleBtn.innerText = "Zmień motyw na Zielony";
  }
});

toggleProjectsBtn.addEventListener("click", function () {
  if (projectsSection.style.display === "none") {
    projectsSection.style.display = "block";
    toggleProjectsBtn.innerText = "Ukryj sekcję Projekty";
  } else {
    projectsSection.style.display = "none";
    toggleProjectsBtn.innerText = "Pokaż sekcję Projekty";
  }
});
