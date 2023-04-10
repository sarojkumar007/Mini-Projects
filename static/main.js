const Project_Data = [
  {
    name: 'GitHub Finder',
    tags: ['API', 'AJAX'],
    link: `GithubFinder/`,
  },
  {
    name: 'Glass Effect using CSS',
    tags: ['HTML', 'CSS'],
    link: `GlassEffect/`,
  },
  {
    name: 'Magic Nav',
    tags: ['CSS', 'JS'],
    link: `MagicNav/`,
  },
  {
    name: 'Simple Chat',
    tags: ['JS', 'WebRTC'],
    link: `chat/`,
  },
  {
    name: 'Simple Video',
    tags: ['JS', 'WebRTC'],
    link: `videoCall/`,
  },
  {
    name: 'Dino Game',
    tags: ['JS'],
    link: `DinoGame/`,
  },
  {
    name: 'Tic Tac Toe',
    tags: ['JS', 'CSS'],
    link: `TicTacToe/`,
  },
  {
    name: 'Tic Tac Toe PureCSS',
    tags: ['CSS'],
    link: `TicTacToe_PureCSS/`,
  },
  {
    name: 'Encyclopedia Search',
    tags: ['CSS', 'JS', 'AJAX'],
    link: `EncyclopediaSearch/`,
  },
  {
    name: 'Calculator',
    tags: ['CSS', 'JS'],
    link: `calculator/`,
  },
  {
    name: 'Stopwatch',
    tags: ['JS', 'CSS'],
    link: `stopwatch/`,
  },
  {
    name: 'Memory Game',
    tags: ['HTML', 'CSS', 'JS'],
    link: `MemoryGame/`,
  },
  {
    name: 'Quiz App',
    tags: ['AJAX', 'CSS', 'JS'],
    link: `QuizApp/`,
  },
  {
    name: 'Random Color',
    tags: ['CSS', 'JS'],
    link: `RandomColor/`,
  },
  {
    name: 'Restaurant Menu',
    tags: ['JS', 'CSS'],
    link: `RestaurantMenu/`,
  },
  {
    name: 'Rock Paper Scissors',
    tags: ['HTML', 'CSS', 'JS'],
    link: `RockPaperScissors/`,
  },
  {
    name: 'Simple Chat Bot',
    tags: ['CSS', 'JS'],
    link: `SimpleChatBot/`,
  },
  {
    name: 'Word Game',
    tags: ['HTML', 'CSS', 'JS'],
    link: `WordGame/`,
  },
  {
    name: 'Web Note',
    tags: ['HTML', 'CSS', 'JS'],
    link: `WebNote/`,
  },
  {
    name: 'Piano',
    tags: ['HTML', 'CSS', 'JS'],
    link: `Piano/`,
  },
  {
    name: 'Local Image Editor',
    tags: ['HTML', 'CSS', 'JS'],
    link: `ImageEditor/`,
  },
];

const getTagHTML = (tags) => {
  let h = ``;
  for (let t of tags) {
    h += `<span class="tag">${t}</span>`;
  }
  return h;
};

const updateTable = (data) => {
  let h = ``;
  for (let p of data) {
    h += `<tr>
            <td>${p.name}</td>
            <td class="df fww">
              ${getTagHTML(p.tags)}
            </td>
            <td>
              <a href="${
                p.link
              }" target="_blank" rel="noreferrer noopener" class="link link_icon">
                <span>See Live</span>
                <i class="m-icon-round">bolt</i>
              </a>
            </td>
          </tr>`;
  }

  project_data.innerHTML = h;
};

const searchProjects = (query) => {
  query = query
    .split(' ')
    .filter((q) => q)
    .map((q) => q.toLowerCase());
  return Project_Data.filter(
    (p) =>
      query.some((q) => p.name.toLowerCase().includes(q)) ||
      query.filter((q) => p.tags.some((t) => t.toLowerCase().includes(q)))
        .length > 0
  );
};

updateTable(Project_Data);

const handleSearch = (e) => {
  e.preventDefault();
  const query = search.value;
  if (query) {
    const searchResult = searchProjects(query);
    updateTable(searchResult);
  } else {
    updateTable(Project_Data);
  }
};

search_form.addEventListener('submit', handleSearch);
search.addEventListener('input', handleSearch);
