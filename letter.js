// Letter.js: Contains a constructor, Letter.
function Letter(letter, guessed) {
// This constructor should be able to either display an underlying letter or a blank placeholder
// (such as an underscore), depending on whether or not the user has guessed the letter.
// That means the constructor should define:

// A string value to store the underlying letter for the letter
	this.letter = letter;
// A boolean value that stores whether that letter has been guessed yet
	this.guessed = guessed;
// A function that returns the underlying letter if the letter has been guessed,
// or a placeholder (like an underscore) if the letter has not been guessed
	this.showLetter = function() {
    	if (this.guessed === true) {
			return (this.letter + " ");
    	}
    	else {
			return ("_ ");
    	}
	};
// A function that takes a letter as an argument and checks it against the underlying letter,
// updating the stored boolean value to true if it was guessed correctly	
this.compareLetter = function(guessedLetter) {
		if (this.letter === guessedLetter) {
			this.guessed = true;
    	}
	};
};

module.exports = Letter;

