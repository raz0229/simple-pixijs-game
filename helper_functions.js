"use strict";

const Direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
  };
const SAFE_REGION = 64;

function colorRect(leftX, topY, width, height, color)
{
    canvas_context.fillStyle = color;
    canvas_context.fillRect(leftX, topY, width, height);
}


function randomInt(min, max)
{
    return Math.floor(min + (Math.random() * (max - min)));
}


function random(min, max)
{
    return min + (Math.random() * (max - min));
}

function updateEnemyPosition(critter, speed, width, height)
{
    const position = randomInt(1, 5);
    switch (position) {
        case Direction.UP:
            if (!(critter.y <= 0))
                critter.y -= speed;
            break;
        case Direction.DOWN:
            if (!(critter.y >= height - SAFE_REGION))
                critter.y += speed;
            break;
        case Direction.LEFT:
            if (!(critter.x <= 0))
                critter.x -= speed;
            break;
        case Direction.RIGHT:
            if (!(critter.x >= width - SAFE_REGION))    
                critter.x += speed;
            break;
    }
}

function movePlayer(keyCode, player, PLAYER_MOVE_SPEED, width, height)
{
    switch(keyCode) {
        case 37:    // LEFT key pressed
            if (!(player.x <= 0))
                player.x -= PLAYER_MOVE_SPEED;
                break;
        case 38:    // UP key pressed
            if (!(player.y <= 0))
                player.y -= PLAYER_MOVE_SPEED;
                break;
        case 39:    // RIGHT key pressed
            if (!(player.x >= width))   
                player.x += PLAYER_MOVE_SPEED;
                break;
        case 40:    // DOWN key pressed
            if (!(player.y >= height))
                player.y += PLAYER_MOVE_SPEED;
                break;
    }
}

function hasReachedTarget(player, target)
{
    if ((player.x >= target.x - 16) && (player.x <= target.x + 16))
    {
        if ((player.y >= target.y - 16) && (player.y <= target.y + 16))
            return true;
    }
    return false;
}

function hasCollided(player, critters)
{
    for (let target of critters) {
        if ((player.x >= target.x - 16) && (player.x <= target.x + 16))
        {
            if ((player.y >= target.y - 16) && (player.y <= target.y + 16))
                return true;
        }
    }
    
    return false;
}