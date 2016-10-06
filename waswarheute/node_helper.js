var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
	
	i: 0,
	
	start: function() {
		var self = this
		setInterval(function() {
			self.sendSocketNotification("TEXT", "heyhey " + i);
			i++;
		}, 1000);
	},
});
