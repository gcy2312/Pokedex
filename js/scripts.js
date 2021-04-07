let pokemonRepository = (function(){
  let pokemonList=[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector(".modal-dialog");

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
      let modalBody = document.querySelector(".modal-body");
      let modalTitle = document.querySelector(".modal-title");
      let modalHeader = document.querySelector(".modal-header");

      // empty existing modal content
      $(modalTitle).empty();
      $(modalBody).empty();

      let titleElement = document.createElement('h3');
      titleElement.innerText = pokemon.name;

      let imgElement = document.createElement('img');
      imgElement.classList.add('pokemon-img');
      imgElement.src = pokemon.imageUrl;

      let heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height: ' + pokemon.height;

      modalTitle.appendChild(titleElement);
      modalBody.appendChild(imgElement);
      modalBody.appendChild(heightElement);

      //create array of types, then join types w comma
      const typesString = pokemon.types.map((type) => type.type.name)
      const typesJoin = typesString.join(', ')
      let typesElement = document.createElement('p');
      typesElement.innerHTML = 'Types: ' + typesJoin;
      modalBody.appendChild(typesElement);

      //create array of abilities, then join types w comma
      const abilitiesString = pokemon.abilities.map((ability) => ability.ability.name)
      const abilitiesJoin = abilitiesString.join(', ')
      let abilitiesElement = document.createElement('p');
      abilitiesElement.innerHTML = 'Abilities: ' + abilitiesJoin;
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
