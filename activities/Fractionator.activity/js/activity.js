/**
 * activity.js
 * (C) 2014 sugarizer
 * Released under Apache 2.0
**/
define(["sugar-web/activity/activity"], function (activity) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();
	});

});
