import _ from "lodash";

// width : height
const mapDimensions = {
  width: 50,
  height: 30
};

const treeSprites = ["🌲", "🌳", "🎄"];

class Tile {
  #destination = false;
  #discovered = false;
  #sprite;

  constructor(sprite) {
    this.#sprite = sprite;
  }

  setAsDestination() {
    this.#destination = true;
    this.#sprite = "🔥";
  }

  setAsDiscovered() {
    this.#discovered = true;
    this.#sprite = "🐾";
  }

  get getDiscovered() {
    return this.#discovered;
  }

  get getSprite() {
    return this.#sprite;
  }
}

// creates a world array with width and height dimensions 
const world = [...Array(mapDimensions.height)].map(e => Array(mapDimensions.width));
// sets the position to upper right corner (quadrant 1)
const destinationPos = { posX: mapDimensions.width - 1, posY: mapDimensions.height - 1 };

// world[i][j] => world[y][x]
const initializeWorld = () => {
  for (let i = 0; i < mapDimensions.height; ++i) {
    for (let j = 0; j < mapDimensions.width; ++j) {
      world[i][j] = new Tile(treeSprites[_.random(0, treeSprites.length - 1)]);
    }
  }

  world[destinationPos.posY][destinationPos.posX].setAsDestination();
};

// uses quadrant 1 for view (data structure uses quadrant 4)
const printWorld = (player) => {
  const playerPosition = player.getPosition();
  for (let y = mapDimensions.height - 1; y >= 0; --y) {
    for (let x = 0; x < mapDimensions.width; ++x) {
      if (playerPosition.posX === x && playerPosition.posY === y) {
        process.stdout.write(player.getSprite);
      }
      else
        process.stdout.write(world[y][x].getSprite);
    }
    console.log();
  }
};

const burnWorld = (player) => {
  const playerPosition = player.getPosition();
  for (let y = mapDimensions.height - 1; y >= 0; --y) {
    for (let x = 0; x < mapDimensions.width; ++x) {
      if (playerPosition.posX === x && playerPosition.posY === y) {
        process.stdout.write(player.getSprite);
      }
      else
        process.stdout.write(world[y][x].getSprite);
    }
    console.log();
  }
};

const getCurrentTile = (player) => {
  const { posX, posY } = player.getPosition();
  return world[posY][posX];
};

export { mapDimensions, initializeWorld, printWorld, destinationPos, getCurrentTile };