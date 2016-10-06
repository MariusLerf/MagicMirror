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
	
	start: function() {
		setInterval(function() {
			self.updateDom();
		}, 2000);
	},
	
	getList: function(url) {
		
		var content = "xx";
		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			success: function(data) {
				content = data.responseData.feed.entries[data.responseData.feed.entries.length - 1].content;
			}
		});
		
		return(content);
	},

	// Override dom generator.
	getDom: function() {
		var d = new Date();
		
		var wrapper = document.createElement("div");
		wrapper.innerHTML = d.getTime();//this.getList(this.config.feedURL);
		return wrapper;
	}
});
