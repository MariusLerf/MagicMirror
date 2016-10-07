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
	}
});
