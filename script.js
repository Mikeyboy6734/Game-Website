const games = [
  {
    name: "Flappy Bird",
    image: "assets/images/flappy.png",
    start: function(container) {
      container.innerHTML = `<canvas id="flappy" width="320" height="480"></canvas>`;
      const canvas = document.getElementById('flappy');
      const ctx = canvas.getContext('2d');

      let bird = { x:50, y:150, w:20, h:20, dy:0 };
      let gravity = 0.6;
      let pipes = [];
      let frame = 0;
      let score = 0;

      function drawBird() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bird.x, bird.y, bird.w, bird.h);
      }

      function drawPipes() {
        ctx.fillStyle = "green";
        pipes.forEach(p => ctx.fillRect(p.x, 0, 30, p.top), ctx.fillRect(p.x, canvas.height - p.bottom, 30, p.bottom));
      }

      function update() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bird.dy += gravity;
        bird.y += bird.dy;

        if(frame % 90 === 0){
          let top = Math.random()*200 + 50;
          let bottom = 400 - top - 100;
          pipes.push({x:320, top, bottom});
        }

        pipes.forEach(p => p.x -= 2);
        pipes = pipes.filter(p => p.x > -30);

        pipes.forEach(p => {
          if(bird.x + bird.w > p.x && bird.x < p.x + 30 &&
             (bird.y < p.top || bird.y + bird.h > canvas.height - p.bottom)) {
            alert("Game Over! Score: " + score);
            container.innerHTML = "";
          }
        });

        pipes.forEach(p => {
          if(p.x + 30 === bird.x) score++;
        });

        drawBird();
        drawPipes();
        frame++;
        requestAnimationFrame(update);
      }

      document.addEventListener('keydown', () => bird.dy = -8);
      update();
    }
  },
  {
    name: "Snake",
    image: "assets/images/snake.png",
    start: function(container) {
      container.innerHTML = `<canvas id="snake" width="400" height="400"></canvas>`;
      const canvas = document.getElementById('snake');
      const ctx = canvas.getContext('2d');
      const box = 20;
      let snake = [{x: 8*box, y: 8*box}];
      let dir = "RIGHT";
      let food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};

      function draw() {
        ctx.fillStyle = "#111";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        snake.forEach((s,i)=>{
          ctx.fillStyle = i===0 ? "lime" : "green";
          ctx.fillRect(s.x, s.y, box, box);
        });

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let head = {...snake[0]};
        if(dir==="LEFT") head.x -= box;
        if(dir==="RIGHT") head.x += box;
        if(dir==="UP") head.y -= box;
        if(dir==="DOWN") head.y += box;

        if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(s=>s.x===head.x && s.y===head.y)){
          alert("Game Over!");
          container.innerHTML = "";
        }

        snake.unshift(head);
        if(head.x===food.x && head.y===food.y){
          food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
        } else {
          snake.pop();
        }
      }

      document.addEventListener('keydown', e=>{
        if(e.key==="ArrowLeft" && dir!=="RIGHT") dir="LEFT";
        if(e.key==="ArrowRight" && dir!=="LEFT") dir="RIGHT";
        if(e.key==="ArrowUp" && dir!=="DOWN") dir="UP";
        if(e.key==="ArrowDown" && dir!=="UP") dir="DOWN";
      });

      setInterval(draw, 100);
    }
  }
];

// Render game grid
const grid = document.getElementById('game-grid');
const container = document.getElementById('game-container');

games.forEach(game => {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `<img src="${game.image}" alt="${game.name}"><h3>${game.name}</h3>`;
  card.onclick = () => game.start(container);
  grid.appendChild(card);
});
                                
