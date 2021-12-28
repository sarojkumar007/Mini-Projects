'use strict';

// Helper Functions
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

(function(){
if(window.NodeList && !NodeList.prototype.filter && !NodeList.prototype.map){
	NodeList.prototype.filter = Array.prototype.filter
	NodeList.prototype.map = Array.prototype.map
}

// const dataFile = 'https://sarojkumar007.github.io/doc/qusns.json';
const dataFile = 'data/qusns.json';

const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const startBtn = document.querySelector('.startBtn');
const testInfo = document.querySelector('.testInfo');
const form = document.querySelector('#examForm');
const qusn_wrap = document.querySelector('.qusn_wrap');
const nextBtns = document.querySelectorAll('.nextBtn');
const prevBtns = document.querySelectorAll('.prevBtn');
const retakeBtn = document.querySelector('.retakeBtn');
const totalQ = document.querySelector('#totalQ');
const timer = document.querySelector('#timer');
const resultArea = document.querySelector('.resultArea');
const scor = document.querySelector('#score');
const res_info = document.querySelector('.res_info');
const examResult = document.querySelector('.examResult');
const res_correctQ = document.querySelector('#examResult_correctQ');
const res_attendedQ = document.querySelector('#examResult_attended');
const res_totalQ = document.querySelector('#examResult_totalQ');
const hourGlass = document.querySelector('.hourGlassAnimation');

let QUSNS,TimerInterval,AnimInterval,ExamResult;

const Icons = ['hourglass_empty','hourglass_top','hourglass_bottom','hourglass_full'];

const postSubmit = () => {
	const formData = new FormData(form);
	const ansSheet = {}
	for(let k of formData.keys()){
		ansSheet[k] = formData.get(k);
	}

	ExamResult = matchAns(QUSNS, ansSheet);
	updateResultUI(ExamResult)
	// stop timer
	stopTimer(TimerInterval,AnimInterval);
	form.reset();

	testInfo.classList.remove('active');
	page2.classList.remove('current');
	page3.classList.add('current');
}

form.addEventListener('submit', e => {
	e.preventDefault();
	postSubmit();
});

const startTimer = sec => {
	let counter = 0;
	const intvl = setInterval(()=>{
		counter++;
		if(counter === Icons.length){
			counter = 0;
		}
		hourGlass.textContent = Icons[counter];
		hourGlass.style = `transform: rotate(${counter*45}deg)`;
	},500);

	let timeIntvl = setInterval(()=>{
		sec--;
		showTimerUI(sec);
		if(sec === 0){
			stopTimer(timeIntvl,intvl);
			postSubmit();
		}
	},1000);

	return [timeIntvl, intvl];
}

const stopTimer = (timer,anim) => {
	clearInterval(timer);
	clearInterval(anim);
	hourGlass.textContent = Icons[0];
	hourGlass.style = '';
	showTimerUI(0);
}

const showTimerUI = sec => {
	let h = 0;
	let m = 0;
	let s = 0;
	for(let i = 0; i < sec; i++){
		s++;
		if(s == 60){
			m++;
			s = 0
		}
		if(m === 60){
			h++;
			m = 0
		}
	}

	timer.textContent = `${leftPad(m,2)}:${leftPad(s,2)}`;
}

const getQuestions = async (callback) => {
	const res = await fetch(dataFile);
	const data = await res.json();
	// Send Data randomly
	const isInSet = [];
	while(isInSet.length !== data.length){
		let ranQ = Math.floor(Math.random() * data.length)
		if(!isInSet.includes(ranQ)) isInSet.push(ranQ)
	}

	const newData = [];
	isInSet.forEach(i => newData.push(data[i]));

	callback(newData);
}

const startExam = () => {
	page1.classList.remove('current');
	page2.classList.add('current');
	testInfo.classList.add('active');
	getQuestions(data => {
		updateQuestions(data);
		QUSNS = data;
	});
}

startBtn.addEventListener('click', startExam);

const updateResultUI = result => {
	if(parseFloat(result.percentage) > 50) {
		res_info.textContent = 'You passed the Exam!';
		resultArea.classList.remove('error');
		resultArea.classList.add('success');
	}else{
		res_info.textContent = 'You failed the Exam!';
		resultArea.classList.remove('success');
		resultArea.classList.add('error');
	}
	scor.textContent = `${result.percentage}%`;
	res_correctQ.textContent = leftPad(result.correct,2);
	res_attendedQ.textContent = leftPad(result.qusns_attended,2);
	res_totalQ.textContent = leftPad(result.total,2);
	examResult.classList.add('active');
}

qusn_wrap.addEventListener('click',e => {
	const moveToBtn = e.target.closest('.nextBtn') || e.target.closest('.prevBtn') || undefined;
	if(moveToBtn){
		e.preventDefault();
	//-----------------
		const moveQusnId = Number(moveToBtn.dataset.move)
		const moveQusn = document.querySelector(`#q${moveQusnId}`);
		if(moveQusnId && moveQusn){
			document.querySelectorAll('.question').filter(
				q => q.id !== `q${moveQusnId}`
			).forEach(
				q => {q.classList.remove('current')}
			)
			moveQusn.classList.add('current');
		}
	//---------------
	}
});

const updateQuestions = data => {
	let totalSecs = 0;
	let qHTML = "";
	for(let i = 1; i <= data.length; i++){
		totalSecs += data[i-1].time;

		if(i == 1){
			qHTML += `<div class="question current" id="q${i}">`;
		}else{
			qHTML += `<div class="question" id="q${i}">`
		}

		qHTML += `<h3>Q${i}. ${data[i-1].question}</h3>
			<div class="opts">
				<div class="opt opt1">
					<input type="radio" name="q${i}" id="q${i}o1" value="1">
					<label for="q${i}o1">
					<span>${data[i-1].opt1}</span>
					</label>
				</div>
				<div class="opt opt2">
					<input type="radio" name="q${i}" id="q${i}o2" value="2">
					<label for="q${i}o2">
						<span>${data[i-1].opt2}</span>
					</label>
				</div>
				<div class="opt opt3">
					<input type="radio" name="q${i}" id="q${i}o3" value="3">
					<label for="q${i}o3">
						<span>${data[i-1].opt3}</span>
					</label>
				</div>
				<div class="opt opt4">
					<input type="radio" name="q${i}" id="q${i}o4" value="4">
					<label for="q${i}o4">
						<span>${data[i-1].opt4}</span>
					</label>
				</div>
			</div>`;
		if(i == 1){
			qHTML += `<div class="cta">
				<button class="btn iconBtn nextBtn" data-move="${i+1}">
					<span>Next</span>
					<i class="m-icon-round">chevron_right</i>
				</button>
			</div>`;
		}
		else if(i == data.length){
			qHTML += `<div class="cta">
				<button class="btn iconBtn prevBtn" data-move="${i-1}">
					<i class="m-icon-round">chevron_left</i>
					<span>Prev</span>
				</button>				
			</div>
			<div class="cta">
				<button class="btn iconBtn submitBtn" type="submit">
					<i class="m-icon-round">done_all</i>
					<span>Submit</span>
				</button>
			</div>`;
		}
		else{
			qHTML += `<div class="cta">
			<button class="btn iconBtn prevBtn" data-move="${i-1}">
				<i class="m-icon-round">chevron_left</i>
				<span>Prev</span>
			</button>
			<button class="btn iconBtn nextBtn" data-move="${i+1}">
				<span>Next</span>
				<i class="m-icon-round">chevron_right</i>
			</button>
		</div>`;
		}
		qHTML += `</div>`;
	}

	qusn_wrap.innerHTML = qHTML;
	totalQ.textContent = leftPad(data.length,2);
	[TimerInterval,AnimInterval] = startTimer(totalSecs);
}

const matchAns = (data,ansSheet) => {
	// console.log(data, ansSheet);
	let count = 0;
	for(let i = 1; i <= data.length; i++){
		if(ansSheet[`q${i}`] && (data[i-1].ans === Number(ansSheet[`q${i}`]))){
			count++;
		}
	}

	return {
		"total": data.length,
		"correct": count,
		"qusns_attended": Object.keys(ansSheet).length,
		"percentage": parseFloat(count/data.length*100).toFixed(2)
	}
}

retakeBtn.addEventListener('click',() => {
	resultArea.classList.remove('error', 'success');
	examResult.classList.remove('active');
	page3.classList.remove('current');
	page1.classList.add('current');
});

})()
