const games = [
  { title: "Flappy Minimal", thumb: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flappy-bird-icon.png", path: "games/flappy/index.html" },
  { title: "Snake Classic", thumb: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Arcade_game_icon.png", path: "games/snake/index.html" }
];

const gameList = document.getElementById('game-list');
const gameFrame = document.getElementById('game-frame');
const iframe = document.getElementById('iframe');
const backBtn = document.getElementById('back-btn');

games.forEach(game => {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `<img src="${game.thumb}" alt="${game.title}"><h2>${game.title}</h2>`;
  card.onclick = () => openGame(game.path);
  gameList.appendChild(card);
});

function openGame(path) {
  gameList.classList.add('hidden');
  gameFrame.classList.remove('hidden');
  iframe.src = path;
}

backBtn.onclick = () => {
  iframe.src = '';
  gameFrame.classList.add('hidden');
  gameList.classList.remove('hidden');
};
