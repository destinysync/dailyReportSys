'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');


module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();

    app.route('/')
    // .post(clickHandler.renderIndex)
        .get(function (req, res) {
            if (req.isAuthenticated()) {
                res.sendFile(path + '/public/index.html');
            } else {
                res.redirect('/login');
            }
        });

    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));


    app.route('/submitReport')
        .post(clickHandler.submitReport);

    // app.route('/logout')
    // 	.get(function (req, res) {
    // 		req.logout();
    // 		res.redirect('/');
    // 	});
    //
    // app.route('/auth/local')
    // 	.post(passport.authenticate('local', { failureRedirect: '/login' }),
    // 		function(req, res) {
    // 			res.redirect('/');
    // 		});

};
