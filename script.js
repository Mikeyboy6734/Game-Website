const games = [
  {
    title: "Flappy Bird",
    slug: "flappy",
    category: "arcade",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/0/0a/Flappy_Bird_icon.png",
    type: "iframe"
  },
  {
    title: "Snake",
    slug: "snake",
    category: "puzzle",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
    type: "iframe"
  },
  {
    title: "Box Clicker (Inline JS Example)",
    slug: "boxclicker",
    category: "action",
    thumbnail: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    type: "inline"
  }
];

const gameGrid = document.getElementById("gameGrid");
const searchBar = document.getElementById("searchBar");
const modal = document.getElementById("playerModal");
const iframe = document.getElementById("gameFrame");
const inlineContainer = document.getElementById("inlineContainer");
const closeBtn = document.getElementById("closeBtn");

function renderGames(filter = "all", search = "") {
  gameGrid.innerHTML = "";
  const filtered = games.filter(g =>
    (filter === "all" || g.category === filter) &&
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  filtered.forEach(g => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `<img src="${g.thumbnail}" alt="${g.title}"><h3>${g.title}</h3>`;
    card.onclick = () => openGame(g);
    gameGrid.appendChild(card);
  });
}

function openGame(game) {
  modal.classList.remove("hidden");
  if (game.type === "iframe") {
    iframe.src = `games/${game.slug}/index.html`;
    iframe.style.display = "block";
    inlineContainer.style.display = "none";
  } else {
    iframe.style.display = "none";
    inlineContainer.style.display = "block";
    inlineContainer.innerHTML = `
      <div id="clicker" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;">
        <button id="box" style="width:100px;height:100px;background:#00bcd4;border:none;border-radius:10px;cursor:pointer;font-size:1.5rem;">Click!</button>
        <p id="score">0</p>
      </div>`;
    let score = 0;
    document.getElementById("box").onclick = () => {
      score++;
      document.getElementById("score").textContent = score;
    };
  }
}

closeBtn.onclick = () => {
  modal.classList.add("hidden");
  iframe.src = "";
};

searchBar.oninput = (e) => renderGames(document.querySelector(".category.active").dataset.category, e.target.value);

document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGames(btn.dataset.category, searchBar.value);
  });
});

renderGames();

