/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	
	getList: function(url) {
		return("hallo");
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		//var content = $( "<div></div>" );
		wrapper.innerHTML = this.getList(this.config.feedURL);
		
		return wrapper;
	}
});
