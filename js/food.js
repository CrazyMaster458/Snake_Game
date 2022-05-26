import { onSnake, expandSnake, SnakeSpeed } from './snake.js'
import {gridSize} from './grid.js'

const foodNumber = 5
let scoreOfFood = 0;
let expansionRate = 1
let food = generateFood(foodNumber)

const score = document.getElementById('score')
const bestScore = document.getElementById('bestScore')
export let sounds = document.querySelectorAll('audio')

export function update() {
    if(probability(0.01)){
        playAudio(sounds[2])
    }
    for(let i = 0; i < food.length;i++){
        if (onSnake(food[i])) {
            let plusExpand = 0;
            switch(food[i].z){
                case 0:
                    playAudio(sounds[0])
                    scoreOfFood++
                    break
                case 1:
                    playAudio(sounds[1])
                    scoreOfFood += 5
                    plusExpand += 4
                    break
                case 2:
                    playAudio(sounds[4])
                    scoreOfFood += 2
                    plusExpand += 1
                    break
            }
            expandSnake(expansionRate+plusExpand)
            food[i] = generateFoodPosition()
        }
    }
    score.textContent = scoreOfFood
    if(document.cookie === "" || parseInt(document.cookie) < scoreOfFood){
        document.cookie = `${scoreOfFood}`
    }
}
  
export function draw(gameBoard) {

    food.forEach(segment => {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = segment.y
        foodElement.style.gridColumnStart = segment.x
        foodElement.classList.add('food')
        const foodimg = document.createElement('img')
        switch(segment.z){
            case 0:
                foodimg.src = './img/apple3.png'
                break

            case 1: 
                foodimg.src = './img/rabbit.png'
                break
            case 2: 
                foodimg.src = './img/mouse.png'
                break
        }
        foodElement.appendChild(foodimg)
        gameBoard.appendChild(foodElement)
        
    })
}

function generateFood(number){
    let pole =[]
    for(let i = 0; i < number; i++){
        let value = generateFoodPosition()
        if(!pole.includes(value)){
            pole.push(value)
        }
    }
    return pole
}

function generateFoodPosition(){
    let value
    while (value == null || onSnake(value)){
        value = generateGridPosition()
        value.z = probability(0.01) ? 1 : (probability(.16) ? 2 : 0)
    }
    return value
}

function generateGridPosition(){
    return {
        x: Math.floor(Math.random() * gridSize) +1,
        y: Math.floor(Math.random() * gridSize) +1,
    }
}
function probability(n){
    return Math.random() < n
}

export function playAudio(x) { 
    x.play(); 
} 