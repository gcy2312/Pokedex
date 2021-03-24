let pokemonRepository = (function(){
  let pokemonList=[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function(){
      console.log(item);
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
