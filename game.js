import inquirer from "inquirer";
import { mapDimensions, initializeWorld, printWorld } from "./world.js";
import { Player } from "./entities.js";

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

const gameLoop = async () => {
  const moveResult = await promptMove();

};

gameLoop();