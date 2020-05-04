const baseUrl = 'https://pokeapi.co/api/v2';

async function getPokemon() {
  let res = await axios.get(`${baseUrl}/pokemon/?limit=500`);
  console.log(res);
}

async function get3Pokemon() {
  const pokemonUrls = [];
  const threeUrls = [];
  let res = await axios.get(`${baseUrl}/pokemon/?limit=500`);
  let data = res.data.results;

  data.forEach((element) => {
    pokemonUrls.push(element.url);
  });

  for (let i = 0; i < 3; i++) {
    let randomUrl = pokemonUrls[Math.floor(Math.random() * pokemonUrls.length)];
    threeUrls.push(randomUrl);
  }

  let pokemon = await Promise.all([threeUrls.map((element) => axios.get(element))]);

  // returning a promise for our 3 pokemon
  pokemon.forEach((p) => console.log(p));
}

async function pokemons() {
  const $btn = $('.btn');
  const $pokemon = $('.pokemon');

  $btn.on('click', async function () {
    let starterPokemonUrls = [];

    $pokemon.empty();
    let res = await axios.get(`${baseUrl}/pokemon/?limit=500`);
    let data = res.data.results;

    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let url = data.splice(randomIndex, 1)[0].url;
      starterPokemonUrls.push(url);
    }

    let pokemonData = await Promise.all(starterPokemonUrls.map((res) => axios.get(res)));
    let speciesData = await Promise.all(pokemonData.map((p) => axios.get(p.data.species.url)));

    speciesData.forEach((element, index) => {
      let descriptionObj = element.data.flavor_text_entries.find(function (entry) {
        return entry.language.name === 'en';
      });
      let description = descriptionObj ? descriptionObj.flavor_text : '';
      let name = pokemonData[index].data.name;
      let img = pokemonData[index].data.sprites.front_default;
      $pokemon.append(pokemondCard(name, img, description));
    });
  });
}

pokemons();

function pokemondCard(name, img, description) {
  return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${img} />
        <p>${description}</p>
      </div>
    `;
}
