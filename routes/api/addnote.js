const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");

const fs = require("fs");

router.post("/", auth, async (req, res) => {
  title = req.body.title;
  desc = req.body.desc;
  email = req.user.email;
  midData = title + "|" + desc;
  //Encrypt password
  const salt = await bcrypt.genSalt(10);

  const hashedNote = await bcrypt.hash(midData, salt);

  data = midData + "|" + hashedNote + "\n";

  console.log(data);
  await fs.appendFileSync(
    path.resolve(__dirname, `../../${email}.txt`),
    data,
    err => {
      if (err) throw err;
    }
  );
  return res.json({ msg: "Note added!" });
});

module.exports = router;
