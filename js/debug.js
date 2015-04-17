document.write("<div id='debug_area'></div>");
function debug(message)
{
	var debugArea = document.getElementById('debug_area');
	debugArea.innerHTML += "<p>" + message + "<\p>";
}
