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
		
		wrapper.innerHTML = this.config.feedURL + getList();
		
		return wrapper;
	}
});
