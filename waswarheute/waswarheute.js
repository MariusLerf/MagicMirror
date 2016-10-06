/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: ""
	},
	
	feed: "",
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	start: function() {
		var self = this;
		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom"),
			dataType: 'json',
			success: function(data) {
				self.feed = $( "<span><div id='content' class='xsmall'></div></span>" );
				self.feed.find( "#content" ).append(data.responseData.feed.entries[data.responseData.feed.entries.length - 1].content);
				self.updateDom();
			}
		});
	},

	// Override dom generator.
	getDom: function() {
		
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.feed.html();//this.getList(this.config.feedURL);
		return wrapper;
	}
});
