// index.js: The file containing the logic for the course of the game,
// which depends on Word.js and:
var word = require("./word.js");
var inquirer = require("inquirer");
// Randomly selects a word and uses the Word constructor to store it

// Prompts the user for each guess and keeps track of the user's remaining guesses

var pokedex = ["Abra", "Aerodactyl", "Alakazam", "Arbok", "Arcanine", "Articuno", "Beedrill", "Bellsprout",
	"Blastoise", "Bulbasaur", "Butterfree", "Caterpie", "Chansey", "Charizard", "Charmander", "Charmaeleon",
	"Clefable", "Clefairy", "Cloyster", "Cubone", "Dewgong", "Diglett", "Ditto", "Dodrio", "Doduo", "Dragonaire",
	"Dragonite", "Dratini", "Drowzee", "Dugtrio", "Eevee", "Ekans", "Electabuzz", "Electrode", "Exeggcute",
	"Exeggutor", "Farfetchd", "Fearow", "Flareon", "Gastly", "Gengar", "Geodude", "Gloom", "Golbat", "Goldeen",
	"Golduck", "Golem", "Graveler", "Grimer", "Growlithe", "Gyarados", "Haunter", "Hitmonchan", "Hitmonlee",
	"Horsea", "Hypno", "Ivysaur", "Jigglypuff", "Jolteon", "Jynx", "Kabuto", "Kabutops", "Kadabra", "Kakuna",
	"Kangaskhan", "Kingler", "Koffing", "Krabby", "Lapras", "Lickitung", "Machamp", "Machoke", "Machop",
	"Magikarp", "Magmar", "Magnemite",  "Magneton", "Mankey", "Marowak", "Meowth", "Metapod", "Mew", "Mewtwo",
	"Moltres", "MrMime", "Muk", "Nidoking", "Nidoqueen", "Nidoran", "Nidorino", "Nidorina", "Ninetales",
	"Oddish", "Omanyte", "Omastar", "Onix", "Paras", "Parasect", "Persian", "Pidgeot", "Pidgeotto", "Pidgey",
	"Pikachu", "Pinsir", "Poliwag", "Poliwhirl", "Poliwrath", "Ponyta", "Porygon", "Primeape", "Psyduck",
	"Raichu", "Rapidash", "Raticate", "Rattata", "Rhydon", "Rhyhorn", "Sandshrew", "Sandslash", "Scyther",
	"Seadra", "Seaking", "Seel", "Shellder", "Slowbro", "Slowpoke", "Snorlax", "Spearow", "Squirtle", "Starmie",
	"Staryu", "Tangela", "Taurus", "Tentacool", "Tentacruel", "Vaporeon", "Venomoth", "Venonat", "Venusaur",
	"Victreebel", "Vileplume", "Voltorb", "Vulpix", "Wartortle", "Weedle", "Weepinbell", "Weezing", "Wigglytuff",
	"Zapdos", "Zubat"];

var lives = 10;
var guessedLetters = [];
var game = "";

var playGame = function() {
	guessedLetters = [];
	randomWord = pokedex[Math.floor(Math.random() * pokedex.length)];
	game = new word.word(randomWord);
	console.log("WHO'S THAT POKÉMON?");
	game.returnWord();
	turn();
};

var turn = function() {
	inquirer.prompt({
		type: "input",
		message: "PICK A LETTER",
		name: "guess"
		}).then(function(response) {
			if (word.alphabet.indexOf(response.guess.toLowerCase()) === -1) {
			console.log("POKÉDEX RECOGNIZES LETTERS ONLY");
			turn();
	    	}
	    	else {
    			if (guessedLetters.indexOf(response.guess.toLowerCase()) === -1) {
       				if (game.letters.indexOf(response.guess.toLowerCase()) === -1) {
        				lives = lives - 1;
        				guessedLetters.push(response.guess.toLowerCase());
        				console.log("LETTER NOT FOUND. TRY AGAIN");
        				console.log("LIVES LEFT:" + lives);
	        			if (lives > 0) {
	            			game.returnWord();
	            			turn();
	          			}
	          			else {
	            			console.log("\n" + "YOU NEED MORE TRAINING!" + "\n");
	            			restart();
	          			}
        			}
        			else {
        				guessedLetters.push(response.guess.toLowerCase());
        				console.log("ONE LESS LETTER TO GUESS!");
        				console.log("LIVES LEFT:" + lives);
        				game.guess(response.guess.toLowerCase());
        				game.returnWord();
         
        				if (game.currentGame.indexOf("_ ") === -1) {
            				console.log("\n" + "YOU'RE ONE STEP CLOSER TO GETTING A BADGE!" + "\n");
            				playGame();
         
          				}
          				else {
            				turn();
          				}
        			}
     
      			}
      			else {
        			console.log("THAT LETTER HAS ALREADY BEEN LOGGED!");
        			console.log("LIVES LEFT:" + lives);
        			game.returnWord();
        			turn();
    			}
    		}
  		});
};


var restart = function() {
	inquirer.prompt({
		type: "confirm",
		message: "WANNA TRAIN MORE?",
		name: "confirm",
		default: true
		}).then(function(response) {
			if (response.confirm === true) {
	    		lives = 10;
	      		playGame();
	    	}
	    	else {
	     		console.log("'TIL NEXT TIME!");
	    	}
	  	});
};


var initialize = function() {
	inquirer.prompt({
		type: "confirm",
		message: "DO YOU WANNA BE THE BEST?",
		name: "confirm",
		default: true
		}).then(function(response) {
			if (response.confirm === true) {
	      		playGame();
	    	}
	    	else {
	     		console.log("WHENEVER YOU'RE READY!");
	    	}
	  	});
};

initialize();