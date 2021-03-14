let pokemonList=[
  {name: "Bulbasaur",
  height: 0.7,
  weight: 6.9,
  type: ["grass", "poison"],
  abilities: ["chlorophyll", "overegrow"],
  attack: 49,
  defense: 49,
  speed: 45
  },

  {name: "Charmander",
  height: 0.6,
  weight: 8.5,
  type: ["fire"],
  abilities:["blaze", "solar-power"],
  attack: 52,
  defense: 43,
  speed: 65
  },

  {name: "Squirtle",
  height: 0.5,
  weight: 9,
  type: ["water"],
  abilities:["rain-dish", "torrent"],
  attack: 48,
  defense: 65,
  speed: 43
  },

  {name: "Weedle",
  height: 0.3,
  weight: 3.2,
  type: ["bug", "poison"],
  abilities: ["sheild-dust", "run-away"],
  attack: 35,
  defense: 30,
  speed: 50
  },

  {name: "Ekans",
  height: 2,
  weight: 6.9,
  type: ["poison"],
  abilities: ["intimidate", "shed-skin", "unnerve"],
  attack: 60,
  defense: 44,
  speed: 55
  },

  {name: "Pikachu",
  height: 0.4,
  weight: 6,
  type: ["electric"],
  abilities: ["static", "lightningrod"],
  attack: 55,
  defense: 40,
  speed: 90
  },

  {name: "Slowpoke",
  height: 1.2,
  weight: 36,
  type: ["psychic", "water"],
  abilities: ["oblivious", "own-tempo", "regenerator"],
  attack: 65,
  defense: 65,
  speed: 15
  },

  {name: "Graveler",
  height: 1,
  weight: 105,
  type: ["rock", "ground"],
  abilities: ["sturdy", "sand-veil", "rock-head"],
  attack: 95,
  defense: 115,
  speed: 35
  }
]

//loop to display pokemon names and height
for (let i= 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + " " + '(height: ' + pokemonList[i].height + ')')

  //conditional big and small additional text
  if(pokemonList[i].height > 1.5){
    document.write(' Wow, that\'s a BIG pokemon!')
  }else if(pokemonList[i].height < 0.4){
    document.write(' Awww, so cute and tiny!')
  }
  document.write("<br>")
}
