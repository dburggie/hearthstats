

/* DECLARE GLOBAL VARIALES */

var heroNames = [
	'Druid', 'Hunter', 'Mage',
	'Paladin','Priest','Rogue',
	'Shaman','Warlock','Warrior'
];






/* Define Stats object properties and methods 
 * 
 * Stats.properties:
 * 		games -- records total games and games broken down by hero class
 * 		wins  -- records total wins and wins broken down by hero class
 *
 * Stats.methods:
 * 		victory(hero)
 * 			records a victory against the given hero
 * 		defeat(hero)
 * 			records a defeat against the given hero
 * 		update()
 * 			recounts the total games/wins by tabulating the stats per hero
 * 		reset()
 * 			resets the statistics to 0 games, 0 wins for all heroes
 * 		setHero(hero,games,wins)
 * 			sets the statistics for the given hero to the given totals
 * */

//Stats constructor
function Stats()
{
	var i;
	var h = '';
	this.games = {all:0};
	this.wins = {all:0};
	
	for (i = 0; i < heroNames.length; i++)
	{
		h = heroNames[i];
		this.games[h] = 0;
		this.wins[h] = 0;
	}
}



Stats.prototype.victory = function(hero)
{
	this.games[hero]++;
	this.games.all++;
	this.wins[hero]++;
	this.wins.all++;
	return this;
}



Stats.prototype.defeat = function(hero)
{
	this.games[hero]++;
	this.games.all++;
	return this;
}



Stats.prototype.update = function()
{
	var tg = 0;
	var tw = 0;

	var i;
	var h = '';
	for (i = 0; i < heroNames.length; i++)
	{
		h= heroNames[i];
		tg += this.games[h];
		tw += this.wins[h];
	}
	this.games.all = tg;
	this.wins.all = tw;
	return this;
}



Stats.prototype.reset = function()
{
	this.games.all = 0;
	this.wins.all = 0;

	var h = '';

	for (var i = 0; i < heroNames.length; i++)
	{
		h = heroNames[i];
		this.games[heroNames[h]] = 0;
		this.wins[heroNames[h]] = 0;
	}

	return this;
}



