/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: "https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom"
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
