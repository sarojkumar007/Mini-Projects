'use strict';

if(window.NodeList && !NodeList.prototype.filter && !NodeList.prototype.map){
	NodeList.prototype.filter = Array.prototype.filter
	NodeList.prototype.map = Array.prototype.map
}

const info = document.querySelector('.info');
const inputs = document.querySelectorAll('.input');
const scoreX = document.getElementById('xScore');
const scoreO = document.getElementById('oScore');
const resetBtn = document.querySelector('.resetBtn');
const bgTitle = document.querySelector('.bgTitle');
const oName = document.querySelector('#oName');
const xName = document.querySelector('#xName');

const updateScores = score => {
	oName.textContent = score['O'][0];
	xName.textContent = score['X'][0];
	scoreO.textContent = score['O'][1];
	scoreX.textContent = score['X'][1];
}

const oUserInput = prompt('Enter the Name of Player O (Max 3 words)').split(' ').slice(0,3);
const xUserInput = prompt('Enter the Name of Player X (Max 3 words)').split(' ').slice(0,3);

let activeTurn = 'O';
const scoreboard = {
	'O': [oUserInput, 0],
	'X': [xUserInput, 0]
}
info.textContent = `${scoreboard[activeTurn][0]}'s Turn (${activeTurn})`;
updateScores(scoreboard);

inputs.forEach(i => {
	i.addEventListener('click',e => {
		if(!e.target.textContent){
			e.target.textContent = activeTurn
			const w = calcWinner(activeTurn)
			if(w){
				console.log(`${activeTurn} Wins`);
				scoreboard[activeTurn][1]++;
				updateScores(scoreboard);
				inputs.forEach(el => {el.disabled = true})
				info.textContent = `${scoreboard[activeTurn][0]} (${activeTurn}) Wins!! ✌`;
				bgTitle.textContent = `${scoreboard[activeTurn][0]} (${activeTurn}) Wins!! ✌`;
			}else if(!w && w !== undefined){
				console.log('DRAW!!!');
				info.textContent = 'Match Draw! 🤝';
				bgTitle.textContent = 'Match Draw! 🤝';
			}else{
				// pass to next player
				activeTurn === 'O' ? activeTurn = 'X' : activeTurn = 'O';
				info.textContent = `${scoreboard[activeTurn][0]}'s Turn (${activeTurn})`;
			}
		}
	})
})

const calcWinner = turn => {
	const winningCondition = ['123','456','789','147','258','369','159','357'];
	const choiceCheck = []
	
	const currInputs = inputs.filter(i => i.textContent === turn).map(i => i.dataset.input)
	
	for(let i = 0; i < currInputs.length; i++){
		for(let j = i+1; j < currInputs.length; j++){
			for(let k = j+1; k < currInputs.length; k++){
				choiceCheck.push(currInputs[i]+currInputs[j]+currInputs[k])
			}
		}
	}

	if(choiceCheck.some(s => winningCondition.includes(s))){
		return true;
	}

	if(inputs.filter(i => i.textContent).length === 9){
		// Draw
		return false;
	}
}

resetBtn.addEventListener('click',()=>{
	inputs.forEach(i => {
		i.disabled = false
		i.textContent = ""
	});
	activeTurn = 'O'
	info.textContent = `${scoreboard[activeTurn][0]}'s Turn (${activeTurn})`;
	bgTitle.textContent = `TIC TAC TOE`;
})