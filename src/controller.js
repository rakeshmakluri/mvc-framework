/* 
	Controller
*/

/**
 * @description
 * Controller initializes the view and listen to the changes in the view and modifies the model data
 * also listens to the model data changes and updates the view correspondingly
 *
 * @param {Model Object} model -- it is the model to which the controller registered to.
 */
function Controller( model )
{
	this.model = model;
}

/**
 * @description
 * Initializes(binds the data) the view for the first time and also creates listeners for the view and observables for the Model data
 *
 */
Controller.prototype.initializeView = function()
{
	var currentNode;
	initializeObservablesForDataObject( this );
	this.reBindDataToView();
}

/**
 * @description
 * It will rebind the data to the view. It is use full when the model data is modified and the data to be rebinded to the view.
 *
 */
Controller.prototype.reBindDataToView = function()
{
	for( var i = 0; i < nodeList.length; i++ )
	{
		currentNode = nodeList[i];
		var bindingAttributes = mvc.getNodeList( currentNode, "@*[starts-with(name(.),'mvc')]" );
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
				initializeCollection( currentNode, properties, this )
			}
		}
	}
}

/**
 * @description
 * Creates the observable(listener) for specific field of an object.
 * This api is useful when specific fields are added dynamically to the model data after initialization of the model
 *
 * @param {Object} dataObject -- Model data object
 * @param {String} field -- the field and data object to which observable should be created
 */
Controller.prototype.createObservableForField = function( dataObject, field)
{
	 dataObject[field] = createObservable( dataObject[field], this );
}


function initializeCollection( cNode, collectionExpression, ctrlr )
{
	var collection = getCollectionObject( collectionExpression, ctrlr.model.getData() );	
	var docFrag = cNode.ownerDocument.createDocumentFragment();
	
	for(var i = 0; i < collection.length; i++)
	{
		var newNode = cNode.cloneNode( true );
		var nodes = mvc.getNodeList( newNode, ".//@mvc-bind/.." );
		for(var j = 0; j < nodes.length; j++)
		{			
			if( nodes[j].getAttribute("mvc-bind") ) initializeValue( nodes[j], nodes[j].getAttribute("mvc-bind"), ctrlr, collection[i] );
		}
		docFrag.appendChild( newNode );
	}
	mvc.insertElementAfterChild( docFrag, cNode );
	//Hide template node
	cNode.style.display = "none";
	
}

function getCollectionObject( expr, dataObj )
{
	var pS = expr.split(".");
	//if( pS.length == 1 ) return dataObj;
	for( var i = 0; i < pS.length; i++ )
	{
		dataObj = dataObj[pS[i]];
	}
	return dataObj;
}

function initializeValue(currentNode, properties, ctrlr, objectData)
{
	var modelData = objectData || ctrlr.model.getData();
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
		if( typeof dataObject[field] == "object" )
		{
			mapObjectByFields( dataObject[field], ctrlr );
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