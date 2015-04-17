//get global hear

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
}
