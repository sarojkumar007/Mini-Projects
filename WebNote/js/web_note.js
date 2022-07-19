const generateRandomId = () => "note-" + Math.random().toString(16).slice(2);
// -----------------------------
const noteWrap = document.querySelector(".note_container");
const Themes = [
	{
		c1: "#ffafbd",
		c2: "#ffc3a0",
	},
	{
		c1: "#2193b0",
		c2: "#6dd5ed",
	},
	{
		c1: "#cc2b5e",
		c2: "#753a88",
	},
	{
		c1: "#42275a",
		c2: "#734b6d",
	},
	{
		c1: "#de6262",
		c2: "#ffb88c",
	},
	{
		c1: "#06beb6",
		c2: "#48b1bf",
	},
	{
		c1: "#614385",
		c2: "#516395",
	},
	{
		c1: "#eecda3",
		c2: "#ef629f",
	},
	{
		c1: "#02aab0",
		c2: "#00cdac",
	},
	{
		c1: "#000428",
		c2: "#004e92",
	},
	{
		c1: "#7b4397",
		c2: "#dc2430",
	},
	{
		c1: "#4568dc",
		c2: "#b06ab3",
	},
	{
		c1: "#ffd89b",
		c2: "#19547b",
	},
	{
		c1: "#ff5f6d",
		c2: "#ffc371",
	},
	{
		c1: "#36d1dc",
		c2: "#5b86e5",
	},
	{
		c1: "#c33764",
		c2: "#1d2671",
	},
	{
		c1: "#aa076b",
		c2: "#61045f",
	},
];
let allNotes;
function saveNotes(n) {
	window.localStorage.setItem("_web_note", JSON.stringify(n));
}
const myObserver = new ResizeObserver((entries) => {
	entries.forEach((entry) => {
		const nId = entry.target.dataset.noteId;
		updateNoteConfig(nId, {
			w: entry.contentRect.width,
			h: entry.contentRect.height,
			spellcheck: entry.target.querySelector("textarea.note_content")
				.spellcheck,
		});
	});
});
function updateNoteUI(n) {
	let h = ``;
	for (let i of n) {
		const style = [];
		if (i.theme)
			style.push(
				`background-image: linear-gradient(to top left,${i.theme.c1}, ${i.theme.c2})`
			);
		if (i.config) style.push(`width:${i.config.w}px;height:${i.config.h}px;`);
		h += `
    <div class="note" style="${style.join(";")}"  data-note-id="${i.noteId}">
      <div class="note_head">
        <span class="note_add" role="button">
          <i class="m-icon-round">add</i>
        </span>
        <div class="line_vert">
          <div class="line_vert action dropdown" role="button">
            <span class="note_action lh0">
              <i class="m-icon-round">more_horiz</i>
            </span>
            <div class="dropdown_menu">
              <span class="dropdown_item changeTheme">Change Theme</span>
              <span class="dropdown_item toggleSpellCheck">Spell Check (${i.config?.spellcheck ? "ON" : "OFF"
			})</span>
              <span class="dropdown_item resetSize">Reset Size</span>
            </div>
          </div>
          <span class="note_close" role="button">
            <i class="m-icon-round">close</i>
          </span>
        </div>
      </div>
      <textarea 
      class="note_content scroll" 
      spellcheck="${i.config?.spellcheck ? i.config.spellcheck : false}"
      placeholder="Write Note Here"
      oninput="updateNote(event)">${i.noteText}</textarea>
    </div>`;
	}
	noteWrap.innerHTML = h;
	document.querySelectorAll(".note").forEach((el) => {
		myObserver.observe(el);
	});
}
function onNoteResize(e) {
	console.log(e);
}
function addNote() {
	allNotes.push({
		noteId: generateRandomId(),
		noteText: "",
		theme: Themes[Math.floor(Math.random() * Themes.length)],
	});
	updateNoteUI(allNotes);
	saveNotes(allNotes);
}
function deleteNote(id) {
	allNotes = allNotes.filter((_n) => _n.noteId !== id);
	myObserver.unobserve(document.querySelector(`[data-note-id=${id}]`));
	updateNoteUI(allNotes);
	saveNotes(allNotes);
}
function updateNoteConfig(id, config) {
	allNotes[allNotes.findIndex((_n) => _n.noteId === id)].config = config;
	saveNotes(allNotes);
}
function updateNote(e) {
	const noteId = e.target.closest(".note").dataset.noteId;
	const text = e.target.value;
	allNotes[allNotes.findIndex((_n) => _n.noteId === noteId)].noteText = text;
	saveNotes(allNotes);
	// updateNote(allNotes);
}
document.getElementById("add_note").addEventListener("click", addNote);
document.getElementById("clear_note").addEventListener("click", () => {
	if (
		allNotes.length > 0 &&
		confirm("All the Notes will be deleted. Click OK to Proceed.")
	) {
		document.querySelectorAll(".note").forEach((el) => {
			myObserver.unobserve(el);
		});
		allNotes = [];
		updateNoteUI(allNotes);
		saveNotes(allNotes);
	}
});
noteWrap.addEventListener("click", (e) => {
	if (e.target.closest(".note_add")) {
		addNote();
	}
	if (e.target.closest(".note_action")) {
		// e.target.closest(".note_action").querySelector("i").textContent ===
		// "more_horiz"
		//   ? (e.target.closest(".note_action").querySelector("i").textContent =
		//       "more_vert")
		//   : (e.target.closest(".note_action").querySelector("i").textContent =
		//       "more_horiz");
		e.target.closest(".dropdown")?.classList.toggle("active");
	}
	if (e.target.closest(".note_close")) {
		const noteId = e.target.closest(".note").dataset.noteId;
		deleteNote(noteId);
	}
	// Actions
	if (e.target.closest(".resetSize")) {
		const noteId = e.target.closest(".note").dataset.noteId;
		updateNoteConfig(noteId, { w: 240, h: 280 });
		updateNoteUI(allNotes);
	}
	if (e.target.closest(".toggleSpellCheck")) {
		const noteId = e.target.closest(".note").dataset.noteId;
		const note = document.querySelector(`[data-note-id=${noteId}]`);
		note.querySelector("textarea.note_content").spellcheck =
			!note.querySelector("textarea.note_content").spellcheck;
		updateNoteConfig(noteId, {
			w: note.clientWidth,
			h: note.clientHeight,
			spellcheck: note.querySelector("textarea.note_content").spellcheck,
		});
		updateNoteUI(allNotes);
	}
	if (e.target.closest(".changeTheme")) {
		const noteId = e.target.closest(".note").dataset.noteId;
		console.log(`Clicked Change Theme`, noteId);
	}
});

noteWrap.addEventListener("mousedown mouseup", (e) => {
	console.log(e);
	if (e.type === "mousedown") {
		console.log("hold");
	}
});

//START
window.addEventListener("load", () => {
	const prevData = window.localStorage.getItem("_web_note");
	allNotes = prevData ? JSON.parse(prevData) : [];
	updateNoteUI(allNotes);
	saveNotes(allNotes);
});