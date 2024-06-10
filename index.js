
let changeSound = new Audio("ting.mp3");
let winMusic = new Audio("music.mp3");
let gameOverMusic = new Audio("gameover.mp3");
let turn = "X";

let turnMenu = document.querySelector(".info");
let turnInfo = document.querySelector('.turn-info');
let winInfo = document.querySelector('.win-info')
let boxes = document.querySelectorAll(".boxAr");
let reset = document.querySelector(".reset");

turnMenu.innerText = turn;

//function which changes the turn of players
function changeTurn(){
    turn = turn === "X" ? "0" :"X";
    turnMenu.innerText = turn;
    return turn;
}

// this function displays the winner name, music and animatioin.
function winnerCall(txt){
    turnInfo.style.display = "none";
    winInfo.style.display ="block";
    winInfo.innerText = txt; 
    reset.innerText = "restart";
    resetGame();
    winMusic.play();
    document.getElementsByClassName('reaction')[0].style.display = "block";
}

//checks the condition if any of the winner wins
function win(){
    if( (boxes[0].innerText==="X" && boxes[1].innerText==="X" && boxes[2].innerText==="X") ||
        (boxes[3].innerText==="X" && boxes[4].innerText==="X" && boxes[5].innerText==="X") ||
        (boxes[6].innerText==="X" && boxes[7].innerText==="X" && boxes[8].innerText==="X") ||
        (boxes[0].innerText==="X" && boxes[3].innerText==="X" && boxes[6].innerText==="X") ||
        (boxes[1].innerText==="X" && boxes[4].innerText==="X" && boxes[7].innerText==="X") ||
        (boxes[2].innerText==="X" && boxes[5].innerText==="X" && boxes[8].innerText==="X") ||
        (boxes[0].innerText==="X" && boxes[4].innerText==="X" && boxes[8].innerText==="X") ||
        (boxes[2].innerText==="X" && boxes[4].innerText==="X" && boxes[6].innerText==="X") 
        ){
        winnerCall("X is the winner");
    }else if( (boxes[0].innerText=="0" && boxes[1].innerText=="0" && boxes[2].innerText=="0") ||
    (boxes[6].innerText=="0" && boxes[7].innerText=="0" && boxes[8].innerText=="0") ||
    (boxes[0].innerText=="0" && boxes[3].innerText=="0" && boxes[6].innerText=="0") ||
    (boxes[1].innerText=="0" && boxes[4].innerText=="0" && boxes[7].innerText=="0") ||
    (boxes[3].innerText=="0" && boxes[4].innerText=="0" && boxes[5].innerText=="0") ||
    (boxes[2].innerText=="0" && boxes[5].innerText=="0" && boxes[8].innerText=="0") ||
    (boxes[0].innerText=="0" && boxes[4].innerText=="0" && boxes[8].innerText=="0") ||
    (boxes[2].innerText=="0" && boxes[4].innerText=="0" && boxes[6].innerText=="0") ){
        winnerCall("0 is the winner");
    }else{
        let flag = 0;
        Array.from(boxes).forEach(element=>{
            let textArea = element.getElementsByClassName("textArea");
            if(textArea[0].innerText == "" || textArea[0].innerText == undefined ){
                flag = 1;
            }
        });

        if(!flag){
            resetGame();
            turnInfo.style.display = "none";
            winInfo.style.display ="block";
            winInfo.innerText = "DRAW! click restart to play again."; 
            reset.innerText = "restart";
            winMgameOverMusic.play();
            document.getElementsByClassName('reaction')[0].style.display = "block";
        }
    }

}

//game box event
Array.from(boxes).forEach(element =>{
    element.addEventListener('click',()=>{
        changeSound.play();
        let textArea = element.getElementsByClassName("textArea");
        if(textArea[0].innerText == ""){
            textArea[0].innerText = turn;
            turn = changeTurn();
            win();
        }else{
            element.classList.add("wrong-bg");
            setTimeout(() => {
                element.classList.remove("wrong-bg");
            }, 500);
        }
        
    });
});

//function to reset the game
function resetGame(){
    turn = "X";
    turnMenu.innerText = turn;
    Array.from(boxes).forEach(element=>{
        let textArea = element.getElementsByClassName("textArea");
        textArea[0].innerText = "";
    });
}

//reset button
reset.addEventListener('click',()=>{
    if(reset.innerText == "restart"){
        winInfo.style.display = "none";
        turnInfo.style.display = "block";
        document.getElementsByClassName('reaction')[0].style.display = "none";
        winMusic.pause();
        gameOverMusic.pause();
        reset.innerText = "reset";
    }else{
        resetGame();
    }
});
