/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: "https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom"
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
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(self.config.feedURL),
			dataType: 'json',
			success: function(data) {
				self.feed = $( "<span><div id='content' class='xsmall'></div></span>" );
				self.feed.find( "#content" ).append(data.responseData.feed.entries[data.responseData.feed.entries.length - 1].content);
				//self.cleanUp();
				//self.updateDom();
			}
		});
	},
	
	cleanUp: function() {
		/*var self = this;
		//Remove image
		self.feed.find( "#content img" ).parent().parent().remove();
		//Remove links
		self.feed.find( "#content a" ).contents().unwrap();
		//Reverse list order
		self.feed.find( "#content ul" ).children().each( function(i, li) {
			self.feed.find( "#content ul" ).prepend(li);
		});
		//Create Table
		self.feed.find( "#content" ).append( "<table></table>");	
		self.feed.find( "#content ul li" ).each( function() {
			var span = self.feed.find( this ).find( "span" );
		//	var t1 =  span.attr( "title" ).replace( "Heute v", "V0" ) + " (" + span.html() + "):" ;
		//	span.remove();
		//	var t2 = self.feed.find( this ).html().substring(13);
		//	self.feed.find( "table" ).append("<tr><td>" + t1 + "</td><td>" + t2 + "</td></tr>");
		});
		//$( "ul" ).remove();*/
	},

	// Override dom generator.
	getDom: function() {
		
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.feed;//.html();
		return wrapper;
	}
});
