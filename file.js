const RockButn = document.getElementById('rock')
const PaperButn = document.getElementById('paper')
const ScissorsButn = document.getElementById('scissors')
const choiceEl = document.getElementById('choice-El');
const RoundWinner = document.getElementById('round-Win');
const GameWinner = document.getElementById('game-Win');
const StartBtn = document.getElementById('start-Button')
const score = document.getElementById('score')

let PlayerPts = 0;
let ComputerPts = 0;
let pick;
let isAlive = false;

StartBtn.addEventListener('click', function(){
    isAlive = true;
})

RockButn.addEventListener('click', function () {
    pick = "rock"
    Game();
})

PaperButn.addEventListener('click', function () {
    pick = "paper"
    Game();
})

ScissorsButn.addEventListener('click', function () {
    pick = "scissors"
    Game();
})
console.log(pick)

function Game() {
    if (isAlive && pick) {
        let choice1 = Player(pick);
        let choice2 = Computer();
            
        let choices = `<h3> You: ${choice1} Computer: ${choice2}</h3>`
        choiceEl.innerHTML = choices;  
            
        let winner = RoundWin(choice1, choice2)
        RoundWinner.textContent = `${winner}`;
        score.textContent = `Player: ${PlayerPts}   Computer: ${ComputerPts}`
        
        if (ComputerPts ===5 || PlayerPts === 5) {
            let overAllDecision = OverAllWinner(PlayerPts, ComputerPts);
            RoundWinner.textContent = overAllDecision;
            isAlive = false;// isAlive is now declared false to allow the person to press start again, and start the game over.
        }
    }
}

function Player(_pick) {
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
    console.log(`player: ${choice}`)
    
    return choice;
}

function Computer() {
  
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
                Computer();
                break;   
        }
    console.log(`computer: ${choice}`)
    return choice;
}

function RoundWin(_choice1, _choice2){
    let decision = ""
    
    if ( (_choice1 === "✊" && _choice2 === "✊") || (_choice1 === "✋" && _choice2 === "✋") || (_choice1 === "✌" && _choice2 === "✌") ){
        decision ="Draw!!"
    }
    else if ( (_choice1 === "✋" && _choice2 === "✊") || (_choice1 === "✌" && _choice2 === "✋") || (_choice1 === "✊" && _choice2 === "✌") ){
        decision = `${_choice1} beats ${_choice2}`
        PlayerPts++;      
    }
    else if ( (_choice1 === "✊" && _choice2 === "✋") || (_choice1 === "✋" && _choice2 === "✌") || (_choice1 === "✌" && _choice2 === "✊") ){
        decision = `${_choice2} beats ${_choice1}`
        ComputerPts++;
    }
    return decision;  
}

function OverAllWinner(_PlayerPoints, _ComputerPoints) {
    let finalDecision =""
    if (_PlayerPoints > _ComputerPoints) {
        finalDecision = "You Won!!";
    }
    else if (_PlayerPoints < _ComputerPoints) {       
        finalDecision = "You Lost";
    }
    else if (_PlayerPoints === _ComputerPoints) { 
        finalDecision ="It's a Tie!!!"      
    }        
    return finalDecision;
}

