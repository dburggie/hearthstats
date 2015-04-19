
var toTest = ['Stats','Matchup','Deck','User']

var test_link_button = '<button type="button" onclick="revealTestLinks()">tests</button>';

var test_link_area = '<div id="test_links">';
    test_link_area += test_link_button + '</div>';

document.write(test_link_area);


function revealTestLinks()
{
	var text = '<p>';
	var link = '';
	
	for (var i = 0; i < toTest.length; i++)
	{
		link = '<a href="test/' + toTest[i] + '.html">' + toTest[i] + '</a> ';
		text += link;
	}

	text += '</p>';

	document.getElementById("test_links").innerHTML = text;
}

