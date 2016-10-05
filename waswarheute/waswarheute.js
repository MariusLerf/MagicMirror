/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		
		wrapper.innerHTML = this.config.feedURL + getList();
		
		return wrapper;
	},
	
	
	getList: function() {
		return("hallo");
	}
});
