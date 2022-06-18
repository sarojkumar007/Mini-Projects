const Project_Data = [
  {
    name: 'GitHub Finder',
    tags: ['API', 'AJAX'],
    link: `https://sarojkumar.dev/Mini-Projects/GithubFinder/`
  },
  {
    name: 'Glass Effect using CSS',
    tags: ['HTML', 'CSS'],
    link: `https://sarojkumar.dev/Mini-Projects/GlassEffect/`
  },
  {
    name: 'Magic Nav',
    tags: ['CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/MagicNav/`
  },
  {
    name: 'Simple Chat',
    tags: ['JS', 'WebRTC'],
    link: `https://sarojkumar.dev/Mini-Projects/chat/`
  },
  {
    name: 'Simple Video',
    tags: ['JS', 'WebRTC'],
    link: `https://sarojkumar.dev/Mini-Projects/videoCall/`
  },
  {
    name: 'Dino Game',
    tags: ['JS'],
    link: `https://sarojkumar.dev/Mini-Projects/DinoGame/`
  },
  {
    name: 'Tic Tac Toe',
    tags: ['JS', 'CSS'],
    link: `https://sarojkumar.dev/Mini-Projects/TicTacToe/`
  },
  {
    name: 'Tic Tac Toe PureCSS',
    tags: ['CSS'],
    link: `https://sarojkumar.dev/Mini-Projects/TicTacToe_PureCSS/`
  },
  {
    name: 'Encyclopedia Search',
    tags: ['CSS', 'JS', 'AJAX'],
    link: `https://sarojkumar.dev/Mini-Projects/EncyclopediaSearch/`
  },
  {
    name: 'Calculator',
    tags: ['CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/calculator/`
  },
  {
    name: 'Stopwatch',
    tags: ['JS', 'CSS'],
    link: `https://sarojkumar.dev/Mini-Projects/stopwatch/`
  },
  {
    name: 'Memory Game',
    tags: ['HTML', 'CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/MemoryGame/`
  },
  {
    name: 'Quiz App',
    tags: ['AJAX', 'CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/QuizApp/`
  },
  {
    name: 'Random Color',
    tags: ['CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/RandomColor/`
  },
  {
    name: 'Restaurant Menu',
    tags: ['JS', 'CSS'],
    link: `https://sarojkumar.dev/Mini-Projects/RestaurantMenu/`
  },
  {
    name: 'Rock Paper Scissors',
    tags: ['HTML', 'CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/RockPaperScissors/`
  },
  {
    name: 'Simple Chat Bot',
    tags: ['CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/SimpleChatBot/`
  },
  {
    name: 'Word Game',
    tags: ['HTML', 'CSS', 'JS'],
    link: `https://sarojkumar.dev/Mini-Projects/WordGame/`
  }
]

const getTagHTML = tags => {
  let h = ``
  for (let t of tags) {
    h += `<span class="tag">${t}</span>`
  }
  return h
}

const updateTable = data => {
  let h = ``
  for (let p of data) {
    h += `<tr>
            <td>${p.name}</td>
            <td class="df fww">
              ${getTagHTML(p.tags)}
            </td>
            <td>
              <a href="${p.link}" target="_blank" rel="noreferrer noopener" class="link link_icon">
                <span>See Live</span>
                <i class="m-icon-round">bolt</i>
              </a>
            </td>
          </tr>`
  }

  project_data.innerHTML = h;
}

const searchProjects = query => {
  query = query.split(' ').filter(q => q).map(q => q.toLowerCase())
  return Project_Data.filter(
    p => query.some(q => p.name.toLowerCase().includes(q)) || (query.filter(q => p.tags.some(t => t.toLowerCase().includes(q))).length > 0)
  )
}

updateTable(Project_Data);


const handleSearch = e => {
  e.preventDefault();
  const query = search.value;
  if (query) {
    const searchResult = searchProjects(query)
    updateTable(searchResult)
  } else {
    updateTable(Project_Data)
  }
}

search_form.addEventListener('submit', handleSearch)
search.addEventListener('input', handleSearch)