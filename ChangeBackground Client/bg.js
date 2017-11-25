const WebSocket = require('ws');
const {exec} = require('child_process');



callback = function (response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {

        var result = JSON.parse(str);
        var items = result.items;
        if (!items) {
            console.log('HTTP_ERROR::' + response.statusCode)
            return;
        }


        var index = parseInt(Math.random() * items.length);
        var url = result.items[index].link;

        console.log('Count of items', items.length);
        console.log(index + ': ' + url);
        exec(`sh ./change_background.sh ${url}`);

    });

};

const ws = new WebSocket('ws://185.31.162.252:3002/');

ws.on('open', function open() {
    console.log("Connection established");
});

ws.on('message', function incoming(data) {
    console.log('Changing picture to Google Image Search Result for "'+data+'"');
    exec(`sh ./change_background.sh ${data}`);
});