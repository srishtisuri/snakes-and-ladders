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
- Type in `play()` and hit enter
- While the game is running, the moves will be logged onto the console

## Technical Notes

Snakes and Ladders was a vanilla `JS` challenge. It was timeboxed and built with some key considerations in mind, as best as time would permit.

### User Interface

The UI was not part of the original requirements but was built as a personal challenge. As certain controls were introduced to the UI, it created a need for some of the existing methods to be extended and for new code to be introduced. There are still ways in which the UI could be enhanced for a better user experience - this will be explored later.

## Future Improvement Ideas

- Make it multiplayer
- Show the game piece move to the snake and ladder pieces before redirecting
- Introduce a pause button
- Print the console logs somewhere in the UI
