const Application = PIXI.Application;
const Sprite = PIXI.Sprite;
const AnimatedSprite = PIXI.AnimatedSprite;
const Assets = PIXI.Assets;
const ticker = PIXI.Ticker.shared;

const sheet = await Assets.load('./assets/spritesheet.json');
const critterArray = [sheet.textures['critter.png'], sheet.textures['critter_2.png']];
const critters = new Array();

const SCREEN_WIDTH = 800//screen.availWidth - 32;
const SCREEN_HEIGHT = 800//screen.availHeight - 70;
const ENEMY_SPAWN_COUNT = 23;
const ENEMY_MOVE_SPEED = 8;
const PLAYER_MOVE_SPEED = 3;

let keyCode = 0;

// load sprites from spritesheet
const player = new Sprite(sheet.textures['target.png']);
const target = new Sprite(sheet.textures['player.png']);

const app = new Application({
   // width: 500,
   // height: 500,
    transparent: false,
    antialias: true
});
ticker.autoStart = false;

document.addEventListener('keydown', (x)=>{
    keyCode = x.keyCode;
    // movePlayer(x.keyCode, player, PLAYER_MOVE_SPEED);
})

const spawnStage = (count, app, ) => {

    target.x = randomInt(0, SCREEN_WIDTH);
    target.y = randomInt(0, SCREEN_HEIGHT);

    for (let i=0; i<count; i++) {
        critters.push(new AnimatedSprite(critterArray));
    }
    for (let critter of critters) {
        critter.animationSpeed = 0.03;
        critter.x = randomInt(0, SCREEN_WIDTH);
        critter.y = randomInt(0, SCREEN_HEIGHT);
        critter.play();

        // render on stage
        player.x = SCREEN_WIDTH;
        player.y = SCREEN_HEIGHT;

        app.stage.addChild(critter);
    }

    app.stage.addChild(player, target);
}

app.renderer.background.color = 0x000;
app.renderer.resize(window.innerWidth, window.innerHeight)
spawnStage(ENEMY_SPAWN_COUNT, app)

document.body.appendChild(app.view);

// MAIN GAME LOOP
ticker.stop();
function runGameLoop(time) {
    ticker.update(time);

    // move enemies randomly
    for (let critter of critters) {
        updateEnemyPosition(critter, ENEMY_MOVE_SPEED, SCREEN_WIDTH, SCREEN_HEIGHT)
    }

    movePlayer(keyCode, player, PLAYER_MOVE_SPEED, SCREEN_WIDTH, SCREEN_HEIGHT);

    requestAnimationFrame(runGameLoop);

    if (hasReachedTarget(player, target))
    {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.win').style.display = 'block';
    }

    if (hasCollided(player, critters))
    {
        document.querySelector('.overlay').style.display = 'block';
        document.querySelector('.lose').style.display = 'block';
    }

}

runGameLoop(performance.now());