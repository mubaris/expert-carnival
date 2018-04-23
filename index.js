var gs = require('github-scraper');
var request = require('request');

var API_KEY="87eaf88e66523a87f95122134a3c061f0f8642a6";

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

function allEmails(username) {
    var emails = [];
    request('https://api.github.com/users/' + username + '?access_token=' + API_KEY, function(error, response, body) {
        var email = response.body.email;
        if (email) {
            emails.push(email);
        }
    });
    request(`https://registry.npmjs.org/-/user/org.couchdb.user:${username}`, function(err, res) {
        var email = res.body.email;
        if (email) {
            emails.push(email);
        }
    });
    return emails;
}

allEmails('mubaris');
