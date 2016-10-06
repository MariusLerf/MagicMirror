/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},
	
	text: "abc",
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	start: function() {
		
	},
	
	socketNotificationReceived: function(notification, payload) {
		this.text = payload;
	},
	
	getList: function(url) {
		var content = "xx";
		return(content);
	},

	// Override dom generator.
	getDom: function() {
		
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.text;//this.getList(this.config.feedURL);
		return wrapper;
	}
});
