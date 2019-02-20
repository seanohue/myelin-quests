# myelin-quests

A place to put custom QuestGoal types and behaviors/libraries related to questing in the Ranvier-based game Myelin.

## Myelin Quest Goals

### LocationGoal

A quest goal requiring the player visits specific room(s)

Configuration:
```yaml
title: 'Goal Title' # what the player will see when they get the quest
rooms:
 - 'newbieschool:entrance' # list of IDs of rooms
inOrder: true # defaults to false, if true then the rooms must be visited in the order they are defined in the list above.
```

#### LocationGoal Future Features

- A way to specify that the quest can be completed by going to any one of the rooms in the list, or a specific number of them (but not all)
- A way to specify area(s) to be visited rather than just rooms.

## Myelin Quest Behaviors

### Start Quest

This behavior can be configured as follows:

```yaml
behaviors:
  startquest: 'intro:adventure_begins'

# or

behaviors:
  startquest:
    questId: 'adventure_begins' # if defined in the intro area, the prefix is not needed.
```

This configuration is common to the NPC and Room variations of the behavior.

#### Room variation

This variation starts the quest when the player enters a room.

#### NPC variation

This variation starts the quest when the `playerEnter` event is fired on an NPC.

#### Startquest Future Features

- Quest should also start if a quest giver NPC spawns in the same room as the player, or if the NPC is mobile and moves into the same room as a stationary player.
- NPCs should be configurable to start quest on other events, e.g. after being killed by a player, given an item by a player, or seeing a player with an item in their inventory, etc.
- Rooms should be able to give a quest when a player spawns in that room.

#### Chores

- Modularize common logic between the two startquest behaviors.
