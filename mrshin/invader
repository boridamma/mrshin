<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Invaders</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background: black;
        }
        canvas {
            display: block;
            background: #111;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;
        
        class Player {
            constructor() {
                this.width = 50;
                this.height = 50;
                this.x = canvas.width / 2 - this.width / 2;
                this.y = canvas.height - this.height - 10;
                this.speed = 5;
            }
            draw() {
                ctx.fillStyle = "cyan";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            move(direction) {
                if (direction === "left" && this.x > 0) this.x -= this.speed;
                if (direction === "right" && this.x + this.width < canvas.width) this.x += this.speed;
                if (direction === "up" && this.y > 0) this.y -= this.speed;
                if (direction === "down" && this.y + this.height < canvas.height) this.y += this.speed;
            }
        }
        
        class Projectile {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.width = 5;
                this.height = 15;
                this.speed = 7;
            }
            draw() {
                ctx.fillStyle = "yellow";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            update() {
                this.y -= this.speed;
            }
        }
        
        class Enemy {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.width = 40;
                this.height = 40;
                this.speed = 2;
            }
            draw() {
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) {
                    this.y = -this.height;
                    this.x = Math.random() * (canvas.width - this.width);
                }
            }
        }
        
        const player = new Player();
        const projectiles = [];
        const enemies = [];
        
        for (let i = 0; i < 5; i++) {
            enemies.push(new Enemy(Math.random() * (canvas.width - 40), Math.random() * -300));
        }
        
        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw();
            
            projectiles.forEach((p, index) => {
                p.update();
                p.draw();
                if (p.y + p.height < 0) projectiles.splice(index, 1);
            });
            
            enemies.forEach((enemy, enemyIndex) => {
                enemy.update();
                enemy.draw();
                projectiles.forEach((p, pIndex) => {
                    if (
                        p.x < enemy.x + enemy.width &&
                        p.x + p.width > enemy.x &&
                        p.y < enemy.y + enemy.height &&
                        p.y + p.height > enemy.y
                    ) {
                        projectiles.splice(pIndex, 1);
                        enemies.splice(enemyIndex, 1);
                        enemies.push(new Enemy(Math.random() * (canvas.width - 40), -40));
                    }
                });
            });
            requestAnimationFrame(gameLoop);
        }
        
        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") player.move("left");
            if (event.key === "ArrowRight") player.move("right");
            if (event.key === "ArrowUp") player.move("up");
            if (event.key === "ArrowDown") player.move("down");
            if (event.key === " ") {
                projectiles.push(new Projectile(player.x + player.width / 2 - 2.5, player.y));
            }
        });
        
        gameLoop();
    </script>
</body>
</html>
