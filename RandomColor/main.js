const navBtn = document.querySelector('.navButton');
const sideBar = document.querySelector('.sideBar');

navBtn.addEventListener('click',()=>{
	sideBar.classList.toggle('active');
	(navBtn.children[0].textContent === 'menu') ? (navBtn.children[0].textContent = 'menu_open') : (navBtn.children[0].textContent = 'menu');
})


// Generate Code Functionality
const hexDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
let colorsHistory = [];

const generateRandomHexColor = () => {
	let str = '#';
	for(let i=0;i < 6;i++){
		str+=hexDigits[Math.floor(Math.random() * hexDigits.length)]
	}
	return str;
}

const updateHistoryUI = history => {
	let hisHTML = '';
	for(let c of history){
		//onclick="copyColor(event)"
		hisHTML += `<div class="color_item">
				<div class="color" style="background-color: ${c};"></div>
				<span>${c}</span>
				<span class="c_msg"></span>
			</div>`;
	}
	colors.innerHTML = hisHTML;
}

const main = document.querySelector('main');
const changeBtn = document.querySelector('.changeBtn');
const colorText = document.querySelector('.color_text');
const copyBtn = document.querySelector('.copyBtn');
const colors = document.querySelector('.colors');
const msg = document.querySelector('.msg');

changeBtn.addEventListener('click',()=>{
	const randomColor = generateRandomHexColor();
	colorsHistory.unshift(randomColor);
	main.style.backgroundColor = randomColor;
	colorText.textContent = randomColor;

	updateHistoryUI(colorsHistory);
});

copyBtn.addEventListener('click',()=>{
	if(colorText.textContent !== '#XXXXXX'){
		navigator.clipboard.writeText(colorText.textContent);

		copyBtn.children[0].textContent = "library_add_check";
		msg.textContent = 'Copied!';
		setTimeout(()=>{
			copyBtn.children[0].textContent = "copy";
			msg.textContent = '';
		},2000)
	}
});


const copyColor = e => {
	const c_item = e.target.closest('.color_item');
	navigator.clipboard.writeText(c_item.children[1].textContent);
	c_item.children[2].textContent = ' (Copied!)'
	setTimeout(()=>{
		c_item.children[2].textContent = ''
	},2000);
}

colors.addEventListener('click',e=>{
	if(e.target.closest('.color_item')){
		copyColor(e);
	}
});

// Extra
let isPlaying = false
const djBtn = document.querySelector('.djBtn');
let DJ;

djBtn.addEventListener('click',()=>{
	if(isPlaying){
		isPlaying = false
		djBtn.textContent = 'Start DJ!'
		clearInterval(DJ);
		main.style.backgroundColor = '';
	}else{
		isPlaying = true
		djBtn.textContent = 'Stop DJ';
		DJ = setInterval(()=>{
			const c = generateRandomHexColor();
			main.style.backgroundColor = c;
		},500);
	}
})