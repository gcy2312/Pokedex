const pokemonRepository = (function(){
  let pokemonList=[];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon){
    if(
      typeof pokemon === 'object' &&
      'name' in pokemon){
      pokemonList.push(pokemon);
    }else{
      console.log('pokemon is incomplete'); // eslint-disable-line
    }
  }
  function getAll(){
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    const itemPokemon = document.createElement('li');
    itemPokemon.classList.add('group-list-item')
    const itemButton = document.createElement('button');
    itemButton.setAttribute('data-toggle', 'modal');
    itemButton.setAttribute('data-target', '#myModal');

    itemButton.innerText = pokemon.name;
    itemButton.classList.add('btn', 'btn-warning', 'btn-lg');

    itemPokemon.appendChild(itemButton);
    pokemonList.appendChild(itemPokemon);

    itemButton.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function loadList(){
    return fetch(apiUrl).then (function(response){
      return response.json();
    }).then (function (json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e); // eslint-disable-line
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url). then (function(response){
      return response.json();
    }).then (function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function(e){
      console.error(e); // eslint-disable-line
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      const modalBody = document.querySelector('.modal-body');
      const modalTitle = document.querySelector('.modal-title');

      // empty existing modal content
      modalBody.innerHTML = ' ';
      modalTitle.innerHTML = ' ';

      const titleElement = document.createElement('h3');
      titleElement.innerText = pokemon.name;

      const imgElement = document.createElement('img');
      imgElement.classList.add('pokemon-img');
      imgElement.src = pokemon.imageUrl;

      const heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height: ' + pokemon.height;

      modalTitle.appendChild(titleElement);
      modalBody.appendChild(imgElement);
      modalBody.appendChild(heightElement);

      //create array of types, then join types w comma
      const types = pokemon.types.map(({type}) => type.name).join(', ');
      const typesElement = document.createElement('p');
      typesElement.innerHTML = 'Types: ' + types;
      modalBody.appendChild(typesElement);

      //create array of abilities, then join types w comma
      const abilities = pokemon.abilities.map(({ability}) => ability.name).join(', ');
      const abilitiesElement = document.createElement('p');
      abilitiesElement.innerHTML = 'Abilities: ' + abilities;
      modalBody.appendChild(abilitiesElement);
    });
  }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
  })()

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
  const searchInput = document.querySelector('#search-input');
  const buttons = document.querySelectorAll('#pokemon-list li button');

  searchInput.addEventListener('keyup', event =>{
    buttons.forEach(button =>
    button.textContent.includes(event.target.value)
    ?button.parentElement.style.display = 'block'
    :button.parentElement.style.display = 'none'
    )
  });
  searchInput.addEventListener('search', event => { // eslint-disable-line
    buttons.forEach(button => button.parentElement.style.display = 'block');
  });
});
