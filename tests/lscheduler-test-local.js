/*
*
* Copyright (C) 2011, The Locker Project
* All rights reserved.
*
* Please see the LICENSE file for more information.
*
*/
var assert = require("assert");
var request = require("request");
var vows = require("vows");
var testUtils = require(__dirname + "/test-utils.js");
require.paths.push(__dirname + "/../Common/node");
var lscheduler = require("lscheduler.js");

vows.describe("Locker Scheduling System").addBatch({
    "Scheduler": {
        topic:lscheduler.masterScheduler,
        "schedules a callback": testUtils.timeoutAsyncCallback(250, function(topic, timeout, cb) {
            topic.at(timeout, cb);
        }),
        "schedules a callback to a service": function(topic) {
            topic.at(250, 'scheduler-tester', 'scheduled');
            setTimeout(function() {
                request.get({uri : 'http://localhost:8043/Me/scheduler-tester/getScheduledCount'}, function(err, resp, body) {
                    assert.isNull(err);
                    assert.equal(body, 1);
                });
            }, 500);
        }
    }
}).export(module);
