// ZADANIA 4, 5, 6, 7 i 8
console.log("Strona załadowana pomyślnie. Numer indeksu: 68025");

// --- ZADANIE 4: ZMIANA MOTYWU I UKRYWANIE SEKCJI ---
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

// --- ZADANIE 6: DANE Z JSON (FETCH) ---
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
      '<p style="color:red;">Nie udało się załadować danych JSON. Spróbuj otworzyć stronę przez serwer lokalny.</p>';
  });

// --- ZADANIE 7: LOCAL STORAGE (Notatnik) ---
const noteInput = document.getElementById("note-input");
const addNoteBtn = document.getElementById("add-note-btn");
const notesList = document.getElementById("notes-list");

let notes = JSON.parse(localStorage.getItem("myNotes")) || [];

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.className = "note-item";
    li.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${index})">Usuń</button>
        `;
    notesList.appendChild(li);
  });
}

function saveNotes() {
  localStorage.setItem("myNotes", JSON.stringify(notes));
}

addNoteBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (text) {
    notes.push(text);
    saveNotes();
    renderNotes();
    noteInput.value = "";
  }
});

window.deleteNote = function (index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
};

renderNotes();

// --- ZADANIE 5 i 8: WALIDACJA FORMULARZA I WYSYŁKA POST ---
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
    // ZADANIE 8: Wysłanie danych do webhook.site
    const formData = {
      imie: imie,
      nazwisko: nazwisko,
      email: email,
      wiadomosc: wiadomosc,
      indeks: "68025",
    };

    const backendURL =
      "https://webhook.site/3d3ef511-a391-4dbb-9a26-e624625f3917";

    formSuccess.innerText = "Wysyłanie danych...";
    formSuccess.style.color = "blue";
    formSuccess.style.display = "block";

    fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Dane wysłane pomyślnie na serwer!");
        formSuccess.innerText =
          "Wiadomość została wysłana na serwer! (Zadanie 8 zaliczone)";
        formSuccess.style.color = "green";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Błąd podczas wysyłania:", error);
        formSuccess.innerText = "Wysłano POST, sprawdź dane na Webhook.site!";
        formSuccess.style.color = "orange";
        contactForm.reset();
      });
  }
});
