/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},
	
	
	getList: function() {
		return("hallo");
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		
		var x = "";
		wrapper.innerHTML = this.config.feedURL;
		
		return wrapper;
	}
});
