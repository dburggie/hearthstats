
var toTest = ['Stats','Matchup','Deck','User']

document.write('<div id="errorArea"><p>We did not write anything here for some reason</p></div>');



function runTests(tests)
{
	var errors = [];

	for (var i = 0; i < tests.length; i++)
	{
		errors.concat(tests[i]());
	}

	if (errors.length == 0)
	{
		document.getElementById("errorArea").innerHTML =
			"<h1>No errors detected!</h1>";
	}

	else
	{
		var text = '';
		for (var i = 0; i < errors.length; i++)
		{
			text += "<p>" + errors[i] + "</p>";
		}
		document.getElementById("errorArea").innerHTML = text;
	}
}
