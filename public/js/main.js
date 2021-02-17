// VICTOIRES
// NUM CARRE // VALEUR TABLEAU

// HORIZONTAL
// 1 2 3 // 0 1 2
// 4 5 6 // 3 4 5
// 7 8 9 // 6 7 8

// VERTICAL
// 1 4 7 // 0 3 6
// 2 5 8 // 1 4 7
// 3 6 9 // 2 5 8

// DIAGONAL
// 1 5 9 // 0 4 8
// 3 5 7 // 2 4 6

// création des const et tableaux gagnants
const X = 'x'
const Cercle = 'cercle'
const ValeurGagant = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const petitCarreElement = document.querySelectorAll('[data-petit-carre]')
const board = document.getElementById('board')
const MessageGagnant = document.getElementById('Message-gagnant')
const restartButton = document.getElementById('restartButton')
const messageGagnantTexteElement = document.querySelector('[data-message-gagnant-texte]')
let circleTurn
// circleTurn permet de passer d'un tour à un autre

debutJeu()

restartButton.addEventListener('click', debutJeu)

// fonction pour commencer le jeu
function debutJeu() { 
  circleTurn = false
  petitCarreElement.forEach(petitCarre => {
    petitCarre.classList.remove(X)
    petitCarre.classList.remove(Cercle)
    petitCarre.removeEventListener('click', handleClick)
    petitCarre.addEventListener('click', handleClick, { once: true })
  })
  hoverClass()
  MessageGagnant.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? Cercle : X
  placeMark(cell, currentClass)
  if (checkGagnant(currentClass)) {
    finGame(false)
  } else if (isDraw()) {
    finGame(true)
  } else {
    nouveauTours()
    hoverClass()
  }
}

// match nul
function finGame(draw) {
  if (draw) {
    messageGagnantTexteElement.innerText = 'Match nul !'
    // s'il y a un gagnant
  } else {
    messageGagnantTexteElement.innerText = `Le joueur ${circleTurn ? "O" : "X"} a gagné !`
  }
  MessageGagnant.classList.add('show')
}

// 
function isDraw() {
  return [...petitCarreElement].every(cell => {
    return cell.classList.contains(X) || cell.classList.contains(Cercle)
  })
}

// place le contenu de la const x ou cercle 
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// change de tour
function nouveauTours() {
  circleTurn = !circleTurn
}
// function pour mettre un hover sur nos class x et cercle
function hoverClass() {
  board.classList.remove(X)
  board.classList.remove(Cercle)
  if (circleTurn) {
    board.classList.add(Cercle)
  } else {
    board.classList.add(X)
  }
}
// function pour check le gagnant
function checkGagnant(currentClass) {
  return ValeurGagant.some(combination => {
    return combination.every(index => {
      return petitCarreElement[index].classList.contains(currentClass)
    })
  })
}