Stats.prototype.setHero = function(hero,games,wins)
{
	var diff = 0;

	diff = this.games[hero] - games;
	this.games[hero] = games;
	this.games.all += diff;
	
	diff = this.wins[hero] - wins;
	this.wins[hero] = wins;
	this.wins.all += diff;

	return this;
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
 * 		compare(matchup)
 * 			returns -1,0,1 according to usual comparison rules for sorting
 * */

//Matchup constructor
function Matchup(hero,name)
{
	this.hero = hero;
	this.name = name;
	this.games = 0;
	this.wins = 0;
}



Matchup.prototype.victory = function()
{
	this.games++;
	this.wins++;

	return this;
}



Matchup.prototype.defeat = function()
{
	this.games++;

	return this;
}



Matchup.prototype.set = function(games,wins)
{
	this.games = games;
	this.wins = wins;

	return this;
}



Matchup.prototype.reset = function()
{
	this.games = 0;
	this.wins = 0;

	return this;
}



Matchup.prototype.rename = function(name)
{
	this.name = name;

	return this;
}



Matchup.prototype.compare = function(matchup)
{
	var cmp = this.hero.localeCompare(matchup.hero);

	if (!cmp)
	{
		cmp = this.name.localeCompare(matchup.name);
	}

	return cmp;
}










/* Define Deck object properties and methods 
 * 
 * Deck.properties:
 * 		hero     -- string containing the hero class for the deck
 * 		name     -- string containing the deck's name
 * 		stats    -- Stats object tracks the winrate of the deck
 * 		matchups -- object containing arrays of all deck matchups, and deck
 * 		            matchups broken down by enemy hero.
 *
 * Deck.methods:
 * 		victory(hero,name)
 * 			records a game win against the given hero and deck name
 * 		defeat(hero,name)
 * 			records a game loss against the given hero and deck name
 * 		addMatchup(hero,name)
 * 			creates a new, empty record for the given hero/deck matchup
 * 		removeMatchup(hero,name)
 * 			deletes all data for the given matchup
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



Deck.prototype.getMatchup = function(hero,name)
{
	var m;

	for (var i = 0; i < this.matchups.length; i++)
	{
		m = this.matchups[hero][i];
		if (m.name == name)
		{
			return m;
		}
	}

	return undefined;
}



Deck.prototype.addMatchup = function(hero,name)
{
	//verify DNE
	var matchup = this.getMatchup(hero,name);
	if (matchup) return matchup;
	else matchup = new Matchup(hero,name);

	//add new matchup to this.matchups.all
	this.matchups.all.push(matchup);
	this.matchups.all.sort( function (a,b) { return a.compare(b); }	);

	//add new matchup to this.matchups[hero]
	this.matchups[hero].push(matchup);
	this.matchups[hero].sort( function (a,b) { return a.compare(b); } );

	return matchup;
}



Deck.prototype.removeMatchup = function(hero,name)
{
	var i;
	var m;

	for (i = 0; i < this.matchups.all.length; i++)
	{
		m = this.matchups.all[i];
		if (hero == m.hero && name == m.name)
		{
			this.matchups.all.splice(i,i+1);
			break;
		}
	}

	for (i = 0; i < this.matchups[hero].length; i++)
	{
		m = this.matchups[hero][i];
		if (hero == m.hero && name == m.name)
		{
			this.matchups[hero].splice(i,i+1);
			break;
		}
	}

	return this;
}



Deck.prototype.getMatchupByHero = function(hero)
{
	return this.matchups[hero];
}



Deck.prototype.getAllMatchups = function()
{
	return this.matchups.all;
}



Deck.prototype.victory = function(hero,name)
{
	this.stats.victory(hero);
	this.getMatchup(hero,name).victory();

	return this;
}



Deck.prototype.defeat = function(hero,name)
{
	this.stats.defeat(hero);
	this.getMatchup(hero,name).defeat();

	return this;
}



Deck.prototype.rename = function(name)
{
	this.name = name;

	return this;
}



Deck.prototype.compare = function(deck)
{
	var cmp = this.hero.localeCompare(deck.hero);

	if (!cmp)
	{
		cmp = this.name.localeCompare(deck.name);
	}

	return cmp;
}













/* Define User object properties and methods
 *
 * User.properties:
 * 		name  -- string containing user name
 * 		stats -- tracks win/loss rates over all decks for user
 * 		decks -- object tracking decks
 * 		         Index by hero name strings for array of all associated decks
 * 		         'all' property is an array of all decks
 *
 * 	User.methods:
 * 		getDeck(hero,name);
 * 		getDecksByHero(hero);
 * 		getAllDecks();
 * 		addDeck(hero,name);
 * 		removeDeck(hero,name);
 * 		renameDeck(hero,oldname,newname);
 * 		rename(name);
 * 		compare(user);
 * */

function User(name)
{
	this.name = name;
	this.decks = { all:[] };
	for (var i = 0; i < heroNames.length; i++)
	{
		this.decks[heroNames[i]] = [];
	}
}



User.prototype.getDeck = function(hero,name)
{
	var d;

	for (var i = 0; i < this.decks[hero].length; i++)
	{
		if (this.decks[hero][i].name == name)
		{
			return this.decks[hero][i];
		}
	}

	return undefined;
}



User.prototype.getAllDecks = function()
{
	return this.decks.all;
}



User.prototype.getDecksByHero = function(hero)
{
	return this.decks[hero];
}



User.prototype.addDeck = function(hero,name)
{
	var deck = this.getDeck(hero,name);
	if (deck) return deck;
	else deck = new Deck(hero,name);

	this.decks.all.push(deck);
	this.decks[hero].push(deck);

	this.decks.all.sort( function (a,b) { return a.compare(b); } );
	this.decks[hero].sort( function (a,b) { return a.compare(b); } );

	return deck;
}



User.prototype.removeDeck = function(hero,name)
{	
	var i;

	for (i = 0; i < this.decks.all.length; i++)
	{
		if (hero == this.decks.all[i].hero && name == this.decks.all[i].name)
		{
			this.decks.all.splice(i,i+1);
			break;
		}
	}

	for (i = 0; i < this.decks[hero].length; i++)
	{
		if (name == this.decks[hero][i].name)
		{
			this.decks[hero].splice(i,i+1);
			break;
		}
	}

	return this;
}



User.prototype.renameDeck = function(hero,oldname,newname)
{
	var d = this.getDeck(hero,oldname);

	if (d)
	{
		d.rename(newname);
		this.decks.all.sort( function(a,b) { return a.compare(b); } );
		this.decks[hero].sort( function(a,b) { return a.compare(b); } );
	}

	return this;
}



User.prototype.rename = function(name)
{
	this.name = name;

	return this;
}



User.prototype.compare = function(user)
{
	return this.name.localeCompare(user);
}
