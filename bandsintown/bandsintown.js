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
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
    		wrapper.innerHTML = "hi";
		return wrapper;
	},
	
	
	
	
	
	//Functions
	/////////////////////////////////////
	
	update: function() {
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
						self.finishUpdate();
					}
				},
				
				error: function(arg1, arg2) {
					self.updateCounter++;
					if (self.updateCounter == self.config.bands.length) {
						self.finishUpdate();
					}
				}
			});
		});
		
		
	},
	
	
	
});
