/*
	framework
*/
addEventListener(window.document, "DOMContentLoaded", initializeDocument);
var nodeList;
window.model = new Model();

function initializeDocument()
{
	var docElement = document.documentElement;
	window.nodeList = getNodeList(document.documentElement, ".//@*[starts-with(name(.),'mvc')]/..");
	
}
function getNodeList(element, xpath)
{
	var nodes = document.evaluate( xpath, element,null,XPathResult.ANY_TYPE,null);
	var node = nodes.iterateNext(), nodesArray = [];
	while( node )
	{
		nodesArray[nodesArray.length] = node;
		node = nodes.iterateNext();
	}
	return nodesArray;
}

function addEventListener(element, type, fn)
{
	window.document.addEventListener ? element.addEventListener(type, fn, false) : element.attachEvent('on' + type, fn);
}

function getSrcElement( eventObject )
{
	return eventObject.srcElement || eventObject.target;
}

function getArrOfBindingProperties( propertyString )
{
	var properties = propertyString.split(",");
	var obj = new Array( properties.length );
	for(var i = 0; i < properties.length; i++)
	{
		obj[i] = {};
		var p = properties[i].split(":");
		obj[i].nodeProperty = p[0].trim();
		obj[i].objectProperty = p[1].trim();
	}
	return obj;
}