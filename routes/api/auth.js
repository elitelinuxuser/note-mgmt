const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("config");
const path = require("path");
const util = require("util");
const { check, validationResult } = require("express-validator/check");

// @route    GET api/auth
// @desc     Get user data
// @access   Public
router.get("/", auth, async (req, res) => {
  const readFile = util.promisify(fs.readFile);
  try {
    filename = path.resolve(__dirname, "../../users.txt");
    readFile(filename, "utf8")
      .then(data => {
        console.log(data);
        const lines = data.split("\n");
        for (line in lines) {
          fileName = lines[line].split("|")[0];
          fileEmail = lines[line].split("|")[1];
          if (req.user.email === fileEmail) {
            return true;
          }
        }
        return false;
      })
      .then(bool => {
        if (bool) {
          res.json({ found: true, name: fileName, email: fileEmail });
        } else {
          res.json({
            found: false,
            msg: "No user found with the current email"
          });
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let isMatch = false;

      const filename = await path.resolve(__dirname, "../../users.txt");

      await fs.readFile(filename, "utf8", async (err, data) => {
        if (err) {
          console.log(err);
        }
        const lines = await data.split("\n");

        for (i = 0; i < lines.length - 1; i++) {
          fileArray = await lines[i].split("|");
          fileName = fileArray[0];
          fileEmail = fileArray[1];
          filePasswordHash = fileArray[2];
          if (
            (await bcrypt.compare(password, filePasswordHash)) &&
            email === fileEmail
          ) {
            isMatch = true;
          }
        }
      });

      setTimeout(() => {
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const payload = {
          user: { email }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }, 1000);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
