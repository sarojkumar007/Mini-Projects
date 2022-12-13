const accesptedKeys = [];
const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const shouldShowKeys = document.querySelector('.keys-checkbox input');

pianoKeys.forEach((k) => {
  accesptedKeys.push(k.dataset.key);
  k.addEventListener('click', () => playTune(k.dataset.key));
});

let audio = new Audio(`tunes/a.wav`);

function playTune(key) {
  if (audio) audio.src = `tunes/${key}.wav`;
  else audio = new Audio(`tunes/${key}.wav`);

  audio.volume = volumeSlider.value / 100;
  audio.play();
}

function pressedKey(e) {
  if (accesptedKeys.includes(e.key)) {
    const el = document.querySelector(`[data-key="${e.key}"]`);
    el.classList.add('active');
    playTune(e.key);
  }
}

function upKey(e) {
  if (accesptedKeys.includes(e.key)) {
    const el = document.querySelector(`[data-key="${e.key}"]`);
    el.classList.remove('active');
  }
}

document.addEventListener('keydown', pressedKey);
document.addEventListener('keyup', upKey);

function handleVolume(e) {
  document.getElementById('vol').textContent = e.target.value;
}
volumeSlider.addEventListener('input', handleVolume);

function showHideKeys(e) {
  pianoKeys.forEach((k) => {
    if (e.target.checked) {
      k.classList.remove('hide');
    } else {
      k.classList.add('hide');
    }
  });
}
shouldShowKeys.addEventListener('input', showHideKeys);

window.onload = function () {
  document.getElementById('vol').textContent = volumeSlider.value;
};
