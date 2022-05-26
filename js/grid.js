export const gridSize = 15

export function createGrid(arena){
    arena.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    arena.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
}

export function checkBorders(head){
    return (
        head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize
    )
}

export function drawArena(gameBoard){
    for(let y = 1; y <= gridSize; y++){
        let yy = (y % 2 === 0) ? 1 : 0
        for(let x = 1; x <= gridSize; x++){
            let xx = (x % 2 === 0) ? 1 : 0

            const square1 = document.createElement('div')
            square1.style.gridRowStart = y
            square1.style.gridColumnStart =  x

            if((xx == 1 && yy == 1) || (yy != 1 && xx != 1)){
                square1.classList.add('square_light')
                gameBoard.appendChild(square1)
            }
            else{
                square1.classList.add('square_dark')
                gameBoard.appendChild(square1)
            }
        }
    }
}
