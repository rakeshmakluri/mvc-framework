/* 
	Controller
*/

function Controller( model )
{
	this.model = model;
}

Controller.prototype.initializeView = function()
{
	var currentNode;
	initializeObservablesForDataObject( this );
	this.reBindDataToView();
}

Controller.prototype.reBindDataToView = function()
{
	for( var i = 0; i < nodeList.length; i++ )
	{
		currentNode = nodeList[i];
		var bindingAttributes = mvc.getNodeList( currentNode, ".//@*[starts-with(name(.),'mvc')]" );
		for(var b = 0; b < bindingAttributes.length; b++)
		{
			var bindingProperty = bindingAttributes[0].nodeName;
			var properties = bindingAttributes[0].nodeValue;
			if( bindingProperty == "mvc-bind" )
			{				
				if( properties )
				{
					initializeValue(currentNode, properties, this);
				}
			}
			else if( bindingProperty == "mvc-repeat" ) 
			{
				
			}
		}
	}
}

function initializeValue(currentNode, properties, ctrlr)
{
	var modelData = ctrlr.model.getData();
	properties = mvc.getArrOfBindingProperties( properties );
	var length = properties.length;
	for(var i = 0; i < length; i++)
	{
		var objProp = properties[i].objectProperty;
		if( !modelData.hasOwnProperty( objProp ) )
		{
			modelData[objProp] = createObservable( null, ctrlr );
			continue;
		}
		var data = modelData[objProp]();
		if( properties[i].nodeProperty == "text")
		{
			currentNode.textContent = data;
		}
		else
		{
			currentNode.setAttribute( properties[i].nodeProperty, data );
		}
		addViewListeners( currentNode, modelData, properties[i].objectProperty );
	}
}

function addViewListeners( currentNode, modelData, objectProperty )
{
	var nodeName = currentNode.nodeName.toLowerCase();
	if( nodeName == "input" || nodeName == "select" || nodeName == "textarea" )
	{
		mvc.addEventListener( currentNode, "input", onInputHandler( modelData, objectProperty ));
	}
}

function onInputHandler( modelData, objectProperty )
{
	return function( eventObject )
	{
		modelData[objectProperty]( getSrcElement(  eventObject ).value );
	}
}

function initializeObservablesForDataObject( ctrlr )
{
	dataObject = ctrlr.model.getData();
	if( !dataObject ) return ;
	mapObjectByFields( dataObject, ctrlr );
}

function mapObjectByFields( dataObject, ctrlr )
{
	for( var field in dataObject )
	{
		if( !dataObject.hasOwnProperty( field ) ) continue;
		if( typeof dataObject[field] == "Object" )
		{
			dataObject
		}
		else
		{
			 dataObject[field] = createObservable( dataObject[field], ctrlr )
		}
	}
}

function createObservable( value, ctrlr )
{
	return function( newValue )
	{
		if( typeof newValue != "undefined" )
		{
			value = newValue;
			ctrlr.reBindDataToView()
		}
		return value;
	}
}