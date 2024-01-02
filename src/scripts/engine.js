const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft : document.querySelector("#time-left"),
        score : document.querySelector("#score"),
        lives: document.querySelector('#lives')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000)
    }
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        gameOver()
    }
}

function gameOver(){
    clearInterval(state.actions.timerId)
    clearInterval(state.actions.countDownTimerId)
    alert('Game Over! O seu resultado foi: ' + state.values.result)
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                playSound("hit")
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
            }else{
                state.values.currentLives--
                state.view.lives.textContent = `x${state.values.currentLives}`
                if(state.values.currentLives <= 0){
                    gameOver()
                }
            }
        })
    })
}

function init(){
    addListenerHitBox()
}

init()