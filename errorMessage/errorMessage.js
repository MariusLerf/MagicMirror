/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("errorMessage",{

	// Default module config.
	defaults: {
	},
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	getStyles: function() {
		return ["errorMessage.css"];
	},
	
	start: function() {
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
    		wrapper.innerHTML("<div class='testDiv'>teest</div>");
		return wrapper;
	}
});
