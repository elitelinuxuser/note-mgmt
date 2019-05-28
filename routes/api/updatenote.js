const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const fs = require("fs");

router.post("/", auth, (req, res) => {
  title = req.body.title;
  desc = req.body.desc;
  email = req.user.email;
  id = req.body.id;
  filename = path.resolve(__dirname, `../../${email}.txt`);
  fs.readFile(filename, "utf8", async function(err, data) {
    if (err) {
      console.log(err);
    }
    let count = 0;
    let flag = false;
    const lines = data.split("\n");
    for (line in lines) {
      count = count + 1;
      fileTitle = lines[line].split("|")[0];
      fileDesc = lines[line].split("|")[1];
      fileId = lines[line].split("|")[2];
      if (id === fileId) {
        flag = true;
        break;
      }
    }
    if (flag) {
      const dataToBeId = title + "|" + desc;
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedNote = await bcrypt.hash(dataToBeId, salt);
      const midData = dataToBeId + "|" + hashedNote;

      // const midData = title + "|" + desc + "|" + id;
      var linesExceptFirst = lines.slice(0, count - 1);
      linesExceptFirst.push(midData);
      var linesExceptLast = lines.slice(count);
      var finalString = linesExceptFirst.concat(linesExceptLast).join("\n");
      console.log(finalString);
      fs.writeFileSync(filename, finalString);
      res.json({ msg: "Updation Successful" });
    } else {
      res.json({ msg: "No note found with the provided key" });
    }
  });
});

module.exports = router;
