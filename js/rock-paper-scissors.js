let userScore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");

const genCompChoice=()=>{
    const options = ["камінь","папір","ножиці"];
    const  randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
  

}

const drawGame=()=>{
    msg.innerText="Гра була внічию, зіграй знову";
    msg.style.backgroundColor="#081b31";
}
const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
       
        msg.innerText=`ти виграв! твої ${userChoice} б'ють ${compChoice}`;
        msg.style.backgroundColor="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText=`Ти програв! ${compChoice} твої б'ють ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}

const playGame=(userChoice)=>{
    console.log("user choice=",userChoice);
    
    const compChoice = genCompChoice();
    console.log("comp choice =",compChoice);

    if(userChoice === compChoice){
        
        drawGame();

    }else{
        let userWin=true;
        if(userChoice ==="камінь"){
            userWin = compChoice ==="папір"?false:true;
        }else if(userChoice === "папір"){
            userWin=compChoice === "ножиці"?false:true;
        }else{
            userWin=compChoice === "камінь"?false:true;
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