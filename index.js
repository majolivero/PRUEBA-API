const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const https = require('https');

app.get("/",(request, response) => {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get("/obtener/:amount",(request, response) => {
  https.get(`https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=${request.params.amount}`, (res) => {
    let data = '';
    res.on('data', (chunk) =>{
      data += chunk;
    });

    res.on('end', () => {
      response.send(data.split('\n'));
    });
  });
});

app.post("/enviar", (request, response) => {

});

app.listen(port,() => {
  console.log("Mi port" + 3000);
});
