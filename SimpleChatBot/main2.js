console.log('Welcome to ChatBot App');

// Global Configs

const delay = ms => new Promise(res => setTimeout(res, ms));

const chatBox = document.querySelector('.chatBox');
const speechBtn = document.querySelector('.startSpeech');
let voice;

// AppData
const appChatData = [
{
	type: 'info',
	msg: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
	timestamp: Date.now()
},
{
	type: 'from',
	msg: [`Hi, I'm Leia.`,`What's your name?`],
	timestamp: Date.now()
}
];
const voiceOption = [
	'Microsoft Zira - English (United States)'
]

// Helper Functions
const updateChatBox = (type,msg) => {
	let mHTML = '', msgText = '';
	if(msg.constructor === Array){
		for(let t of msg){
			msgText += `<p>${t}</p>`
		}
	}else{
		msgText += `<p>${msg}</p>`
	}
	
	if(type === 'from'){
		mHTML += `<div class="chatFrom">
			<div class="chatIcon">
				<i class="m-icon-round">support_agent</i>
			</div>
			<div class="msg">
				${msgText}
			</div>
		</div>`
	}
	else if(type === 'to'){
		mHTML += `<div class="chatTo">
			<div class="msg">
				${msgText}
			</div>
			<div class="chatIcon">
				<i class="m-icon-round">person</i>
			</div>
		</div>`
	}else if(type==='info'){
		mHTML += `<div class="chatInfo">${msgText}</div>`
	}

	chatBox.innerHTML += mHTML;
	chatBox.scrollTo({
		top: chatBox.clientHeight,
		left: 0,
		behavior: 'smooth'
	})
}

const playText = (text) => {
	msgText = '';
	if(text.constructor === Array){
			msgText = text.join('.')
	}else{
		msgText = text
	}
	
	if(voice){
		const utterance = new SpeechSynthesisUtterance(text)
		utterance.lang = 'en-US'
		utterance.rate = 1
		utterance.voice = voice
		console.log(`Using Voice: ${utterance.voice}`)
		utterance.addEventListener('end',()=>{
			speechBtn.disabled = false
			speechBtn.title = `Talk to Leia`
		});
		speechBtn.title = ''
		speechBtn.disabled = true

		speechSynthesis.speak(utterance)
	}
}

// wait on voices to be loaded before fetching list
const startApp = async () => {
	await delay(2000)
	if(window.speechSynthesis) window.speechSynthesis.onvoiceschanged = function (){
		const v = window.speechSynthesis.getVoices();
		voice = v.find(({name}) => voiceOption.includes(name))
	}
	if(voice){
		appChatData.forEach(({type,msg})=>{
			updateChatBox(type,msg);
			if(type === 'from') playText(msg)
		})
	}
}
startApp()
// -------------------