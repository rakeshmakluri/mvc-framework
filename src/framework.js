/*
	framework
*/
(function(srcWindow){
	
	srcWindow.mvc = new commonLibrary();
	srcWindow.mvc.addEventListener(srcWindow.document, "DOMContentLoaded", initializeDocument);
	
	function initializeDocument()
	{
		var docElement = document.documentElement;
		srcWindow.nodeList = srcWindow.mvc.getNodeList(document.documentElement, ".//@*[starts-with(name(.),'mvc')]/..");	
	}
	
	function commonLibrary()
	{
		this.getNodeList = function(element, xpath)
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

		this.addEventListener = function(element, type, fn)
		{
			var ownerDoc = element.ownerDocument || element;
			ownerDoc.addEventListener ? element.addEventListener(type, fn, false) : element.attachEvent('on' + type, fn);
		}

		this.getSrcElement = function( eventObject )
		{
			return eventObject.srcElement || eventObject.target;
		}

		this.getArrOfBindingProperties = function( propertyString )
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
	}
	
})(window);