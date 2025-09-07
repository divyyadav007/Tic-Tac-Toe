let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // true -> 0's turn, false -> X's turn

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// --- Box click event ---
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

// --- Utility Functions ---
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // hide winner/tie message
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showTie = () => {
    msg.innerText = "🤝 Game Tied!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// --- Check Winner ---
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText.trim();
        let pos2val = boxes[pattern[1]].innerText.trim();
        let pos3val = boxes[pattern[2]].innerText.trim();

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);
                winnerFound = true;
                break;
            }
        }
    }

    // ✅ Tie check
    if (!winnerFound) {
        let allFilled = true;
        boxes.forEach((box) => {
            if (box.innerText.trim() === "") {
                allFilled = false;
            }
        });
        if (allFilled) {
            showTie();
        }
    }
};

// --- Event Listeners ---
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
