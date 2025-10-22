const games = [
  { name: "Flappy Bird", thumbnail: "assets/images/flappy.png", path: "games/flappy" },
  { name: "Snake", thumbnail: "assets/images/snake.png", path: "games/snake" }
];

const grid = document.getElementById('game-grid');

games.forEach(game => {
  const card = document.createElement('a');
  card.href = `${game.path}.html`;
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${game.thumbnail}" alt="${game.name}">
    <h3>${game.name}</h3>
  `;
  grid.appendChild(card);
});
