import inquirer from "inquirer";
import { mapDimensions, initializeWorld, printWorld } from "./world.js";
import { Enemy, Player } from "./entities.js";

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
  while (true) {
    printPlayer(player);
    printWorld(player);
    await move(player);

    const enemy1 = new Enemy(5, 2, 5, "🐍");
    enemy1.attack(player);
  }
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
  player.setPosition(movement);
};

const printPlayer = (player) => {
  // console.log(`Player: ${player.getSprite}\nHealth: ${player.getHealth}\nAttack: ${player.getAttack}\nDefense: ${player.getDefense}`);
  console.log(`${player.getSprite} ➡️ ❤️‍🩹${player.getHealth} | ⚔️ ${player.getAttack} | 🛡️ ${player.getDefense}`);
};

const startGame = () => {
  const player = new Player(10, 5, 5, "🧌 ");
  initializeWorld();

  gameLoop(player);
};

startGame();