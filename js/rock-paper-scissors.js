let userScore=0;
let compScore=0;

const ukrMap = new Map([['rock', 'камінь'], ['paper', 'папір'], ['scissors', 'ножиці']])
const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const genCompChoice=()=>{
    const options = ["rock","paper","scissors"];
    const  randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame=()=>{
    msg.innerText="Нічия, зіграйте знову";
    msg.style.color="#081b31";
}
const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
       
        msg.innerText=`Ви Виграли! Ваш${userChoice === 'scissors' ? 'і' : ''} ${ukrMap.get(userChoice)} бʼ${userChoice === 'scissors' ? 'ють' : 'є'} ${ukrMap.get(compChoice)}`;
        msg.style.color="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText=`Ви Програли! ${ukrMap.get(compChoice)} бʼ${compChoice === 'scissors' ? 'ють' : 'є'} Ваш${userChoice === 'scissors' ? 'і' : ''} ${ukrMap.get(userChoice)}`;
        msg.style.color="red";
    }
}

const playGame=(userChoice)=>{
    
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        
        drawGame();

    }else{
        let userWin=true;
        if(userChoice ==="rock"){
            userWin = compChoice ==="paper"?false:true;
        }else if(userChoice === "paper"){
            userWin=compChoice === "scissors"?false:true;
        }else{
            userWin=compChoice === "rock"?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

};


choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});