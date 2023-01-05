import { mapDimensions } from "./world.js";
import _ from "lodash-es";

// console.log("🧔🏽💀🐾🐍🦴🌲🌳🎄🍅🔥♺");

class Entity {
  #dead = false;
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

  get getDead() {
    return this.#dead;
  }

  set updateHealth(offset) {
    this.#health += offset;
    this.#health = Math.max(0, this.#health);
    if (this.#health === 0) {
      this.#dead = true;
    }
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

  consumeItem(item) {
    const itemStats = item.getStats;
    this.updateHealth = itemStats.health;
    this.setAttack = itemStats.attack;
    this.setDefense = itemStats.defense;
    console.log("Player obtains item stats.");
  }

  attack(enemy) {
    let playerDamage = this.getAttack - enemy.getDefense;
    // ensures player attacks can't heal the target when attacking
    playerDamage = Math.max(0, playerDamage);
    enemy.updateHealth = -playerDamage;
    // console.log("Player attacks enemy");
  }
}

class Enemy extends Entity {
  constructor(health, attack, defense, emoji) {
    super(health, attack, defense, emoji);
  }

  attack(player) {
    let enemyDamage = this.getAttack - player.getDefense;
    // ensures enemy attacks can't heal the target when attacking
    enemyDamage = Math.max(0, enemyDamage);
    player.updateHealth = -enemyDamage;
    // console.log("Enemy attacks player");
  }
}

class Item extends Entity {
  constructor(health, attack, defense, emoji) {
    super(health, attack, defense, emoji);
  }
  getStats() {
    return {
      health: this.getHealth,
      attack: this.getAttack,
      defense: this.getDefense,
    };
  }
}

export { Player, Enemy, Item };