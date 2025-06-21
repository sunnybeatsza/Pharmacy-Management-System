const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/stock", (req, res) => {
  const data = req.body;
  fs.readFile("stockData.json", "utf8", (err, fileData) => {
    let json = [];
    if (!err && fileData) {
      json = JSON.parse(fileData);
    }
    json.push(data);
    fs.writeFile(
      "./data/stockData.json",
      JSON.stringify(json, null, 2),
      (err) => {
        if (err) return res.status(500).send("Error saving data");
        res.send("Data saved!");
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
