// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // set initial location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // reset bugs position when hit border
    if (this.x > 600) {
        this.x = -50;
    }

    // reset player position when collide with enemy-bug
    if (player.x > (this.x - 50) && player.x < (this.x + 50) && player.y > (this.y - 50) && player.y < (this.y + 50)) {
        player.resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var initialPlayerX = 200;
var initialPlayerY = 404;

var Player = function() {
    // set player initial location
    this.x = initialPlayerX;
    this.y = initialPlayerY;

    // load player image
    this.sprite = 'images/char-boy.png';
};

// alert when player reach water and reset player position
Player.prototype.update = function() {
    if (this.y <= 0) {
        alert("You won!");
        this.resetPlayer();
    }
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// moves the player up, down, left, right
Player.prototype.handleInput = function(keyUp) {
    if (keyUp === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (keyUp === 'right' && this.x < 400) {
        this.x = this.x + 101;
    } else if (keyUp === 'up' && this.y > 0) {
        this.y = this.y - 83;
    } else if (keyUp === 'down' && this.y < 404) {
        this.y = this.y + 83;
    }
};

Player.prototype.resetPlayer = function() {
    this.x = initialPlayerX;
    this.y = initialPlayerY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Instantiate all 3 enemies with random speed - one enemy for each row
for (var i = 0; i < 3; i++) {
    var randomSpeed = Math.floor(Math.random() * 5 + Math.random() * 5) * 100;
    allEnemies.push(new Enemy(-50, (85 * i) + 60, randomSpeed));
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});