import { mapDimensions } from "./world.js";
import _ from "lodash-es";

// console.log("🧔🏽💀🐾🐍🦴🌲🌳🎄🍅🔥♺");

class Entity {
  #health;
  #attack;
  #defense;
  #emoji;
  constructor(health, attack, defense, emoji) {
    this.#health = health;
    this.#attack = attack;
    this.#defense = defense;
    this.#emoji = emoji;
  }
  get getHealth() {
    return this.#health;
  }
  get getAttack() {
    return this.#attack;
  }
  get getDefense() {
    return this.#defense;
  }
  get getSprite() {
    return this.#emoji;
  }
  set setHealth(offset) {
    this.#health += offset;
  }
  set setAttack(offset) {
    this.#attack += offset;
  }
  set setDefense(offset) {
    this.#defense += offset;
  }
  set setSprite(emoji) {
    this.#emoji = emoji;
  }
}

class Player extends Entity {
  #posX;
  #posY;
  constructor(health, attack, defense, emoji, posX = 0, posY = 0) {
    super(health, attack, defense, emoji);
    this.#posX = posX;
    this.#posY = posY;
  }
  getPosition() {
    return { posX: this.#posX, posY: this.#posY };
  }

  // returns true if movement is valid, otherwise false
  setPosition({ xOffset, yOffset }) {
    this.#posX += xOffset;
    this.#posY += yOffset;
    if (this.#posX < 0 || this.#posX > mapDimensions.width) {
      this.#posX = _.clamp(this.#posX, 0, mapDimensions.width);
      return false;
    }
    if (this.#posY < 0 || this.#posY > mapDimensions.height) {
      this.#posY = _.clamp(this.#posY, 0, mapDimensions.height);
      return false;
    }
    return true;
  }
}

export { Player };