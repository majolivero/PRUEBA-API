const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/",(request, response) => {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get("/ejemplo/:amount",(request, response) => {
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

app.post("/enviar", async (request, response) => {
  let person = {name: request.body.name, email: request.body.email, phone: request.body.phone};
  console.log(JSON.stringify(person));
  answer = (await sendPerson(person)).status
  console.log("status: " + answer);
  response.json({success: answer});
});

app.get("/descargar", (request, response) => {
  https.get(`https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items`, (res) => {
    let data = '';
    res.on('data', (chunk) =>{
      data += chunk;
    });

    res.on('end', () => {
      response.send(data);
    });
  });
});

app.listen(port,() => {
  console.log("Mi port" + 3000);
});

async function sendPerson(person){
  const res = await fetch("https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items", {
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(person)
  });
  return await res;
}
