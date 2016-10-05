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
		wrapper.innerHTML = getList(this.config.feedURL);
		return wrapper;
	}
	
	function getList(url) {
		return("hello ;)");
	}
});
