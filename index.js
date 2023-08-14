const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Se encarga de cargar el archivo html con todos sus elementos y scripts
app.get("/",(request, response) => {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get("/ejemplo/:cantidad",(request, response) => {
  https.get(`https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=${request.params.cantidad}`, (res) => {
    let data = '';
    res.on('data', (result) =>{
      data += result;
    });

    res.on('end', () => {
      response.send(data.split('\n'));
    });
  });
});

app.post("/enviar", async (request, response) => {
  let person = {name: request.body.name, email: request.body.email, phone: request.body.phone};
  console.log(JSON.stringify(person));
  let status = "0";
  while (status != "200")
  {
    status = await sendPerson(person)
  }
  console.log("status: " + status);
  response.json({success: status});
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
  console.log("Mi port" + port);
});

async function sendPerson(person){
  const res = await fetch("https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items", {
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(person)
  });
  return await res.status;
}
