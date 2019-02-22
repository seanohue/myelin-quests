'use strict';
const {Logger} = require('ranvier');
module.exports = {
  listeners: {
    playerEnter: state => function (config, player) {
      let questId;

      if (typeof config === 'string') {
        questId = config;
      } else if (config && typeof config === 'object') {
        questId = config.questId;
      }

      if (!questId.includes(':')) {
        questId = `${this.area.name}:${questId}`;
      }

      if (!questId) {
        Logger.error(`No quest name configured in ${this.entityReference}`);
        return;
      }

      const quest = state.QuestFactory.create(state, config.questId, player);
      try {
        player.questTracker.start(quest);
      } catch (err) {
        Logger.warn(err);
      }
    }
  }
};
