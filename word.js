// Word.js: Contains a constructor, Word that depends on the Letter constructor.
// This is used to create an object representing the current word the user is attempting to guess.
var Letter = require("./letter.js");

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
	"n", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function Word(currentWord) {
	this.letters = currentWord;
	this.currentGame = "";

// An array of new Letter objects representing the letters of the underlying word
	this.lettersArray = [];
// A function that returns a string representing the word. This should call the function on each letter object
// (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
	this.returnWord = function() {
    	var displayWord = "";
    	for (var i = 0; i < this.lettersArray.length; i++) {
    		displayWord = displayWord + this.lettersArray[i].showLetter();
    	}
    	this.currentGame = displayWord;
    	console.log("\n" + displayWord.toUpperCase() + "\n");
	};
// A function that takes a character as an argument and calls the guess function on each letter object
// (the second function defined in Letter.js)
	this.guess = function(guessedLetter) {
    	for (var i = 0; i < this.lettersArray.length; i++) {
    		this.lettersArray[i].compareLetter(guessedLetter);
    	}
  	};

	for (var i = 0; i < this.letters.length; i++) {
		var character = "";
    	if (alphabet.indexOf(this.letters[i].toLowerCase()) === -1) {
    		character = new Letter(this.letters[i], true);
    	}
    	else {
    		character = new Letter(this.letters[i], false);
    	}
    	this.lettersArray.push(character);
  	}
};


module.exports = {
  word: Word,
  alphabet: alphabet
};