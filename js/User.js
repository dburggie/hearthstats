
//class User
//	String name
//	Map<String,Vector<Deck>> decks

//initializes User properties
function User(name)
{
	this.name = name;
	this.byDeck = {}; //decks will be added like this: user.decks["deckname"]
	this.byHero = {}; //each classname is a key accessing an array of decks
	for (var i = 0; i < heroNames.length; i++)
	{
		this.byHero[heroNames[i]] = [];
	}
}

//define User methods
User.prototype.addDeck = function (hero,name)
{
	var deck = new Deck(hero,name);
	
	this.byDeck[name] = deck;
	this.byDeck.sort( DeckCompare(a,b) );
	
	this.byHero[hero].push(deck);
	this.byHero[hero].sort( DeckCompare(a,b) );

	return deck;
}

User.prototype.getDeckByName = function (name)
{
	return this.byDeck[name];
}

User.prototype.getDecksByHero = function (hero)
{
	return this.byHero[hero];
}





