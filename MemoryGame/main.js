console.log('Welcome to Memory Game!');

if(window.NodeList && !NodeList.prototype.filter && !NodeList.prototype.map){
	NodeList.prototype.filter = Array.prototype.filter
	NodeList.prototype.map = Array.prototype.map
}

const startBtn = document.querySelector('.startBtn');
const levels = document.querySelectorAll('.level');
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const input_wrap = document.querySelector('.input_wrap');
const timeBar = document.querySelector('.timeBar');
const gameArea = document.querySelector('.gameArea');
const resultArea = document.querySelector('.resultArea');
const result = document.querySelector('#result');
const retryBtn = document.querySelector('.retryBtn');

// Page1
let gameTimer;

startBtn.addEventListener('click',()=>{
	const levelChoosen = levels.filter(i => i.checked)[0]?.value || undefined;
	const lvls = ['Easy','Medium','Hard']
	if(levelChoosen){
		document.getElementById('lvl').textContent = lvls[levelChoosen];
		page1.classList.remove('current');
		page2.classList.add('current');
		
		console.log(`Starting Game: ${lvls[levelChoosen]} ...`);
		gameTimer = startGame(Number(levelChoosen));
	}
	
});

levels.forEach(inp => {
	inp.addEventListener('input',()=>{
		if(inp.checked){
			startBtn.disabled = false
		}
	})
});

const startGame = type => {
	const root = document.querySelector(':root');
	let iHTML = '',i_count,iconPlacements = {},gameTime;
	const icons = ['color_lens','favorite','settings','dashboard','thumb_up','star_rate','pets','extension','emoji_events','photo_camera'];

	switch(type){
		case 0:
			i_count = 12;
			root.style.setProperty('--gameTime','30s');
			gameTime = 30
			break;
		case 1:
			i_count = 16;
			root.style.setProperty('--gameTime','60s');
			gameTime = 60
			break;
		case 2:
			i_count = 20;
			root.style.setProperty('--gameTime','90s');
			gameTime = 90
			break;
		default:
			i_count = 12
			root.style.setProperty('--gameTime','30s');
			gameTime = 30
			break;
	}
	timeBar.classList.add('active');

	gameCount = i_count

	for(let i=0;i<i_count;i++){
		let icon = icons[Math.floor(Math.random()*icons.length)];

		if(Object.keys(iconPlacements).length < (i_count/2)){
			while(Object.keys(iconPlacements).includes(icon) && (iconPlacements[icon] === 2)){
				icon = icons[Math.floor(Math.random()*icons.length)];
			}
		}else{
			icon = Object.keys(iconPlacements).filter(i => iconPlacements[i] === 1)[0]
		}

		if(Object.keys(iconPlacements).includes(icon)){
			if(iconPlacements[icon] === 1){
				iconPlacements[icon]++;
			}
		}
		else{
			iconPlacements[icon] = 1
		}

		iHTML += 
		`<div class="input_box">
			<div class="input" data-i="${icons.indexOf(icon)}" id="inp${i}">
				<div class="input_back"></div>
				<div class="input_card"><i class="m-icon-round input_icon">${icon}</i></div>
			</div>
		</div>`;
	}
	input_wrap.classList.add(`i_${type}`);
	input_wrap.innerHTML = iHTML;

	return setTimeout(endGame,gameTime*1000);
}
const endGame = res => {
	if(res === 'pass'){
		console.log('You won!!');
		result.textContent = 'Woohoo!! You Won!';
		resultArea.classList.remove('error')
		resultArea.classList.add('success')
	}
	else{
		console.log('Sorry. You failed.');
		result.textContent = 'Oops! Time out. Try Again.'
		resultArea.classList.remove('success')
		resultArea.classList.add('error')
	}
	gameArea.classList.add('active');
}

// Page2
let selected = [];
let gameCount;
let matchCount = 0;

input_wrap.addEventListener('click',e => {
	const input = e.target.closest('.input');
	if(input){
		input.classList.add('active');

		if(selected.length === 0 || (selected.length == 1 && !selected.includes(input))){
			selected.push(input);
		}
		else if(selected.length === 2 && !selected.includes(input)){
			selected.shift();
			selected.push(input);
		}
		
		if(selected.length == 2){
			if(selected[0].dataset.i === selected[1].dataset.i){
				matchCount++;
				selected.forEach(b => b.parentElement.removeChild(b));
				if(matchCount === (gameCount/2)){
					clearInterval(gameTimer);
					timeBar.style.animationPlayState = 'paused';
					endGame('pass')
				}
			}
		}		
		setTimeout(()=>{
			input.classList.remove('active')
		},2100);
	}
});

retryBtn.addEventListener('click',()=>{
	result.textContent = '';
	resultArea.classList.remove('success','error');
	gameArea.classList.remove('active');
	selected = [];
	gameCount = null;
	matchCount = 0;
	gameTimer = null;

	timeBar.classList.remove('active');
	timeBar.style.animationPlayState = null;

	page2.classList.remove('current');
	page1.classList.add('current');
})