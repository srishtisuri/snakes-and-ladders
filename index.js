/* initialise global variables */
let game,
    gamePiece = '🟣',
    startingPosition = 1,
    finishPosition = 100,
    totalSquares = [...Array(finishPosition).keys()].map(x => x+1),
    snakes = [...totalSquares.filter(x => x % 9 === 0)],
    ladders = [25, 55],
    currentPosition = startingPosition,
    tempPosition;

/* dice roll function that returns a promise based on which the turn is completed*/
const rollDice = () => {
    return new Promise((resolve, reject) => {
        const roll = Math.floor(Math.random() * 6 + 1);
        console.log(`You rolled a ${roll}`);

        tempPosition = currentPosition + roll;
        if (tempPosition < finishPosition || tempPosition === finishPosition) resolve(roll);
        else reject(roll);
    });
};

/*
    handles all scenarios for a valid dice roll 
    1 - land on a snake (move back 3 spaces)
    2 - land on a ladder (move up 10 spaces)
    3 - land on the last square of the board (win the game) 
*/ 
const handleValidRoll = (roll) => {
    currentPosition += roll;
    if (tempPosition < finishPosition) {
        console.log(`You are now at square ${currentPosition}`);

        if (snakes.includes(tempPosition)) {
            console.log('🐍 Oh no! There is a snake!');
            currentPosition -= 3;
            console.log(`You have been sent back to square ${currentPosition}`);
        } else if (ladders.includes(tempPosition)) {
            console.log('🪜 Jackpot! You see a ladder!');
            currentPosition += 10;
            console.log(`You have been sent ahead to square ${currentPosition}`);
        }
    } else {
        console.log(`Congratulations, you won the game!`);
        clearInterval(game);
    }
    console.log('------------------------------------');
};

/* 
    handles all scenarios for an invalid dice roll 
    1 - your piece can only move up till the last square
*/ 
const handleInvalidRoll = (roll) => {
    if (tempPosition > finishPosition) {
        console.log(`You cannot move ahead`);
        console.log(`You are still at square ${currentPosition}`);
    };
    console.log('------------------------------------');
};

/* moves the game piece to its new position */
const movePiece = () => {
    const currentSpot = document.getElementsByClassName('active');
    if (currentSpot.length > 0) { 
        currentSpot[0].innerHTML = currentSpot[0].getAttribute('id').split('-')[1]; 
        currentSpot[0].classList.remove('active');
    };

    const newSpot = document.getElementById(`cell-${currentPosition}`);
    newSpot.classList.add('active');
    newSpot.innerHTML = gamePiece;
};

/* main function */
const play = () => {
    document.getElementById('play').setAttribute('disabled', '');

    console.log(`Welcome to Snakes & Ladders!`)
    console.log(`Your starting position is ${currentPosition}`)
    console.log('------------------------------------');

    game = setInterval(() => {
        rollDice()
        .then((roll) => {
            handleValidRoll(roll);
            movePiece();
        })
        .catch((roll) => handleInvalidRoll(roll));
    }, 1000);
};

/* drives the functionality of the reset button so that user can reinitiate */
const reset = () => {
    clearInterval(game);
    currentPosition = startingPosition;
    movePiece();
    document.getElementById('play').removeAttribute('disabled');
};

/* main render function to paint dom */
const render = () => {
    /* heading */
    const heading = document.createElement('h1');
    heading.innerHTML = 'Snakes & Ladders';
    document.body.appendChild(heading);

    /* table */
    const board = document.createElement('table');
    board.setAttribute('id', 'board');
    document.body.appendChild(board);

    /* rows */
    const rows = [...Array(10).keys()]
    .map((x) => x+1)
    .map((x) => {
        const row = document.createElement('tr');
        row.setAttribute('id', `row-${x}`);
        return row;
    }).reverse();

    /* cells */
    const cells = [...totalSquares]
    .map((x) => {
        const cell = document.createElement('td');
        cell.setAttribute('id', `cell-${x}`);
        cell.innerHTML = x;
        return cell;
    });

    let sortedCells = [];
    for (let i = 10; i > 0; i--) {
        const index = i*10;
        const poppedItems = cells.slice(index - 10, index);
        if (i % 2 === 0) {
            poppedItems.reverse();
        }
        sortedCells = [...sortedCells, poppedItems];
    };

    /* add cells to rows */
    for (let i in rows) {
        for (let i in sortedCells) {
            rows[i].append(...sortedCells[i]);
        }
        board.append(rows[i]);
    };

    /* add snakes and ladders */
    for (let i of snakes) {
        const snakeCell = document.getElementById(`cell-${i}`);
        snakeCell.setAttribute('class', 'snake');
    };

    for (let i of ladders) {
        const ladderCell = document.getElementById(`cell-${i}`);
        ladderCell.setAttribute('class', 'ladder');
    };

    /* add game piece to starting position */
    const startingSquare = document.getElementById(`cell-${currentPosition}`);
    startingSquare.setAttribute('class', 'active');
    startingSquare.innerHTML = gamePiece;

    /* play button */
    const playBtn = document.createElement('button');
    playBtn.setAttribute('onclick', 'play()');
    playBtn.setAttribute('id', 'play');
    playBtn.innerHTML = 'Play';
    document.body.append(playBtn);

    /* reset button */
    const exitBtn = document.createElement('button');
    exitBtn.setAttribute('onclick', 'reset()');
    exitBtn.setAttribute('id', 'reset');
    exitBtn.innerHTML = 'Reset';
    document.body.append(exitBtn);
};

render();