let pokemonRepository = (function(){
  let repository=[];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon){
    if(
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "weight" in pokemon &&
      "type" in pokemon &&
      "abilities" in pokemon &&
      "attack" in pokemon &&
      "defense" in pokemon &&
      "speed" in pokemon){
      repository.push(pokemon);
    }else{
      console.log("pokemon is incomplete");
    }
  }
  function getAll(){
    return repository;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let itemPokemon = document.createElement("li");
    let itemButton = document.createElement("button");

    itemButton.innerText = pokemon.name;
    itemButton.classList.add("item-btn");

    itemPokemon.appendChild(itemButton);
    pokemonList.appendChild(itemPokemon);

    itemButton.addEventListener('click', function(){
      showDetails(pokemon);
    })
  };
  function showDetails(pokemon){
    console.log(pokemon.name);
  };

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




  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
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
