/* 
	Model
*/
function Model()
{
	var controller = new Controller( this );
	this.controller = controller;
}

Model.prototype.getData = function()
{
	return this.data;
}

Model.prototype.initializeModel = function( data )
{
	this.data = data;
	this.controller.initializeView(data);
}

Model.prototype.setData = function()
{
	
}

