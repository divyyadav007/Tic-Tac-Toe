let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")


let turn0 = true; //playerX , playerY 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {

            box.innerText = "0";
            box.style.color = "blue";   // 0 in Blue

            turn0 = false;

        } else {
            box.innerText = "X";
            box.style.color = "red";    // X in Red

            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disbleBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const resetGame = () => {
    turn0 = true;
    enableBoxes(); // allow new moves
    msgContainer.classList.add("hide"); // hide winner message
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disbleBoxes();
};
const showTie = () => {
    msg.innerText = "Game Tied! 🤝";
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);
                winnerFound = true;
                break;
            }
        }
    }

    // ✅ If no winner and all boxes filled → tie
    if (!winnerFound) {
        let allFilled = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                allFilled = false;
            }
        });
        if (allFilled) {
            showTie();
        }
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);