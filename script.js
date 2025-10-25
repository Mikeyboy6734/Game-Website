const games = [
  {
    name: "Flappy Bird",
    thumbnail: "assets/images/flappy.png",
    path: "games/flappy/index.html"
  },
  {
    name: "Super Mario 64",
    thumbnail: "assets/images/sm64.jpeg",
    path: "games/SuperMario64/index.html" // points to N64Wasm page
  }
];

const grid = document.getElementById('game-grid');

games.forEach(game => {
  const card = document.createElement('a');
  card.href = game.path;          // link to game page
  card.target = "_blank";         // open in new tab
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${game.thumbnail}" alt="${game.name}">
    <h3>${game.name}</h3>
  `;
  grid.appendChild(card);
});
