/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("helloworld",{

	// Default module config.
	defaults: {
		feedURL: "https://de.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday&feedformat=atom"
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
    wrapper.attr("id", "content");
		wrapper.innerHTML = getList(this.config.feedURL);
		return wrapper;
	}
  
  function getList(url) {
    return("hi");
  }
});
