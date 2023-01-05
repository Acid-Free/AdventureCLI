import inquirer from "inquirer";
import { initializeWorld, printWorld, destinationPos, getCurrentTile } from "./world.js";
import { Player, Enemy, Item } from "./entities.js";
import _ from "lodash";

const promptMove = async () => {
  const response = await inquirer.prompt([
    {
      name: "moveDirection",
      message: "Select move direction:",
      choices: ["Up", "Left", "Right", "Down"],
      type: "list"
    }
  ]);
  return response;
};

const gameLoop = async (player) => {
  console.log("Find the fire.");
  while (true) {
    printEntity(player);
    console.log();
    printWorld(player);
    console.log();
    // don't spawn enemy or items if movement is invalid
    if (!await move(player)) {
      console.log("You can't go there.");
      continue;
    }

    const currentTile = getCurrentTile(player);
    // spawns entities if current tile is undiscovered
    if (currentTile.getDiscovered === false) {
      console.log("You discover a new forest.");

      // sets the forest tile as discovered
      currentTile.setAsDiscovered();

      // 10% enemy spawn
      if (_.random(100) > 90) {
        console.log("You encountered an enemy.");
        const enemy1 = new Enemy(6, 6, 2, "🐍");
        printEntity(enemy1);
        initiateCombat(enemy1, player);
      }
      // 10% item spawn chance
      else if (_.random(100) > 90) {
        console.log("You found an item.");
        const item1 = new Item(5, 2, 1, "🍅");
        printEntity(item1);
        player.consumeItem(item1);
      }
      else {
        console.log("You didn't find a creature or an item.");
      }
    }
    else {
      console.log("You've been here before");
    }

    // check if player has reached the destination
    const { posX, posY } = player.getPosition();
    if (posX === destinationPos.posX && posY === destinationPos.posY) {
      console.log("You found the fire.\n");
      printWorld(player);
      break;
    }
  }
};

const initiateCombat = (entity1, entity2) => {
  let winner;
  let loser;
  let turn = 0;
  while (turn < 10) {
    entity1.attack(entity2);
    // entity 2 attacks if still alive
    if (!entity2.getDead) {
      entity2.attack(entity1);
      // loop breaks if entity 1 is dead
      if (entity1.getDead) {
        winner = entity2;
        loser = entity1;
        break;
      }
    }
    else {
      winner = entity1;
      loser = entity2;
      break;
    }
    ++turn;
  }
  if (winner == null)
    // console.log(`${entity1.getSprite} and ${entity2.getSprite} couldn't beat each other!`);
    console.log(`${entity1.getSprite} 🟰  ${entity2.getSprite}`);
  else
    console.log(`${winner.getSprite} ➡️ ${winner.getSprite}🏆 vs ${loser.getSprite} ➡️ 🦴`);
};

const move = async (player) => {
  const moveResult = await promptMove();
  const movement = { xOffset: 0, yOffset: 0 };
  switch (moveResult.moveDirection) {
    case "Up":
      movement.yOffset = 1;
      break;
    case "Left":
      movement.xOffset = -1;
      break;
    case "Right":
      movement.xOffset = 1;
      break;
    case "Down":
      movement.yOffset = -1;
      break;
  }
  return player.setPosition(movement);
};

const printEntity = (entity) => {
  console.log(`${entity.getSprite}   ❤️‍🩹${entity.getHealth} | ⚔️ ${entity.getAttack} | 🛡️ ${entity.getDefense}`);
};

const startGame = () => {
  const player = new Player(10, 5, 5, "🧌 ");
  initializeWorld();
  getCurrentTile(player).setAsDiscovered();

  gameLoop(player);
};

startGame();