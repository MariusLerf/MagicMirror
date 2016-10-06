var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
	start: function() {
		this.sendSocketNotification("TEXT", "heyhey");
	},
});
