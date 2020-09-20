const express = require('express');
const app = express();
const expressPeerServer = require('peer').ExpressPeerServer;
const port=process.env.PORT || 9000
const server = app.listen(port, () => console.log("Server is running..."));

const peerserver = expressPeerServer(server);

app.use('/api', peerserver);

app.get('/a', function(req, res){
    res.sendFile(__dirname + "/index-clientA.html");
});

app.get('/b', function(req, res){
    res.sendFile(__dirname + "/index-clientB.html");
});
app.get('/port', function(req, res){
    res.end(port)
});

peerserver.on('connection', (id) => {
    console.log(`A client connected : ${id}`);
})

peerserver.on('disconnect', (id) => {
    console.log(`A client say ~ bye bye : ${id}`);
});