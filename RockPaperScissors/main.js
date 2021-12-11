console.log('Welcome to RPS, The Game!');

const humanScore = document.getElementById('human');
const compScore = document.getElementById('computer');
const win = document.getElementById('win');
const meta = document.getElementById('meta');
const roundRemaining = document.querySelector('.round');

let rounds = 3
let score_board = {
	'human': 0,
	'computer': 0
}

document.querySelectorAll('.h_btn').forEach(el => {
	el.addEventListener('click',e=>{
		const choice = e.target.closest('.h_btn').dataset.choice
		play(choice);
	})
})

const play = hChoice => {
	const compChoice = getComputerChoice();
	const winner = getWinner(hChoice, compChoice);
	//TODO: for SVG
	showWinner(winner,hChoice,compChoice)
}

const getComputerChoice = () => ['rock','paper','scissors'][Math.floor(Math.random()*3)];

const getWinner = (hChoice,cChoice) => {
	if(hChoice === cChoice){
		return 'draw';
	}else if(hChoice === 'rock' && cChoice === 'paper'){
		return 'computer';
	}else if(hChoice === 'rock' && cChoice === 'scissors'){
		return 'human';
	}else if(hChoice === 'paper' && cChoice === 'rock'){
		return 'human';
	}else if(hChoice === 'paper' && cChoice === 'scissors'){
		return 'computer';
	}else if(hChoice === 'scissors' && cChoice === 'rock'){
		return 'computer';
	}else if(hChoice === 'scissors' && cChoice === 'paper'){
		return 'human';
	}
}

const showWinner = (w,h,c) => {
	if(w === 'draw'){
		win.textContent = 'Draw!!';
		meta.textContent = `You both choose ${h}`;
	}
	else if(w === 'human'){
		score_board.human++;
		win.textContent = 'Human Wins!!';
		meta.textContent = `Your ${h} beats ${c}`;
	}else if(w === 'computer'){
		score_board.computer++;
		win.textContent = 'Computer Wins!!';
		meta.textContent = `Computer's ${c} beats ${h}`;
	}

	showComputerChoice(c)

	humanScore.textContent = score_board.human
	compScore.textContent = score_board.computer

	rounds--;
	roundRemaining.textContent = rounds
	if(rounds === 0){
		if(score_board.human > score_board.computer){}
		else{}
	}

}

const showComputerChoice = c =>{
	document.querySelectorAll('.c_btn').forEach(el => {
		if(Array.from(el.classList).includes(c)){
			el.style.display = 'flex';
		}
		else{
			el.style.display = 'none';
		}
	})
}

document.getElementById('reset').addEventListener('click',()=>{
	score_board.human = 0
	score_board.computer = 0
	humanScore.textContent = 0
	compScore.textContent = 0
	showComputerChoice('placeholder');
	win.textContent = 'Ready ??';
	meta.textContent = 'Click your choice on left';
})