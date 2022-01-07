console.log('Welcome to ChatBot App');

const delay = ms => new Promise(res => setTimeout(res, ms));

const speechBtn = document.querySelector('.startSpeech');
let voice;

// wait on voices to be loaded before fetching list
const voiceChange = () => {
	let Vs = window.speechSynthesis.getVoices();
  const voices = [
	'Microsoft Zira - English (United States)',
	// 'Microsoft Aria Online (Natural) - English (United States)',
	// 'Microsoft Libby Online (Natural) - English (United Kingdom)',
	// 'Microsoft Hayley Online - English (Australia)'
	]
	voice = Vs.find(({name}) => voices.includes(name))
}
window.speechSynthesis.onvoiceschanged = voiceChange
let id = setTimeout(()=>{
	voiceChange()
	clearInterval(id)
},1000)

const data = [
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
// let userName = '';

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
		console.log(`Using Voice: ${utterance.voice}`);
		utterance.addEventListener('end',()=>{
			speechBtn.disabled = false
			speechBtn.title = `Talk to Leia`
		});
		speechBtn.title = ''
		speechBtn.disabled = true

		speechSynthesis.speak(utterance)
	}
}

const respondToUser = msg => {
	const whoRUMsg = ['who are you','who are you?','who are u','who are u?']
	if(whoRUMsg.some(m => m.includes(msg.toLowerCase()))){
		data.push({
			type:'from',
			msg:`I'm Leia.`,
			timestamp: Date.now()
		})
		updateChatBox('from',`I'm Leia`)
		playText(`I'm Leia`)
	}else{
		data.push({
			type:'from',
			msg:`Sorry. I haven't learnt this yet.`,
			timestamp: Date.now()
		})
		updateChatBox('from',`Sorry. I haven't learnt this yet.`)
		playText(`Sorry. I haven't learnt this yet.`)
	}
}

const chatBox = document.querySelector('.chatBox');

for(let m of data){
	updateChatBox(m.type,m.msg);
	// playText(m.msg);
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral' ];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('.startSpeech').onclick = function() {
  recognition.start();
  speechBtn.title = 'Listening ...'
  speechBtn.querySelector('i').textContent = 'graphic_eq';
  console.log('Ready to receive a color command.');
}

function onEnd(){
	speechBtn.title = 'Talk to Leia';
  speechBtn.querySelector('i').textContent = 'mic'; //settings_voice
  recognition.stop();
}
recognition.onresult = function(event) {
	onEnd()
  let mesg = event.results[0][0].transcript;
  console.log(mesg)
  if(mesg.charAt(mesg.length - 1) === '.') mesg = mesg.slice(0,-1)
  data.push({
  	type:'to',
  	msg: mesg,
	  timestamp: Date.now()
	})
  updateChatBox('to',mesg);

  console.log('Result received: ', mesg);

  respondToUser(mesg)
}
recognition.onspeechend = function() {
  console.log('end')
  onEnd()
}
recognition.onend = function (){
  console.log('recog end')
	onEnd()
}
recognition.onnomatch = function(event) {
  data.push({
  	type:'from',
	  msg: `I didn't recognise that.`,
	  timestamp: Date.now()
	})
  updateChatBox('from',`I didn't recognise that.`);
  console.log('nomatch', event);
}

recognition.onerror = function(err){
	console.log('err', err)
	onEnd()
}



// Refs
// https://www.w3.org/TR/jsgf/
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
//