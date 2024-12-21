const canvas = document.getElementById('pongCanvas');
    const context = canvas.getContext('2d');

    const paddleWidth = 10, paddleHeight = 100;
    const ballSize = 10;
    let ballX = canvas.width / 2, ballY = canvas.height / 2;
    let ballSpeedX = 5, ballSpeedY = 5;
    let paddle1Y = (canvas.height - paddleHeight) / 2;
    let paddle2Y = (canvas.height - paddleHeight) / 2;
    const paddleSpeed = 10;

    function drawRect(x, y, width, height, color) {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    }

    function drawCircle(x, y, radius, color) {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    }

    function draw() {
      drawRect(0, 0, canvas.width, canvas.height, '#000');
      drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#fff');
      drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#fff');
      drawCircle(ballX, ballY, ballSize, '#fff');
    }

    function update() {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
      }

      if (ballX - ballSize < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
          ballSpeedX = -ballSpeedX;
        } else {
          resetBall();
        }
      }

      if (ballX + ballSize > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
          ballSpeedX = -ballSpeedX;
        } else {
          resetBall();
        }
      }
    }

    function resetBall() {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
    }

    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    window.addEventListener('keydown', function(event) {
      switch(event.key) {
        case 'w':
          paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
          break;
        case 's':
          paddle1Y = Math.min(paddle1Y + paddleSpeed, canvas.height - paddleHeight);
          break;
        case 'ArrowUp':
          paddle2Y = Math.max(paddle2Y - paddleSpeed, 0);
          break;
        case 'ArrowDown':
          paddle2Y = Math.min(paddle2Y + paddleSpeed, canvas.height - paddleHeight);
          break;
      }
    });

    gameLoop();
