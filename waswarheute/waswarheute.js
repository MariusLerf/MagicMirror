/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

	// Default module config.
	defaults: {
		feedURL: "https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom"
	},
	
	feed: "",
	header: "asdf",
	
	i: 0,
	
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	getHeader: function() {
		return this.header;
	},
	
	start: function() {
		this.config.feedURL = "https://raw.githubusercontent.com/mariusl95/MagicMirror/master/waswarheute/test.txt";
		var self = this;
		self.updateContent();
		setInterval(function () {
			self.updateContent();
			self.getHeader();
		}, 5000);//3600000); //1 hour
	},
	
	updateContent: function() {
		var self = this;
		$.ajax({
			url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(self.config.feedURL),
			dataType: 'json',
			success: function(data) {
				self.feed = $( "<span><div id='content' class='xsmall bright'></div></span>" );
				self.feed.find( "#content" ).append(data.responseData.feed.entries[data.responseData.feed.entries.length - 1].content + "</br>url: " + self.config.feedURL);
				self.header = "helou";
				//self.data.header = data.responseData.feed.entries[data.responseData.feed.entries.length - 1].title;
				self.cleanUp();
				self.updateDom(100);
			}
		});
	},
	
	cleanUp: function() {
		var self = this;
		//Remove image
		self.feed.find( "#content img" ).parent().parent().remove();
		//Remove <small> elements
		self.feed.find( "#content small" ).remove();
		//Remove unnecessary span
		self.feed.find( "#content span:not([title])").remove();
		//Remove links
		self.feed.find( "#content a" ).contents().unwrap();
		//Reverse list order
		self.feed.find( "#content ul" ).children().each( function(i, li) {
			self.feed.find( "#content ul" ).prepend(li);
		});
		//Change year display
		self.feed.find( "#content ul li" ).each( function() {
			var span = self.feed.find( this ).find( "span[title]" ).wrap("<b>");
			var t1 =  "<b>  (" + span.attr( "title" ).replace( "Heute v", "V" ) + ")</b>";
			span.after(t1);
		});
		//Remove list bullets
		self.feed.find( "#content ul").css("list-style-type", "none");
	},

	// Override dom generator.
	getDom: function() {
		this.i++;
		var wrapper = document.createElement("div");
		try {
			wrapper.innerHTML = this.feed.html() + this.i;
		}
		catch(err) {
		}
		return wrapper;
	}
});
