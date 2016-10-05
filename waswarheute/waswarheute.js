/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},
	
	
	getList: function(url) {
		return("hallo");
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		
		wrapper.innerHTML = this.getList(this.config.feedURL);
		
		return wrapper;
	}
});
