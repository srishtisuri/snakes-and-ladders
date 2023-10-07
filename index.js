const checkSnake = (pos) => pos % 9 === 0;
const checkLadder = (pos) => [25, 55].includes(pos);
const checkOverflow = (pos) => pos > 100;
const placePiece = (pos) =>
  document.getElementById(`cell-${pos}`).classList.add("active");
const removePiece = (pos) => {
  document.getElementById(`cell-${pos}`).classList.remove("active") || null;
};

const rollDice = () => {
  return new Promise((res) => {
    res(Math.floor(Math.random() * 6) + 1);
  });
};

const calculateNewPosition = (tempPos) => {
  if (checkSnake(tempPos)) return tempPos - 3;
  else if (checkLadder(tempPos)) return tempPos + 10;
  else return tempPos;
};

const generateMsg = (tempPos) => {
  const isSnake = checkSnake(tempPos);
  const isLadder = checkLadder(tempPos);
  return isSnake ? `snake` : isLadder ? `ladder` : ``;
};

const play = async () => {
  let currPos = 1;
  console.log(`${currPos}`);
  const game = setInterval(async () => {
    removePiece(currPos);
    const roll = await rollDice();
    const tempPos = currPos + roll;
    const isValid = !checkOverflow(tempPos);
    const newPos = isValid ? calculateNewPosition(tempPos) : currPos;
    const text = generateMsg(tempPos);

    currPos = newPos;
    console.log(`${roll}-${text}${currPos}`);

    placePiece(currPos);
    if (currPos === 100) clearInterval(game);
  }, 1000);
};

const render = () => {
  const table = document.createElement("table");
  let id = 100;
  let tr;

  for (let i = 1; i < 11; i++) {
    tr = document.createElement("tr");
    tr.id = `row-${11 - i}`;
    let row = [];
    for (let j = 1; j < 11; j++) {
      td = document.createElement("td");
      td.id = `cell-${id}`;
      td.innerHTML = id;

      checkSnake(id) && (td.className = "snake");
      checkLadder(id) && (td.className = "ladder");

      row.push(td);
      id--;
    }
    i % 2 === 0 ? tr.append(...row.reverse()) : tr.append(...row);
    table.append(tr);
  }
  document.body.append(table);
  placePiece(1);
};

render();
