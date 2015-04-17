

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
