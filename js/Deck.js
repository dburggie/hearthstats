
//Deck constructor
function Deck(hero,name)
{
	this.name = name;
	this.hero = hero;
	this.totalGames = 0;
	this.totalWins = 0;
	this.byHero = {};
	for (var i = 0; i < heroNames.length; i++)
	{
		this.byHero[heroNames[i]] = new Matchup(heroNames[i]);
	}
}

//define Deck methods
Deck.prototype.getMatchup = function (
