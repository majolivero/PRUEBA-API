const express = require("express");
const app = express();
let request = require("request");
const port = 3000;

app.get("/",() => {
  const datos_ejemplo = {
    url:'https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/samples?size=10',
    method: 'GET',
    json:{},
    qs:{
      offset:20
    }
  };
  request(datos_ejemplo, (err, response, body) => {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      console.log(body);
    } else {
      console.log(response.statusCode);
    }
  });
})

app.listen(port,() => {
  console.log("Mi port" + 3000);
});
