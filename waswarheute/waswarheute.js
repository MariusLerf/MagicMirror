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
				cleanUp();
				self.updateDom();
			}
		});
	},
	
	cleanUp: function() {
		//Remove image
		feed.find( "#content img" ).parent().parent().remove();
		/*//Remove links
		$( "#content a" ).contents().unwrap();
		//Reverse list order
		$( "#content ul" ).children().each( function(i, li) {
			$( "#content ul" ).prepend(li);
		});
		//Create Table
		$( "#content" ).append( "<table></table>");	
		$( "#content ul li" ).each( function() {
			var span = $( this ).find( "span" );
			var t1 =  span.attr( "title" ).replace( "Heute v", "V0" ) + " (" + span.html() + "):" ;
			span.remove();
			var t2 = $( this ).html().substring(13);
			$( "table" ).append("<tr><td>" + t1 + "</td><td>" + t2 + "</td></tr>");
		});
		$( "ul" ).remove();*/
	},

	// Override dom generator.
	getDom: function() {
		
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.feed.html();//this.getList(this.config.feedURL);
		return wrapper;
	}
});
