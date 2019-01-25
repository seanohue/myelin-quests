# Myelin Quest Goals

## LocationGoal

A quest goal requiring the player visits specific room(s)

Configuration:
```yaml
title: 'Goal Title' # what the player will see when they get the quest
rooms:
 - 'newbieschool:entrance' # list of IDs of rooms
inOrder: true # defaults to false, if true then the rooms must be visited in the order they are defined in the list above.
```

Future Features:

- A way to specify that the quest can be completed by going to any one of the rooms in the list, or a specific number of them (but not all)
- A way to specify area(s) to be visited rather than just rooms.