/**
 * activity.js
 * (C) 2014 sugarizer
 * Released under Apache 2.0
**/
requirejs.config({
    baseUrl: "lib",
    paths: {
        activity: "../js"
    }
});

requirejs(["activity/activity"]);
