// Local Storage Cookies
const popup = document.querySelector(".cookie");

if (localStorage.getItem("cookieEnabled")) {
  popup.style.display = "none";
}

function clicked(e, result) {
  if (!localStorage.getItem("cookieEnabled")) {
    localStorage.setItem("cookieEnabled", result);
    popup.style.display = "none";
  }
}

// Navigation Menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// API
async function fetchPlaylist() {
  const url =
    "https://corsproxy.io/?https://api.deezer.com/playlist/4739335388";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    const container = document.getElementById("playlist");
    container.innerHTML = "";

    if (data && data.tracks) {
      data.tracks.data.slice(0, 50).forEach((track) => {
        const html = `
              <div class="track">
                <img src="${track.album.cover_medium}" alt="Album cover" />
                <div class="info">
                  <strong>${track.title}</strong><br /><span class="gradient-text">
                  ${track.artist.name}<br /></span>
                  <a class="btn" href="${track.link}" target="_blank"><i class="ri-disc-fill"></i> Listen on Deezer</a>
                </div>
              </div>
            `;
        container.innerHTML += html;
      });
    } else {
      container.innerText = "No tracks found in the playlist.";
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
    document.getElementById("playlist").innerText = "Failed to load playlist.";
  }
}

fetchPlaylist();

// Form Validation
const form = document.getElementById("form");

const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const checkbox = document.getElementById("checkbox");
const email = document.getElementById("email");

const errorPwd1 = document.getElementById("error-pwd1");
const errorPwd2 = document.getElementById("error-pwd2");
const errorCheckbox = document.getElementById("error-checkbox");
const errorEmail = document.getElementById("error-email");

const success = document.getElementById("form-success");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = {};

  if (email.value === "") {
    errors.email = "Email Field Can Not Be Empty";
  }

  if (password1.value === "") {
    errors.pwd1 = "Password Field Can Not Be Empty";
  }

  if (password1.value !== password2.value) {
    errors.pwd2 = "Passwords Do Not Match";
  }

  if (!checkbox.checked) {
    errors.checkbox = "You Must Agree To Join Our Newsletter";
  }

  document
    .querySelectorAll(".form__error")
    .forEach((el) => (el.textContent = ""));

  for (let key in errors) {
    const error = document.getElementById("error-" + key);
    if (error) error.textContent = errors[key];
  }

  if (Object.keys(errors).length === 0) {
    form.reset();

    success.textContent = "You've Successfully Subscribed! 🎸";
  }
});

function emailValidation() {
  const emailValue = email.value;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!pattern.test(emailValue)) {
    errorEmail.textContent = "Invalid Email";
  } else {
    errorEmail.textContent = "";
  }

  if (emailValue === "") {
    errorEmail.textContent = "";
  }
}

email.addEventListener("keyup", emailValidation);

password1.addEventListener("input", () => {
  if (password1.value !== "") {
    errorPwd1.textContent = "";
  }

  if (password1.value === password2.value) {
    errorPwd2.textContent = "";
  }
});

password2.addEventListener("input", () => {
  if (password1.value === password2.value) {
    errorPwd2.textContent = "";
  }
});

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    errorCheckbox.textContent = "";
  }
});

// Scroll To Top
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
