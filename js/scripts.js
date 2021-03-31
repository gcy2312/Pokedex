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
    let pokemonList = document.querySelector(".pokemon-list");
    let itemPokemon = document.createElement("li");
    let itemButton = document.createElement("button");

    itemButton.innerText = pokemon.name;
    itemButton.classList.add("item-btn");

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
      pokemon.types.forEach((type) =>{
        let typesElement = document.createElement('p');
        typesElement.innerHTML = 'Types: ' + type.type.name;

        modal.appendChild(typesElement);
      })

      // pokemon.types.forEach((type) =>{
      //   console.log(type.type.name);
      // })
      // let typesElement = document.createElement('p');
      // typesElement.innerHTML = 'Types: ' + pokemon.types.type.name;
      // modal.appendChild(typesElement);

      pokemon.abilities.forEach((ability) =>{
        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerHTML = 'Abilities: ' + ability.ability.name;

        modal.appendChild(abilitiesElement);
      })

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
