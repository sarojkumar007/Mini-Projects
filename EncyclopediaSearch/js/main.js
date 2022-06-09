let EncData;
fetch('data/encyclopedia.json', {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {
      EncData = data
    }
  })
  .catch(err => console.error(err))

document.querySelector('#searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = document.querySelector('.input').value;
  if (keyword) {
    const searchRes = searchEnc(keyword);
    document.querySelector('.search-results').innerHTML =
      `<div class="line-scale">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`;
    setTimeout(() => {
      updateSearchUI(searchRes);
    }, 3000);

  }
})

function searchEnc(key) {
  console.log(`Searching ${key} ... Done.`);
  return EncData.filter(item => item.species.toLowerCase().includes(key.toLowerCase()))
}

function updateSearchUI(searchRes) {
  let searchHTML = "";
  if (searchRes.length > 0) {
    for (let s of searchRes) {
      searchHTML += `
        <div class="card">
          <figure class="card-img">
            <img src="${s.image}" alt="${s.species}">
          </figure>
          <div class="card-body">
            <h3>${s.species}</h3>
            <p><strong>Class:</strong> ${s.class}</p>
            <p><strong>Most found in:</strong> ${s.region}</p>
          </div>
        </div>
      `
    }
  }
  document.querySelector('.search-results').innerHTML = searchHTML;
}