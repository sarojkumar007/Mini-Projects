// Init
console.log('Welcome to Word Game!');

(function(){

const startBtn = document.querySelector('.startBtn');
const matchBtn = document.querySelector('.matchBtn');

const startScreen = document.querySelector('.startScreen');
const gameScreen = document.querySelector('.gameScreen');

const hints = document.querySelector('.hints');
const lifes = document.querySelector('.lifes');

let ActiveWord;
let shownWord = [0];
let totalLifes = 3;
let totalHints = 3;

// Utils
function SetCaretAtEnd(elem) {
	  var elemLen = elem.value.length;
	  // For IE Only
	  if (document.selection) {
	      // Set focus
	      elem.focus();
	      // Use IE Ranges
	      var oSel = document.selection.createRange();
	      // Reset position to 0 & then set at end
	      oSel.moveStart('character', -elemLen);
	      oSel.moveStart('character', elemLen);
	      oSel.moveEnd('character', 0);
	      oSel.select();
	  }
	  else if (elem.selectionStart || elem.selectionStart == '0') {
	      // Firefox/Chrome
	      elem.selectionStart = elemLen;
	      elem.selectionEnd = elemLen;
	      elem.focus();
	  }
}

const moveForward = (elem,id) =>{
	const inp = document.getElementById(`l${id+1}`)
	inp ? (SetCaretAtEnd(inp)) : "";
}
const moveBackward = (elem,id) =>{
	(id > 2) ? (SetCaretAtEnd(document.getElementById(`l${id-1}`))) : "";
}

const updateWord = (word, shownIndex) => {
	const w = word.split("")

	let wHTML = ""
	for(let i = 0; i < w.length;i++){
		if(shownIndex.includes(i)){
			wHTML += `<input type="text" id="l${i+1}" class="letter letter-${i+1}" value="${w[i]}" readonly>`;
		}else{
			wHTML += `<input type="text" id="l${i+1}" class="letter letter-${i+1}">`
		}
	}

	document.querySelector('.word').innerHTML = wHTML;
}

const updateLifes = l => {
	lHTML = '';
	if(l > 0){
		for(let i=0; i<l; i++){
			lHTML += `<i class="m-icon-two-tone life_icon">favorite</i>`
		}
	}
	lHTML += `<span id="life">${l}</span>`;
	lifes.innerHTML = lHTML;
}


const updateHints = h => {
	hHTML = `<button class="btn hintBtn">Use Hint</button>`;
	if(h > 0){
		for(let i=0; i<h; i++){
			hHTML += `<i class="m-icon-two-tone hint_icon">tungsten</i>`
		}
	}
	hints.innerHTML = hHTML;
}


// Main

startBtn.addEventListener('click',()=>{
	const gameWords = ['Aeroplane','Blind','Curriculum','Dragon','Express','Fabulous','Grape','Household','Impossible','Jenkins','Kitty','Love','Monkey','Nature','oracle','penguin','query','Robot','Stethoscope','Triangle','Umbrella','Vanish','warrior','Xerox','Yatch','Zinc'];
	startScreen.classList.remove('active');
	ActiveWord = gameWords[Math.floor(Math.random() * gameWords.length)];
	gameScreen.classList.add('active');
	hints.classList.add('active');
	lifes.classList.add('active');

	// shownWord functionality
	const w = ActiveWord.split("")
	let range;
	
	if(w.length > 6){range = [1,2,3,4]}
	else if(w.length > 4){range = [1,2]}
	else{range = [1]}

	for(let i of range){	
		const s = Math.floor(Math.random()*w.length)
		if(!shownWord.includes(s)){
			shownWord.push(s)
		}
	}

	updateWord(ActiveWord,shownWord);
});

matchBtn.addEventListener('click',()=>{
	let str = '';
	document.querySelectorAll('.letter').forEach(l => {
		str += l.value
	});
	console.log(str);
	if(str.toLowerCase() === ActiveWord.toLowerCase()){
		alert('Match!');
	}else{
		console.log('No Match');
		totalLifes--;
		updateLifes(totalLifes);
		if(totalLifes == 0){console.log('Game Over!')}
	}
	document.querySelector('.result').classList.add('active')
})

document.querySelector(".word").addEventListener('keyup',e=>{
	const el = e.target
	if(!e.shiftKey){
		const idNum = Number(el.id.match(/\d+/)[0]);
		if(el.value && el.value.split("").length > 1){
			el.value = el.value.split("")[0]
		}
		if(e.key === 'Backspace' && el.value === ''){
			moveBackward(el,idNum)
		}
		else if(e.key === 'ArrowRight' && e.key !== 'Shift'){
			moveForward(el,idNum)
		}
		else if(e.key === 'ArrowLeft'){
			moveBackward(el,idNum)
		}else if(e.key !== 'Tab'){
			moveForward(el,idNum)
		}
	}
});

hints.addEventListener('click',e=>{
	if(e.target.closest('.hintBtn')){
		totalHints--;
		updateHints(totalHints);
		// hint functionality
		//...
		if(totalHints <= 0){
			console.log('No hints');
			hints.querySelector('.hintBtn').textContent = 'No Hints';
			hints.querySelector('.hintBtn').disabled = true;
		}
	}
})

})();