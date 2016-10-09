/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("bandsintown",{

	// Default module config.
	defaults: {
		location: "spiez, ch",
		searchRadius: 150,
		bands: ["Eluveitie", "Metallica"],
		filterCountry: "",
		maxEntries: -1,
		fade: true,
	},
	
	//Variables
	eventList: [],
	noGigs: [],
	errorList: [],
	updateCounter: 0,
	firstUpdate: false,
	
	
	//Get jQuery
	getScripts: function() {
		return [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
		]
	},
	
	//First update & set interval to 1/2h
	start: function() {
		var self = this;
		setInterval(function() {
			self.updateList();
		}, 1000 * 60 * 30);
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
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
		
		self.checkDouble();
		
		if (self.config.bands.length == 0) self.firstUpdate = true;
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
					self.firstUpdate = true;
					if (self.updateCounter == self.config.bands.length) {
						self.updateDom();
					}
				},
				
				error: function(arg1, arg2) {
					self.updateCounter++;
					self.firstUpdate = true;
					if (self.updateCounter == self.config.bands.length) {
						self.updateDom();
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
	
	checkDouble: function() {
		var self = this;
		self.config.bands.forEach( function(band, i) {
			while (self.config.bands.indexOf(band) != self.config.bands.lastIndexOf(band)) {
				self.config.bands.splice(self.config.bands.indexOf(band), 1);
			}
		});
	},
	
	getEventList: function() {
		var self = this;
		if (self.eventList.length == 0) {
			if (!self.firstUpdate) return $( "<span>Loading...</span>" );
			return $( "<span>No Gigs :(</br><span class='xsmall'>(with your configuration...)</span></span>" );
		}
		var list = $( "<span><div id='content' class='xsmall'><ul style='list-style-type:none;'></ul></div></span>");
		var oldDate = new Date(2000, 1, 1);
		var i; if (self.eventList < self.config.maxEntries || self.config.maxEntries <= 0) i = self.eventList.length - 1; else i = self.config.maxEntries - 1;
		var eventi = self.eventList.length -1;
		while (i >= 0) {
			var event = self.eventList[eventi];
			if (self.config.filterCountry == "" || self.config.filterCountry.toLowerCase() == event.venue.country.toLowerCase()) {
				var date = new Date(Date.parse(event.datetime));
				if (!(date.getDate() == oldDate.getDate() && date.getMonth() == oldDate.getMonth() && date.getFullYear() == oldDate.getFullYear())) {
					var li = list.find( "#content ul" ).append("<li><b>" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "</b></li>").children().last();
					oldDate = date;
				}
				var li = list.find( "#content ul" ).append("<li class='bright'><b>" + event.artists[0].name + "</b> @ " + event.venue.name + " in " + event.formatted_location + "</li>").children().last();
				i--;
			}
			eventi--;
			if (eventi < 0) i = -1;
		}
		if (self.config.fade) {
			list.find( "li" ).slice(-7).each( function(i, li) {
				$( li ).css("opacity", 1 - i * (1/7));
			});
		}
		return list;
	}
	
});
