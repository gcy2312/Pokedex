let pokemonRepository = (function(){
  let pokemonList=[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon){
    if(
      typeof pokemon === "object" &&
      "name" in pokemon){
      pokemonList.push(pokemon);
    }else{
      console.log("pokemon is incomplete");
    }
  }
  function getAll(){
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".list-group");
    let itemPokemon = document.createElement("li");
    itemPokemon.classList.add("group-list-item")
    let itemButton = document.createElement("button");
    itemButton.setAttribute("data-toggle", "modal");
    itemButton.setAttribute("data-target", "#myModal");

    itemButton.innerText = pokemon.name;
    itemButton.classList.add("btn", "btn-warning", "btn-lg");

    itemPokemon.appendChild(itemButton);
    pokemonList.appendChild(itemPokemon);

    itemButton.addEventListener("click", function(event){
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
      console.error(e);
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
      console.error(e);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      modalContainer.innerHTML = ' ';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let imgElement = document.createElement('img');
      imgElement.classList.add('pokemon-img');
      imgElement.src = pokemon.imageUrl;

      let heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height: ' + pokemon.height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imgElement);
      modal.appendChild(heightElement);

      //create array of types, then join types w comma
      const typesString = pokemon.types.map((type) => type.type.name)
      const typesJoin = typesString.join(', ')
      let typesElement = document.createElement('p');
      typesElement.innerHTML = 'Types: ' + typesJoin;
      modal.appendChild(typesElement);

      //create array of abilities, then join types w comma
      const abilitiesString = pokemon.abilities.map((ability) => ability.ability.name)
      const abilitiesJoin = abilitiesString.join(', ')
      let abilitiesElement = document.createElement('p');
      abilitiesElement.innerHTML = 'Abilities: ' + abilitiesJoin;
      modal.appendChild(abilitiesElement);

      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) =>{
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });

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
});


//loop to display pokemon names and height
// function myListFunction(pokemon){
//   document.write("<p>" + pokemon.name + " " + '(height: ' + pokemon.height + ')');
//
//   if (pokemon.height > 1.5){
//         document.write(' Wow, that\'s a BIG pokemon!' + "</p>")
//   }else if (pokemon.height < 0.4){
//         document.write(' Awww, so cute and tiny!' + "</p>")
//   }
// };
