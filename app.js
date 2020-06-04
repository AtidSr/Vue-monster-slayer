new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },

    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turnsLogs(damage, "Player hits Monster for ");
      if (this.checkWin()) return;
      this.monsterAttack();
    },

    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turnsLogs(damage, "Player hits Monster hard for ");
      if (this.checkWin()) return;
      this.monsterAttack();
    },

    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
        this.turnsLogs(10, "Player heal for ");
      } else {
        this.playerHealth = 100;
      }
      this.monsterAttack();
    },

    giveUp: function () {
      this.gameIsRunning = false;
    },

    monsterAttack: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      if (this.checkWin());
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Plater for " + damage,
      });
    },

    turnsLogs: function (damage, text) {
      this.turns.unshift({
        isPlayer: true,
        text: text + damage,
      });
    },

    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return false;
      }
    },
  },
});
