import _ from "lodash";

// width : height
const mapDimensions = {
  width: 10,
  height: 5
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

  get getSprite() {
    return this.#sprite;
  }
}

// creates a world array with width and height dimensions 
const world = [...Array(mapDimensions.height)].map(e => Array(mapDimensions.width));

// world[i][j] => world[y][x]
const initializeWorld = () => {
  for (let i = 0; i < mapDimensions.height; ++i) {
    for (let j = 0; j < mapDimensions.width; ++j) {
      world[i][j] = new Tile(treeSprites[_.random(0, treeSprites.length - 1)]);
    }
  }

  // sets the position to upper right corner (quadrant 1)
  const destinationPos = { width: mapDimensions.width - 1, height: mapDimensions.height - 1 };
  world[destinationPos.height][destinationPos.width].setAsDestination();
};

// uses quadrant 1 for view (data structure uses quadrant 4)
const printWorld = (player) => {
  const playerPosition = player.getPosition();
  for (let y = mapDimensions.height - 1; y >= 0; --y) {
    for (let x = 0; x < mapDimensions.width; ++x) {
      if (playerPosition.posX === x && playerPosition.posY === y) {
        world[y][x].setAsDiscovered();
        process.stdout.write(player.getSprite);
      }
      else
        process.stdout.write(world[y][x].getSprite);
    }
    console.log();
  }
};

export { mapDimensions, initializeWorld, printWorld };