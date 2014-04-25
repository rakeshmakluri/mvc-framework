/*
	framework
*/
(function(srcWindow){
	
	srcWindow.mvc = new commonLibrary();
	srcWindow.mvc.addEventListener(srcWindow.document, "DOMContentLoaded", initializeDocument);
	
	function initializeDocument()
	{
		var docElement = document.documentElement;
		srcWindow.nodeList = srcWindow.mvc.getNodeList(document.documentElement, ".//*//*[not(@mvc-repeat)]/*/@*[starts-with(name(.),'mvc')]/.. | .//*[@mvc-repeat]");	
	}
	
	function commonLibrary()
	{
		/**
		 * @description
		 * Evalutes the xpath against the element and returns the result as array.
		 *
		 * @param {Node} element -- element node
		 * @param {XPath} xpath -- xpath expression to be evaluated against node
		 * @returns {Array} Returns the node list as array
		 */
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
		
		/**
		 * @description
		 * Attaches the DOM event listener to the element 
		 *
		 * @param {Node | Document} element -- element node on which the event to be added
		 * @param {Event(String)} type -- type of the event to be attached to the element. It should be without "on"
		 * @param {Function} fn -- event listener function.
		 */
		this.addEventListener = function(element, type, fn)
		{
			var ownerDoc = element.ownerDocument || element;
			ownerDoc.addEventListener ? element.addEventListener(type, fn, false) : element.attachEvent('on' + type, fn);
		}
		
		/**
		 * @description
		 * Returns the  source element where the event got generated
		 *
		 * @param {Object} eventObject -- it should be the DOM event object which is passed as parameter to the eventlistener
		 * @returns {DOM Element} Returns the DOM element
		 */
		this.getSrcElement = function( eventObject )
		{
			return eventObject.srcElement || eventObject.target;
		}
		
		/**
		 * @description
		 * Insertes the new element after the existing child element
		 *
		 * @param {DOM Element} element -- new node to be inserted
		 * @param {DOM Element} childElement -- the child element where the new element to be inserted after
		 */
		this.insertElementAfterChild = function( element, childElement )
		{
			var parentNode = childElement.parentNode;
			childElement.nextSibling ? parentNode.insertBefore( element, childElement.nextSibling ) : parentNode.appendChild( element );
		}
		
		/**
		 * @description
		 * Separates the different binding properties which are comma(,) separated and returns the binding properties as array of objects
		 * for ex: "value: name, type: elementType" converted to [{nodeProperty: value, objectProperty:name}, {nodeProperty: type, objectProperty:elementType}]
		 *
		 * @param {String} propertyString -- comma separated binding properties. For Ex: "value: name, type: elementType"
		 * @returns {Array} Returns the Array of objects
		 */
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