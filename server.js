var fs = require('fs');
var data = fs.readFileSync('log.json');
var logs = JSON.parse(data);

const express = require('express');
const { request } = require('http');
const app = express(),
    port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// app.use(express.static('ski-log-app'));

// app.get("/", (request, response) => {
//     response.sendFile(process.cwd() + "/ski-log-app/dist/finish path!")
// })
app.get('/api/all', sendLogs)
app.post('/api/addLog', addLog);

function sendLogs(request, response) {
    response.send(logs.data);
}

function addLog(request, response) {
    const log = request.body.log;
    logs.data.push(log);

    var data = JSON.stringify(logs);
    fs.writeFile('log.json', data, finished);

    function finished(err){
        response.send({
            log: log,
            status: "success"});
    }
}

// function searchWord(request, response) {
//     var word = request.params.word;
//     var reply;
    
//     if (words[word]) {
//         reply = {
//             status: "found",
//             word: word,
//             score: words[word]
//         }
//     } else {
//         reply = {
//             status: "not found",
//             word: word
//         }
//     }

//     response.send(reply)
// }


// function sendFlower(request, response) {
//     var data = request.params;
//     response.send({message: "I luv " + data.searchterm});
// }