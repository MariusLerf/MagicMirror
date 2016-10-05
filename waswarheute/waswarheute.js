/* Magic Mirror
 * Module: WasWarHeute
 */

Module.register("waswarheute",{

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
