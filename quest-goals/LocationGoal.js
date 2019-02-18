'use strict';



module.exports = srcPath => {
  const QuestGoal = require(srcPath + 'QuestGoal');
  const Logger = require(srcPath + 'Logger');
  /**
   * A quest goal requiring the player visits specific room(s)
   */
  return class LocationGoal extends QuestGoal {
    constructor(quest, config, player) {
      config = Object.assign({
        title: 'Find Location',
        rooms: [],
        inOrder: false
      }, config);

      super(quest, config, player);

      this.state = {
        visited: []
      };

      this.player = player;

      // So that the listener can be removed on completion...
      this.checkForRoom = (room) => this._checkForRoom(player, room);

      this.player.on('enterRoom', this.checkForRoom);
    }

    get totalToVisit() {
      return this.config.rooms.length;
    }

    get totalVisited() {
      return this.state.visited.length;
    }

    getProgress() {

      const amount = Math.min(this.totalToVisit, this.totalVisited);
      const percent = (amount / this.totalToVisit) * 100;
      const display = `${this.config.title}: [${amount}/${this.totalToVisit}]`;
      return { percent, display };
    }

    complete(player) {
      player = player || this.player;
      if (this.totalVisited !== this.totalToVisit) {
        return;
      }

      player.removeListener('enterRoom', this.checkForRoom);

      super.complete();
    }

    _checkForRoom(player, room) {
      if (!room) {
        return Logger.warn('No room found for locationGoal...');
      }
      
      if (player.questTracker.isComplete(this.quest)) return;

      const roomRef = room.entityReference;

      if (this.config.inOrder === true) {
        if (this.config.rooms.includes(roomRef)) {
          const numberVisited = this.state.visited.length;
          if (this.config.rooms[numberVisited] === roomRef) {
            this.visited.push(roomRef);
            this.emit('progress', this.getProgress());
          }
        }
      } else {
        if (this.config.rooms.includes(roomRef) && !this.state.visited.includes(roomRef)) {
          this.state.visited.push(roomRef);
          this.emit('progress', this.getProgress());
        }
      }

      if (this.state.visited.length >= this.config.rooms.length) {
        return this.complete(player);
      }
    }
  };
};