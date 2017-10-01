
exports.getDiningObject = function(court, date) {

    var http = require('https');

    var url = 'https://api.hfs.purdue.edu/menus/v1/locations/' + court + '/' + date;

    console.log(url);

    var object;

    var req = http.get(url, (res) => {
        var json = '';

        res.on('data', function(chunk){
            json += chunk;
        });

        res.on('end', () => {
            object = JSON.parse(json);
            return object;
        });

        
    });

}