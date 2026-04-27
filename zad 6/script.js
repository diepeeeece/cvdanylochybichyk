console.log("Strona załadowana pomyślnie. Numer indeksu: 68025");

// --- ZADANIE 4: ZMIANA MOTYWU I UKRYWANIE SEKCJI ---
const themeStyle = document.getElementById("theme-style");
const themeToggleBtn = document.getElementById("theme-toggle");
const projectsSection = document.getElementById("projects-section");
const toggleProjectsBtn = document.getElementById("toggle-projects-btn");

themeToggleBtn.addEventListener("click", function () {
  if (themeStyle.getAttribute("href") === "red.css") {
    themeStyle.setAttribute("href", "green.css");
    themeToggleBtn.innerText = "🎨 Zmień motyw na Czerwony";
  } else {
    themeStyle.setAttribute("href", "red.css");
    themeToggleBtn.innerText = "🎨 Zmień motyw na Zielony";
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

// --- ZADANIE 5: WALIDACJA FORMULARZA ---
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
  if (!imie) showError("error-imie", "Imię jest wymagane.");
  else if (hasNumbers.test(imie))
    showError("error-imie", "Imię nie może zawierać cyfr.");

  if (!nazwisko) showError("error-nazwisko", "Nazwisko jest wymagane.");
  else if (hasNumbers.test(nazwisko))
    showError("error-nazwisko", "Nazwisko nie może zawierać cyfr.");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) showError("error-email", "E-mail jest wymagany.");
  else if (!emailRegex.test(email))
    showError("error-email", "Podaj poprawny format adresu e-mail.");

  if (!wiadomosc) showError("error-wiadomosc", "Wiadomość nie może być pusta.");

  if (isValid) {
    console.log("Formularz poprawny!");
    formSuccess.style.display = "block";
    contactForm.reset();
  }
});

// --- ZADANIE 6: DANE Z JSON (FETCH) --
fetch("data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Błąd ładowania pliku JSON");
    return response.json();
  })
  .then((data) => {
    const skillsContainer = document.getElementById("skills-container");
    data.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${skill.category}:</strong> ${skill.details}`;
      skillsContainer.appendChild(li);
    });

    const projectsContainer = document.getElementById("projects-container");
    data.projects.forEach((project) => {
      const div = document.createElement("div");
      div.classList.add("timeline-item");
      div.innerHTML = `
                <div class="timeline-date">${project.date}</div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
      projectsContainer.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Błąd Fetch API:", error);
    document.getElementById("projects-container").innerHTML =
      '<p style="color:red;">Nie udało się załadować danych JSON. Spróbuj otworzyć stronę przez serwer (np. Live Server) lub sprawdź wersję na GitHub Pages.</p>';
  });
