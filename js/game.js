import { createGrid, checkBorders, drawArena} from "./grid.js"
import { SnakeSpeed, update as updateSnake, draw as drawSnake, snakeHead, friendlyFire } from "./snake.js"
import { update as updateFood, draw as drawFood, playAudio, sounds } from "./food.js"

const arena = document.getElementById('container')
const bestScore = document.getElementById('bestScore')

let gameOver = false
let lastRenderTime = 0

createGrid(arena)
setScore()

function main(currentTime) {

  
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SnakeSpeed) return
  
  
    lastRenderTime = currentTime
    
    update()
    if(gameOver){
        playAudio(sounds[6])
        setScore()
        if(confirm("Game Over, refresh the page to play again")){
            window.location = "."
        }
    }
    else {
        draw()
    }
}
  
window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    arena.innerHTML = ''
    drawArena(arena)
    drawFood(arena)
    drawSnake(arena)

}

function checkDeath(){
    if(checkBorders(snakeHead()) || friendlyFire()){
        gameOver = true
    }
}

function setScore(){
    if(parseInt(bestScore.innerText) < parseInt(document.cookie) || document.cookie !== ""){
        bestScore.innerText = document.cookie
    }
}