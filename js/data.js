

/* DECLARE GLOBAL VARIALES */

var heroNames = [
	'Druid', 'Hunter', 'Mage',
	'Paladin','Priest','Rogue',
	'Shaman','Warlock','Warrior'
];






/* Define Stats object properties and methods */

//Stats constructor
function Stats()
{
	this.games = {total:0};
	this.wins = {total:0};
	
	for (var i = 0, var h = ''; i < heroNames.length; i++)
	{
		h = heroNames[i];
		this.games[h] = 0;
		this.wins[h] = 0;
	}



	this.victory(hero)
	{
		this.games[hero]++;
		this.games.total++;
		this.wins[hero]++;
		this.wins.total++;
		return this;
	}



	this.defeat(hero)
	{
		this.games[hero]++;
		this.games[total]++;
		return this;
	}



	this.update()
	{
		var tg = 0;
		var tw = 0;
		for (var i = 0; var h = ''; i < heroNames.length; i++)
		{
			h= heroNames[i];
			tg += this.games[h];
			tw += this.wins[h];
		}
		this.games.total = tg;
		this.wins.total = tw;
		return this;
	}



	this.reset()
	{
		this.games.total = 0;
		this.wins.total = 0;

		for (var i = 0; i < heroNames.length; i++)
		{
			this.games[heroNames[h]] = 0;
			this.wins[heroNames[h]] = 0;
		}

		return this;
	}
}








/* Define Matchup object properties and methods
 * 
 * Matchup.properties:
 * 		hero  -- string - records deck's hero class
 * 		name  -- string - records deck name
 * 		games -- int    - records total games played against deck
 * 		wins  -- int    - records total games won against deck
 *
 * Matchup.methods:
 * 		victory()
 * 			records a victory against the deck
 * 		defeat()
 * 			records a loss against the deck
 * 		set(games,wins)
 * 			sets the record agaist the deck to the given games/wins
 * 		reset()
 * 			resets the matchup record to 0 games, 0 wins
 * 		rename(name)
 * 			renames the deck to the given name
 * */

//Matchup constructor
function Matchup(hero,name)
{
	this.hero = hero;
	this.name = name;
	this.games = 0;
	this.wins = 0;
}



Matchup.prototype.victory = function ()
{
	this.games++;
	this.wins++;

	return this;
}



Matchup.prototype.defeat = function ()
{
	this.games++;

	return this;
}



Matchup.prototype.set = function (games,wins)
{
	this.games = games;
	this.wins = wins;

	return this;
}



Matchup.prototype.reset = function ()
{
	this.games = 0;
	this.wins = 0;

	return this;
}



Matchup.prototype.rename = function (name)
{
	this.name = name;

	return this;
}










/* Define Deck object properties and methods 
 * 
 * Deck.properties:
 * 		hero   -- string containing the hero class for the deck
 * 		name   -- string containing the deck's name
 * 		stats  -- Stats object tracks the winrate of the deck
 * 		heroes -- object containing arrays of all deck matchups, and deck
 * 		          matchups broken down by enemy hero.
 *
 * Deck.methods:
 * 		victory(hero,name)
 * 			records a game win against the given hero and deck name
 * 		defeat(hero,name)
 * 			records a game loss against the given hero and deck name
 * 		newMatchup(hero,name)
 * 			creates a new, empty record for the given hero/deck matchup
 * 		getMatchup(hero,name)
 * 			returns the Matchup object for the given hero/deck
 * 		rename(name)
 * 			renames the deck
 * 		compare(deck)
 * 			does string comparisons with the given Deck object as sorting aid
 *
 * 		
 * */

//constructor
function Deck(hero,name)
{
	this.hero = hero;
	this.name = name;
	this.stats = new Stats();
	this.matchups = { all:[] };

	for (var i = 0; i < heroNames.length; i++)
	{
		this.matchups[heroNames[i]] = [];
	}
}



Deck.prototype.victory = function ()
{

}



Deck.prototype.defeat = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}



Deck.prototype. = function ()
{

}





function User(name)
{
	this.name = name;
	this.stats = new Stats();
	this.decks = [];
	this.heroes = {};
	for (var i = 0; i < heroNames.length; i++)
	{
		this.heroes[heroNames[i]] = [];
	}
}



User.prototype.indexOf = function (hero,name)
{
	for (var i = 0; i < this.heroes[hero].length; i++)
	{
		if (this.heroes[hero][i].name == name)
		{
			return i;
		}
	}

	return -1;
}




User.prototype.getAllDecks = function ()
{
	return this.decks;
}



User.prototype.getDecksByHero = function (hero)
{
	return this.heroes[hero];
}



User.prototype.getDeck = function (hero,name)
{
	var i = this.indexOf(hero,name);
	if (i >= 0) return this.heroes[hero][i];
	else return this.addDeck(hero,name);
}



User.prototype.addDeck = function (hero,name)
{
	var deck = new Deck(hero,name);

	this.decks.push(deck);
	this.heroes[hero].push(deck);

	this.decks.sort( function (a,b) { return a.compare(b); } );
	this.heroes[hero].sort( function (a,b) { return a.compare(b); } );

	return deck;

}



User.prototype.removeDeck = function (hero,name)
{	
	var i = this.indexOf(hero,name);
	if (i >= 0)
	{
		this.heroes[hero].splice(i,i+1);
		for (var j = 0; j < this.decks.length; j++)
		{
			if (hero == this.decks[j].hero && name == this.decks[j].name)
			{
				this.decks.splice(j,j+1);
				break;
			}
		}
		this.tidy();
	}
}



User.prototype.renameDeck = function (hero,oldname,newname)
{
	var i = this.indexOf(hero,oldname);
	if (i >= 0)
	{
		this.heroes[hero][i].rename(newname);
	}

	else
	{
		var error = 'User.renameDeck(): ' + this.name + 
		error += ' - deck "' + hero + '.' + oldname + '" does not exits';
		debug(error);
	}
}



User.prototype.getGames = function ()
{
	return this.stats.games.total;
}



User.prototype.getGamesByHero = function (hero)
{
	return this.stats.games[hero];
}



User.prototype.getWins = function ()
{
	return this.stats.wins.total;
}



User.prototype.getWinsByHero = function (hero)
{
	return this.stats.wins[hero];
}



User.prototype.rename = function (name)
{
	this.name = name;
}



User.prototype.tidy = function ()
{
	var hero;
	var games;
	var wins;

	this.stats.reset();

	for (var i = 0; i < heroNames.length; i++)
	{
		hero = heroNames[i];
		for (j = 0; j < this.heroes[hero]; j++)
		{
			games = this.heroes[hero][i].getGames();
			this.stats.games.total += games;
			this.stats.games[hero] += games;

			wins = this.heroes[hero][i].getWins();
			this.stats.wins.total += wins;
			this.stats.wins[hero] += wins;
		}
	}
}
