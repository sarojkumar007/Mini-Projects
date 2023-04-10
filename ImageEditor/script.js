// Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const editBtns = document.querySelectorAll('.edit-btn');
const activeAction = document.getElementById('action-head');
const optionPercent = document.querySelector('.option-percent');
const optionRange = document.querySelector('#option-range-input');
const resetBtn = document.querySelector('.reset-btn');
const saveBtn = document.querySelector('.save-btn');

const imagePreview = document.querySelector('#image-preview');
const imageInput = document.querySelector('#choose-img-input');

// Global Values

let ACTIVE_ACTION = 1;
let selectedFilename = '';

// prettier-ignore
let ImageFilters = {1: 100, 2: 100, 3: 0, 4: 0, rotate: 0, flip: [1,1]};

//
const ACTIONS = ['Brightness', 'Saturation', 'Inversion', 'Grayscale'];
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    ACTIVE_ACTION = parseInt(btn.dataset.action);

    filterBtns.forEach((b) => {
      if (b !== btn) b.classList.remove('active');
    });
    btn.classList.add('active');
    activeAction.textContent = ACTIONS[ACTIVE_ACTION - 1];

    // True for 3 and 4, False for 1 and 2
    optionRange.max = ACTIVE_ACTION - 2 > 0 ? 100 : 200;

    optionPercent.textContent = ImageFilters[ACTIVE_ACTION] + '%';
    optionRange.value = ImageFilters[ACTIVE_ACTION];
  });
});

editBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switch (btn.dataset.edit) {
      case 'left':
        ImageFilters.rotate -= 90;
        break;
      case 'right':
        ImageFilters.rotate += 90;
        break;
      case 'hori':
        ImageFilters.flip[0] = ImageFilters.flip[0] > 0 ? -1 : 1;
        break;
      case 'vert':
        ImageFilters.flip[1] = ImageFilters.flip[1] > 0 ? -1 : 1;
        break;
      default:
        break;
    }
    applyFilters();
  });
});

function applyFilters() {
  imagePreview.style.filter = `brightness(${ImageFilters[1]}%) saturate(${ImageFilters[2]}%) invert(${ImageFilters[3]}%) grayscale(${ImageFilters[4]}%)`;
  imagePreview.style.transform = `rotate(${ImageFilters.rotate}deg) scale(${ImageFilters.flip[0]},${ImageFilters.flip[1]})`;
}

function changePercent(e) {
  optionPercent.textContent = e.target.value + '%';
  ImageFilters[ACTIVE_ACTION] = parseInt(e.target.value);

  applyFilters();
}

optionRange.addEventListener('input', changePercent);

function resetFilters() {
  // prettier-ignore
  ImageFilters = {1: 100, 2: 100, 3: 0, 4: 0, rotate: 0, flip: [1,1]};
  applyFilters();
  ACTIVE_ACTION = 1;
  optionRange.max = 200;

  filterBtns.forEach((b) => b.classList.remove('active'));
  filterBtns[0].classList.add('active');

  activeAction.textContent = ACTIONS[ACTIVE_ACTION - 1];
  optionPercent.textContent = ImageFilters[ACTIVE_ACTION] + '%';
  optionRange.value = ImageFilters[ACTIVE_ACTION];
}

resetBtn.addEventListener('click', resetFilters);

function loadImage() {
  // prettier-ignore
  const acceptedFormats = ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi','png','gif','webp','tiff','tif','psd','raw', 'arw', 'cr2', 'nrw', 'k25','bmp', 'dib','heif', 'heic','jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2','svg', 'svgz','ico']

  const file = imageInput.files[0];
  if (!file) return;

  const extension = file.name.split('.').pop();
  if (!acceptedFormats.includes(extension)) {
    alert(`Not a image file or format is not supported.\nTry again!`);
    return;
  }

  selectedFilename = file.name.split('.').slice(0, -1).join('.');
  console.log(ImageFilters);
  imagePreview.src = URL.createObjectURL(file);
  document.querySelector('main').classList.remove('disabled');
}

imageInput.addEventListener('change', () => {
  loadImage();
  resetFilters();
});

function saveImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.save();
  canvas.width = imagePreview.naturalWidth;
  canvas.height = imagePreview.naturalHeight;

  ctx.filter = `brightness(${ImageFilters[1]}%) saturate(${ImageFilters[2]}%) invert(${ImageFilters[3]}%) grayscale(${ImageFilters[4]}%)`;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (ImageFilters.rotate !== 0)
    ctx.rotate((ImageFilters.rotate * Math.PI) / 180);
  ctx.scale(ImageFilters.flip[0], ImageFilters.flip[1]);

  ctx.drawImage(
    imagePreview,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  ctx.restore();

  const link = document.createElement('a');
  link.download = `${selectedFilename}_edit.png`;
  link.href = canvas.toDataURL();
  link.click();
}

saveBtn.addEventListener('click', saveImage);
