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
                  <a class="btn" href="${track.link}" target="_blank">Listen on Deezer</a>
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
