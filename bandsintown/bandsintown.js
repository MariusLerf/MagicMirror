/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("bandsintown",{

	// Default module config.
	defaults: {
	},
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	start: function() {
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
    wrapper.innerHTML = "hi";
		return wrapper;
	}
});
