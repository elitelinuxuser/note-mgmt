const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../../middleware/auth");
const util = require("util");
const fs = require("fs");

router.get("/:title", auth, async (req, res) => {
  const list = [];
  const result = [];
  const readFile = util.promisify(fs.readFile);
  console.log("hi");
  try {
    filename = path.resolve(__dirname, "../../notes.txt");
    readFile(filename, "utf8")
      .then(data => {
        console.log(data);
        const lines = data.split("\n");
        for (line in lines) {
          let lineObj = {};
          lineData = lines[line].split("|");
          lineObj.title = lineData[0];
          lineObj.desc = lineData[1];
          list.push(lineObj);
          if (lineObj.title.includes(req.params.title)) {
            result.push(lineObj);
          }
        }
        return result;
      })
      .then(result => {
        res.json(result);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;