const DataController = (function () {
	const words = ['Aeroplane', 'Butterfly', 'Curriculum', 'Danger', 'Dragon', 'Elephant', 'Fabulous', 'Grape', 'Household', 'Impossible', 'Jenkins', 'Kitten', 'Love', 'Monkey', 'Nature', 'Oracle', 'Penguin', 'Query','Queue', 'Ransome', 'Stethoscope', 'Triangle', 'Umbrella', 'Verify', 'Warrior', 'X-Ray', 'Yatch', 'Zigzag'];

	const APIurl = 'https://random-word-api.herokuapp.com/word?number=1';

	data = {
		totalLifes: 3,
		totalHints: 3,
		matchedCount: 0,
		matchedWords: [],
		highScore: 0
	}

	let h = window.localStorage.getItem('wordGameHighScore')
	if(h){
		data.highScore = Number(h);
	}

	return {
		getWord: async function () {
			const word = words[Math.floor(Math.random() * words.length)];
			// const word = (await (await fetch(APIurl,{method:'GET'})).json())[0];
			const  w = word.split('');

			let shownWord = [0];
			let range;

			if (w.length > 6) { range = [1, 2, 3, 4] }
			else if (w.length > 4) { range = [1, 2] }
			else { range = [1] }

			for (let i of range) {
				const s = Math.floor(Math.random() * w.length)
				if (!shownWord.includes(s)) {
					shownWord.push(s)
				}
			}
			return [word,shownWord];
		},

		getAllWords: function(){
			return words;
		},

		getData: function () {
			return data;
		},

		matchWords: function (typedW, shownW) {
			const typedWArr = typedW.split('')
			const l = typedWArr.length
			const sameLengthWords = words.filter(w => w.split('').length === l).map(w => w.toLowerCase().split(''));
			let correctCount = 0;
			for(let i = 0; i < l; i++){
				if(shownW.includes(i) && sameLengthWords.filter(w => w[i] === typedWArr[i])){
					correctCount++;
				}
			}
			if(correctCount === shownW.length){
				return true
			}
			else{
				return false
			}

			// if (typedW.toLowerCase() === activeW.toLowerCase()) {
			// 	return true
			// }
			// else {
			// 	return false
			// }
		},

		updateHighScore: function(s){
			let h = window.localStorage.getItem('wordGameHighScore');
			if(h){
				if(Number(s) > Number(h)){
					window.localStorage.setItem('wordGameHighScore',JSON.stringify(s));
					data.highScore = Number(s);
				}
			}else{
				window.localStorage.setItem('wordGameHighScore',JSON.stringify(s));
				data.highScore = Number(s);
			}
		}
	}
})();

