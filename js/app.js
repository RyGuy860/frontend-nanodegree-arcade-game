
var Enemy = function(x, y, speed) {
    'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //This defineds the speed each enemy will travel across the canvas.

    this.x += this.speed * dt;
    if (this.x > 508) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Controls the movement of the player
Player.prototype.handleInput = function(keyCode) {
    'use strict';
    if (keyCode == 'up') {
        this.y -= 83;
    }
    if (keyCode == 'down') {
        this.y += 83;
    }
    if (keyCode == 'left') {
        this.x -= 101;
    }
    if (keyCode == 'right') {
        this.x += 101;
    }
//Sets the max/min X and Y Axis boundaries
    if (this.x + 100 >= 500) {
        this.x = 505 - 100;
    } else if (this.x <= 0) {
        this.x = 1;
    }
    if (this.y >= 450) {
        this.y = 400;
    } else if (this.y <= -12) {
        this.y = 400;
        this.x = 200;
        console.log("You Win!!");
    }

};


//Resets Player to original starting point
Player.prototype.reset = function() {
    'use strict';
    this.x = 200;
    this.y = 400;
};
//Looks for collisions between enemy and player sprites
Player.prototype.checkCollisions = function() {
    'use strict';
    for (var i = 0, len = 3; i < len; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            console.log("game over");
            this.reset();


        }
    }
};

Player.prototype.update = function() {
    'use strict';
    this.checkCollisions();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);

var enemy1 = new Enemy(-45, 234, 350);
var enemy2 = new Enemy(-65, 151, 200);
var enemy3 = new Enemy(-25, 68, 400);
var allEnemies = [enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});