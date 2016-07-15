'use strict';

var path = process.cwd();
var User = require('../models/users');
var fs = require('fs');


function ClickHandler() {

    this.submitReport = function (req, res) {

        var body = ""; // request body

        req.on('data', function (data) {
            body += data.toString(); // convert data to string and append it to request body
        });

        req.on('end', function () {
            var value = JSON.parse(body); // request is finished receiving data, parse it
            console.log(value);
            res.end('OK');
        });


    };


    this.renderIndex = function (req, res) {
        fs.readdir(path + '/public/img/test', function (err, data) {
            if (err) throw err;
            var result = '<div class="grid-sizer"></div>',
                count = 0;
            data.forEach(function (item) {
                var prefix = '<div class="grid-item"><img src="img/test/',
                    suffix = '" /></div>';
                result += prefix + item + suffix;
                count++;
            });
            if (count == data.length) {
                res.end(result);
            }
            // console.log(result);
        });

    }
}

module.exports = ClickHandler;