const UIController = (function () {
	const DOMStrings = {
		titleIcon: '.title-icon',
		wordBox: '.word',
		startForm: '#level_form',
		matchBtn: '.matchBtn',
		hintBtn: '.hintBtn',
		skipBtn: '.skipBtn',
		startScreen: '.startScreen',
		gameScreen: '.gameScreen',
		hints: '.hints',
		lifes: '.lifes',
		letter: '.letter',
		result: '.result',
		modal: '.modal',
		overlay: '.overlay',
		modalBody: '.modal-body',
		score: '#score',
		highscore: '#highscore',
		guesses: '.guesses',
		levelDisplay: '.title h1 span'
	}

	const SetCaretAtEnd = function (elem) {
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

	return {

		getDOM: function () {
			return DOMStrings;
		},

		moveForward: function (id) {
			const inp = document.getElementById(`l${id + 1}`)
			inp ? (SetCaretAtEnd(inp)) : "";
		},

		moveBackward: function (id) {
			(id > 2) ? (SetCaretAtEnd(document.getElementById(`l${id - 1}`))) : "";
		},

		updateWord: function (word,shownWord) {
			const w = word.split("")

			let wHTML = ""
			for (let i = 0; i < w.length; i++) {
				if (shownWord.includes(i)) {
					wHTML += `<input type="text" id="l${i + 1}" class="letter letter-${i + 1}" value="${w[i]}" readonly>`;
				} else {
					wHTML += `<input type="text" id="l${i + 1}" class="letter letter-${i + 1}">`
				}
			}

			document.querySelector(DOMStrings.wordBox).innerHTML = wHTML;
		},

		updateLifes: function (l) {
			lHTML = '';
			if (l > 0) {
				for (let i = 0; i < l; i++) {
					lHTML += `<i class="m-icon-two-tone life_icon">favorite</i>`
				}
			}else{
				lHTML += `<i class="m-icon-two-tone life_icon">power_off</i>`
			}
			lHTML += `<span id="life">${l}</span>`;
			document.querySelector(DOMStrings.lifes).innerHTML = lHTML;
		},

		updateHints: function (h) {
			hHTML = `<button class="btn hintBtn">Use Hint</button>`;
			if (h > 0) {
				for (let i = 0; i < h; i++) {
					hHTML += `<i class="m-icon-two-tone hint_icon">tungsten</i>`
				}
			}
			document.querySelector(DOMStrings.hints).innerHTML = hHTML;
		},

		openModal: function(msg,type){
			let mHTML = ''
			switch(type){
				case 'error':
					mHTML+=`<div class="error">`;
					break;
				case 'success':
					mHTML+=`<div class="success">`;
					break;
				default:
					mHTML+=`<div>`
			}
			mHTML += `${msg}</div>`;
			document.querySelector(DOMStrings.modalBody).innerHTML = mHTML;

			document.querySelector(DOMStrings.modal).classList.add('active');
			document.querySelector(DOMStrings.overlay).classList.add('active');
		},

		closeModal: function(){
			document.querySelector(DOMStrings.modal).classList.remove('active');
			document.querySelector(DOMStrings.overlay).classList.remove('active');
		},

		updateResult: function(data){
			document.querySelector(DOMStrings.score).textContent = data.matchedCount;
			document.querySelector(DOMStrings.highscore).textContent = data.highScore;
			gHTML = ''
			for(let wd of data.matchedWords){
				gHTML += `<div class="guess">${wd}</div>`
			}
			document.querySelector(DOMStrings.guesses).innerHTML = gHTML;
		}
	}

})()

const controller = (function (DataCtrl, UICtrl) {
	let ActiveWord,shownWord,skips=0,correctGuess=0;

	const data = DataCtrl.getData();

	const {

		startForm, matchBtn, hintBtn, skipBtn, titleIcon,
		startScreen, gameScreen, levelDisplay, overlay,
		hints, lifes, letter, result, wordBox

	} = UICtrl.getDOM();

	const setupEventListener = function () {
		document.querySelector(startForm).addEventListener('submit', onStartClick);
		document.querySelector(matchBtn).addEventListener('click', onMatchClick);
		document.querySelector(hints).addEventListener('click', onHintClick);
		document.querySelector(wordBox).addEventListener('keyup', onWordBoxKeyup);
		document.querySelector(skipBtn).addEventListener('click', onSkipClick);
		document.querySelector(titleIcon).addEventListener('click',showInfo);

		document.querySelectorAll('[m-close]').forEach(el => {
			el.addEventListener('click',UICtrl.closeModal);
		});
		document.querySelector(overlay).addEventListener('click',UICtrl.closeModal);
	}

	const startGame = async function(){
		[ActiveWord, shownWord] = await DataCtrl.getWord();
		UICtrl.updateWord(ActiveWord, shownWord);
	}

	const gameOver = () => {
		console.log('Game Over!')
		document.querySelector(matchBtn).disabled = true;
		document.querySelector(skipBtn).disabled = true;
		UICtrl.openModal(`
			Uh Oh!<br/>
			<span>Game is over now. Please click on <strong>New Game</strong> to play again.</span>
		`,'error');
	}

	const onStartClick = function (e) {
		e.preventDefault();
		const level = (new FormData(e.target)).get('level');
		let level_text;
		switch(Number(level)){
			case 0:
				console.log('Playing on Level Rookie.');
				level_text = 'Rookie';
				break;
			case 1:
				console.log('Playing on Level Veteran.');
				level_text = 'Veteran';
				break;
			case 2:
				console.log('Playing on Level Expert.');
				level_text = 'Expert';
				break;
			default:
				console.log('Playing on default level: Rookie.');
				level_text = 'Rookie';
				break;
		}

		
		document.querySelector(startScreen).classList.remove('active');
		document.querySelector(gameScreen).classList.add('active');
		document.querySelector(hints).classList.add('active');
		document.querySelector(lifes).classList.add('active');
		document.querySelector(levelDisplay).textContent = level_text;

		startGame();
		UICtrl.updateResult(data);
	}

	const onMatchClick = function () {
		let str = '';
		document.querySelectorAll(letter).forEach(l => { str += l.value });

		if (DataCtrl.matchWords(str, shownWord)) {
			console.log('Matched');
			data.matchedCount++;
			if(!data.matchedWords.includes(str)){
				data.matchedWords.push(str);
			}
			DataCtrl.updateHighScore(data.matchedCount);
			UICtrl.updateResult(data);

			correctGuess++;
			if(correctGuess == 2){
				correctGuess = 0;
				if(data.totalLifes <=4){
					data.totalLifes++;
					UICtrl.updateLifes(data.totalLifes);
				}
			}

			startGame();
		} else {
			console.log('No Match');
			data.totalLifes--;
			UICtrl.updateLifes(data.totalLifes);
			correctGuess = 0;
			if (data.totalLifes === 0) {
				gameOver();
			}
		}
		// document.querySelector(result).classList.add('active');
	}

	const onWordBoxKeyup = function (e) {
		const el = e.target
		if (!e.shiftKey) {
			const idNum = Number(el.id.match(/\d+/)[0]);
			if (el.value && el.value.split("").length > 1) {
				el.value = el.value.split("")[0]
			}
			if (e.key === 'Backspace' && el.value === '') {
				UICtrl.moveBackward(idNum)
			}
			else if (e.key === 'ArrowRight' && e.key !== 'Shift') {
				UICtrl.moveForward(idNum)
			}
			else if (e.key === 'ArrowLeft') {
				UICtrl.moveBackward(idNum)
			} else if (e.key !== 'Tab') {
				UICtrl.moveForward(idNum)
			}
		}
	}

	const onHintClick = function (e) {
		if (e.target.closest(hintBtn)) {
			data.totalHints--;
			UICtrl.updateHints(data.totalHints);
			// hint functionality
			if(data.totalHints >=0){
				for(let i = 0;i<ActiveWord.split('').length;i++){
					if(!shownWord.includes(i)){
						shownWord.push(i);
						break;
					}
				}
				UICtrl.updateWord(ActiveWord,shownWord)
			}
			//
			if (data.totalHints <= 0) {
				console.log('No hints');
				document.querySelector(hints).querySelector(hintBtn).textContent = 'No Hints';
				document.querySelector(hints).querySelector(hintBtn).disabled = true;
			}
		}
	}

	const onSkipClick = function(){
		skips++;
		if(skips == 2){
			skips = 0;
			data.totalLifes--;
			UICtrl.updateLifes(data.totalLifes);
			if(data.totalLifes === 0){
				gameOver();
			}
		}
		startGame();
	}

	const showInfo = function(){
		UICtrl.openModal(`
			<div class="gameInfo_content">
				<h1>Game Info</h1>
				<hr/>
				<p>Use <kbd>LeftArrow</kbd> & <kbd>RightArrow</kbd> to Navigate through word Input. Give some pause while typing.</p>
				<p>Each Game will have 3 Lives and 3 Hints. Use hints wisely to progress through the Game.</p>
				<p>Each wrong guess will deduct a life and 2 correct guesses will gain a life. You can have maximum 5 lives.</p>
				<p>You can skip a word if you are not sure to guess. But, 2<sup>nd</sup> Skip will deduct a Life.</p>
			</div>
		`);
	}

	return {
		init: function () {
			console.log('Initializing Game... Done.');
			setupEventListener();
		},

		getActiveWord: function(){
			return ActiveWord;
		}
	}
})(DataController, UIController)

// Start
controller.init();
