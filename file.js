const rockBtn = document.getElementById('rock')
const paperBtn = document.getElementById('paper')
const scissorsBtn = document.getElementById('scissors')
const choiceEl = document.getElementById('choice-el');
const startBtn = document.getElementById('start-btn')
const score = document.getElementById('score')
const roundWinner = document.getElementById('round-winner')

let playerPts = 0;
let computerPts = 0;
let pick;
let isAlive = false;

[rockBtn,paperBtn,scissorsBtn].forEach( btn =>{
  btn.addEventListener("mousedown", (e)=>{
    const {id} = e.target
    const pick = (id === "rock") 
      ? "rock" 
      : (id === "paper") ? "paper" : "scissors";
    Game(pick);
  })
})

function Game(_pick) {
    if (isAlive) {
        let choice1 = getPlayerImoji(_pick);
        let choice2 = getComputerImoji();
            
        let choices = `
            <p>Computer:${choice2}</p>
            <p>You:${choice1}</p>
        `
        choiceEl.innerHTML = choices;  
      
        let winner = RoundWin(choice1, choice2)
        roundWinner.textContent = `${winner}`;
        score.innerHTML = `
            <p>Computer: ${computerPts}</p>
            <p>Your Score: ${playerPts}</p>
        `
        
        if (computerPts ===5 || playerPts === 5) {           
            let overAllDecision = OverAllWinner(playerPts, computerPts);
            roundWinner.textContent = overAllDecision;

            isAlive = false; 
            choiceEl.innerHTML =""
            score.textContent = ""
            computerPts *= 0; playerPts *=0;
        
        }
    }
}

function getPlayerImoji(_pick) {
    let choice=""
    switch (_pick) {
        case "rock":
            choice = "✊";
            break;
        case "paper":
            choice= "✋";
            break;
        case "scissors":
            choice = "✌";
            break;
        default:
            break;
    }
    
    return choice;
}

function getComputerImoji() {  
    let randmNum = Math.floor(Math.random() * 3) + 1;
        let choice
        switch (randmNum) {
            case 1:
                choice = "✊";
                break;
            case 2:
                choice = "✋";
                break;
            case 3:
                choice = "✌";
                break;
            default:
                getComputerImoji();
                break;   
        }
    return choice;
}

function RoundWin(_choice1, _choice2){
    let decision = ""
    
    if ( (_choice1 === "✊" && _choice2 === "✊") || (_choice1 === "✋" && _choice2 === "✋") || (_choice1 === "✌" && _choice2 === "✌") ){
        decision ="Draw!"
    }
    else if ( (_choice1 === "✋" && _choice2 === "✊") || (_choice1 === "✌" && _choice2 === "✋") || (_choice1 === "✊" && _choice2 === "✌") ){
        decision = `${_choice1} beats ${_choice2}`
        playerPts++;      
    }
    else if ( (_choice1 === "✊" && _choice2 === "✋") || (_choice1 === "✋" && _choice2 === "✌") || (_choice1 === "✌" && _choice2 === "✊") ){
        decision = `${_choice2} beats ${_choice1}`
        computerPts++;
    }
    return decision;  
}

function OverAllWinner(_playerPoints, _computerPoints) {
    let finalDecision =""
    if (_playerPoints > _computerPoints) {
        finalDecision = "You Won!!";
    }
    else if (_playerPoints < _computerPoints) {       
        finalDecision = "You Lost";
    }
    else if (_playerPoints === _computerPoints) { 
        finalDecision ="It's a Tie!!!"      
    } 
    startBtn.style.display = "block";
    startBtn.innerText = "Start Over";
    return finalDecision;
  
}
function handleClick(e) {
  isAlive = true;
  startBtn.style.display = "none";
  roundWinner.innerText = "Choose you weapon"
}
