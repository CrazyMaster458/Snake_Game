import { getInputDirection, rotateDegree } from "./input.js"
import { gridSize } from "./grid.js"

export let SnakeSpeed = 12
let snakeBody = [{ x: (gridSize-1)/2+1, y: (gridSize-1)/2+1 }]
let texture = document.querySelectorAll('.snake > img')
let newSegments = 0

export function update() {  
  addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] }
    }
  
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  // for(let i = 0; i < snakeBody.length; i++){
  //   const snakeElement = document.createElement('div')
  //     snakeElement.style.gridRowStart = snakeBody[i].y
  //     snakeElement.style.gridColumnStart = snakeBody[i].x
  //     snakeElement.classList.add('snake')
  //     const snakeImg = document.createElement('img')
  //     snakeImg.src = './img/snake.png'
  //     // RotateDirection(snakeImg)
  //     if(snakeBody[i].x+1 === snakeBody[i-1].x && snakeBody[i]-1 === snakeBody[i+1].x)
  //     snakeElement.appendChild(snakeImg)
  //     gameBoard.appendChild(snakeElement)
  // }
  let index = 0;
    snakeBody.forEach(segment => {
      index++
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = segment.y
      snakeElement.style.gridColumnStart = segment.x
      snakeElement.classList.add('snake')
      const snakeImg = document.createElement('img')
      if(index === 1){
        snakeImg.src = './img/snake.png'
        snakeImg.style.transform = `rotate(${rotateDegree}deg)`
      }
      else{
        if(index % 5 === 0){
          // snakeImg.src = './img/Green_Circle.png'
          snakeImg.src = './img/LighGreen_Circle.png'
          snakeImg.className = 'snakeBody'
        }
        else{
          // snakeImg.src = './img/LighGreen_Circle.png'
          snakeImg.src = './img/Green_Circle.png'
          snakeImg.className = 'snakeBody'
        }
        
      }
      snakeElement.appendChild(snakeImg)
      gameBoard.appendChild(snakeElement)
    })
}

export function onSnake(position){
  return snakeBody.some(segment => {
    return positionCheck(segment, position)
  })
}

function positionCheck(pos1, pos2){
  return pos1.x === pos2.x && pos1.y === pos2.y
}

export function expandSnake(expand){
  newSegments += expand
}

export function snakeHead(){
  return snakeBody[0]
}

export function friendlyFire(){
  for(let i = 1; i < snakeBody.length; i++){
    if(snakeBody[i].x === snakeHead().x && snakeBody[i].y === snakeHead().y){
      return true
    }
  }


}

function addSegments(){
  for( let i = newSegments; i > 0; i--){
    snakeBody.push({...snakeBody[snakeBody.length-1]})
  }
  newSegments = 0
}
// function RotateDirection(segment){
//   // let part = document.querySelectorAll('.snake > img')
//   segment.style.transform = `rotate(${rotateDegree}deg)`
// }
