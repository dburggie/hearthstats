
function PRNG(seed, max = 100)
{
	this.prime = 232591;
	this.state = 1 + seed * seed;
	this.state %= this.prime;
	this.max %= this.prime;
}

PRNG.prototype.get = function ()
{
	this.state = 1 + this.state * this.state;
	this.state %= this.prime;
	return this.state % this.max;
}

