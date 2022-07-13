const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Fuck You Ezekiel");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
