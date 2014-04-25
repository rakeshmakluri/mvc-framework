/* 
	Model
*/
/**
 * @description
 * Model which contains the data and it also creates the controller and registers the model to it.
 */
window.model = new Model();
function Model()
{
	var controller = new Controller( this );
	this.controller = controller;
}

/**
 * @description
 * returns the model data
 *
 *@returns returns the model data
 */
Model.prototype.getData = function()
{
	return this.data;
}

/**
 * @description
 * Inserts the data in to the model and initializes the view(binds the data to the view)
 *
 *@param {Object} data -- data which should be binded to the view, it should be in JSON format
 */
Model.prototype.initializeModel = function( data )
{
	this.data = data;
	this.controller.initializeView(data);
}

/**
 * @description
 * It justs sets the data to the model
 *
 *@param {Object} data -- data which should be binded to the view, it should be in JSON format
 */
Model.prototype.setData = function( data )
{
	this.data = data;
}

