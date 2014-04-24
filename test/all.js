describe("MVC Framework Test Suite", function() {

	var controller = model.controller;
	
	it("Observable createion test", function() {
		var observable = createObservable( "20", controller );
		expect(observable()).toBe("20");
	});
	
	it("Observable creation for model data object", function() {
		dataObject = {
						name : "MVC",
						version	:	"1.0"
					};
		model.setData( dataObject);
		initializeObservablesForDataObject( controller );
		expect(dataObject.name()).toBe("MVC");
		expect(dataObject.version()).toBe("1.0");
	});
	
});