/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("bandsintown",{

	// Default module config.
	defaults: {
		location: "spiez, ch",
		searchRadius: 150,
		bands: ["Eluveitie", "Metallica", "Varg", "Hecht", "Troubas Kater", "Disturbed", "Epica"],
		favCountry: "switzerland",
		maxEntries: 12,
		fade: true,
	},
	
	//Variables
	eventList: [],
	noGigs: [],
	errorList: [],
	updateCounter: 0,
	
	//Get jQuery
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	//First update & set interval to 1h
	start: function() {
		this.updateList();
		setInterval(function() {this.updateDom()}, 1000);
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		/*var t = "";
		this.eventList.forEach(function(event) {
			self.t += event.title + "</br>";
		};*/
    		wrapper.innerHTML = this.getEventList().html();
		return wrapper;
	},
	
	
	
	
	
	//Functions
	/////////////////////////////////////
	
	updateList: function() {
		var self = this;
		self.eventList = [];
		self.errorList = [];
		self.noGigs = [];
		self.updateCounter = 0;
		
		self.config.bands.forEach( function(band) {
			var url = "";
			if (self.config.searchRadius == 0) url = "http://api.bandsintown.com/artists/" + band + "/events/search.json?api_version=2.0&app_id=MagicMirror&location=" + self.config.location;
			else url = "http://api.bandsintown.com/artists/" + band + "/events/search.json?api_version=2.0&app_id=MagicMirror&location=" + self.config.location + "&radius=" + self.config.searchRadius;
			$.ajax({
				url: url,
				dataType: 'jsonp',
				
				success: function(events){
					self.updateCounter++;
					if (events.hasOwnProperty("errors")) {
						self.errorList.push({errorBand: band, errorText: events.errors[0]});
					}
					else if (events.length == 0) {
						self.noGigs.push(band);
					}
					else {
						events.forEach( function(event) {
							self.addEvent(event);
						});
					}
					if (self.updateCounter == self.config.bands.length) {
						self.updateDom(1000);
					}
				},
				
				error: function(arg1, arg2) {
					self.updateCounter++;
					if (self.updateCounter == self.config.bands.length) {
						self.updateDom(1000);
					}
				}
			});
		});
		
		
	},
	
	addEvent: function(event) {
		var self = this;
		if (self.eventList.length == 0) { 
			self.eventList.push(event);
		}
		else {
			var d = Date.parse(event.datetime);
			var skip = false;
			self.eventList.forEach( function(listEvent, i) {
				if (!skip){
					if (d > Date.parse(listEvent.datetime)) {
						self.eventList.splice(i, 0, event);
						skip = true;
					}
				}
			});
			if (!skip) self.eventList.push(event);
		}
	},
	
	getEventList: function() {
		var self = this;
		var list = $( "<span><div id='content' class='xsmall'><ul style='list-style-type:none;'></ul></div></span>");
		var oldDate = new Date(2000, 1, 1);
		var listCount; if (self.eventList < self.config.maxEntries || self.config.maxEntries <= 0) listCount = self.eventList.length; else listCount = self.config.maxEntries;
		var i = listCount - 1;
		var eventi = self.eventList.length -1;
		var fadei; if (self.config.fade) fadei = 6; else fadei = 0;
		while (i >= 0) {
			var event = self.eventList[eventi];
			if (self.config.favCountry == "" || self.config.favCountry.toLowerCase() == event.venue.country.toLowerCase()) {
				var date = new Date(Date.parse(event.datetime));
				if (!(date.getDate() == oldDate.getDate() && date.getMonth() == oldDate.getMonth() && date.getFullYear() == oldDate.getFullYear())) {
					var li = list.find( "#content ul" ).append("<li><b>" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "</b></li>").children().last();
					if (self.config.fade & fadei - i > 0) li.css("opacity", 1 - (fadei - i) * 0.14285714285714285714285714285714);
					oldDate = date;
				}
				var li = list.find( "#content ul" ).append("<li><span>" + event.artists[0].name + "</span> @ " + event.venue.name + " in " + event.formatted_location + "</li>").children().last();
				if (config.fade & fadei - i > 0) li.css("opacity", 1 - (fadei - i) * 0.14285714285714285714285714285714);
				i--;
			}
			eventi--;
			if (eventi < 0) i = -1;
		}
		return list;
	}
	
});
