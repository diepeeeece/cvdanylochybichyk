console.log("Strona załadowana pomyślnie. Numer indeksu: 68025");

const themeStyle = document.getElementById("theme-style");
const themeToggleBtn = document.getElementById("theme-toggle");
const projectsSection = document.getElementById("projects-section");
const toggleProjectsBtn = document.getElementById("toggle-projects-btn");

themeToggleBtn.addEventListener("click", function () {
  if (themeStyle.getAttribute("href") === "red.css") {
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

const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;
  formSuccess.style.display = "none";

  const imie = document.getElementById("imie").value.trim();
  const nazwisko = document.getElementById("nazwisko").value.trim();
  const email = document.getElementById("email").value.trim();
  const wiadomosc = document.getElementById("wiadomosc").value.trim();

  const showError = (id, message) => {
    document.getElementById(id).innerText = message;
    isValid = false;
  };
  const clearError = (id) => (document.getElementById(id).innerText = "");

  clearError("error-imie");
  clearError("error-nazwisko");
  clearError("error-email");
  clearError("error-wiadomosc");

  const hasNumbers = /\d/;
  if (!imie) {
    showError("error-imie", "Imię jest wymagane.");
  } else if (hasNumbers.test(imie)) {
    showError("error-imie", "Imię nie może zawierać cyfr.");
  }

  if (!nazwisko) {
    showError("error-nazwisko", "Nazwisko jest wymagane.");
  } else if (hasNumbers.test(nazwisko)) {
    showError("error-nazwisko", "Nazwisko nie może zawierać cyfr.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError("error-email", "E-mail jest wymagany.");
  } else if (!emailRegex.test(email)) {
    showError("error-email", "Podaj poprawny format adresu e-mail.");
  }

  if (!wiadomosc) {
    showError("error-wiadomosc", "Wiadomość nie może być pusta.");
  }
  if (isValid) {
    console.log("Formularz poprawny! (Zadanie 5)");
    formSuccess.style.display = "block";
    contactForm.reset();
  }
});
