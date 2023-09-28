# Snakes & Ladders
Take a trip down memory lane with a game of Snakes &amp; Ladders. Built with Vanilla `HTML`, `JavaScript`, and `CSS` with no external NPM dependencies.

srishtisuri.github.io/snakes-and-ladders/

## Rules

1. Each roll of the dice results in the piece being moved X number of squares
2. If the piece lands on a snake (squares that are multiples of 9), it is moved back 3 squares
3. If the piece lands on a ladder (square 25 or 55), it is moved ahead 10 squares 
4. Towards the end of the game, the piece will not move unless the dice roll keeps it within the maximum number of squares
For example: if it is at square 98 and you roll a 5, the piece will not move
5. The game is won when the piece reaches the last square on the board

## How To Play

- Open up your browser DevTools and navigate to the 'Console' tab
- While the game is running, the moves will be logged onto the console
- Click the 'Play' button to start the game
- Once 'Play' is clicked, it will be disabled to prevent a concurrent game from being triggered
- You can click the 'Reset' button at any time. This will stop the game if it is running and will reset the game variables to their initial state

## Technical Notes

Snakes and Ladders was a vanilla `JS` challenge. It was timeboxed and built with some key considerations in mind, as best as time would permit.

### Scalability
The game variables that are initialised at the beginning of index.js have been intentionally abstracted out of the core methods. In a future state, these abstractions would be tested for alternate scenarios. For example, `finishPosition` is leveraged by `totalSquares` which in turn drives how big the board is.

### Readability
There were many sections of the code where shorthand and clever syntax could have been used. For example, some of the `if` statements could have been ternary operators or switch statements. However, this was forgone in favour of more intuitive and easily legible code.

### User Interface
The UI was not part of the original requirements but was built as a personal challenge. As certain controls were introduced to the UI, it created a need for some of the existing methods to be extended and for new code to be introduced. There are still ways in which the UI could be enhanced for a better user experience - this will be explored later.


## Future Improvement Ideas

- Make it multiplayer
- Show the game piece move to the snake and ladder pieces before redirecting
- Introduce a pause button
- Print the console logs somewhere in the UI
- Prevent square numbers from disappearing when the piece is on it
