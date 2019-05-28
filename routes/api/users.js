const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const path = require("path");
const { promosify } = require("util");
const { check, validationResult } = require("express-validator/check");

const fs = require("fs");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Enter 8 or more characters for password!").isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if the user is logged in
      // let user = await User.findOne({ email });
      let user = false;
      const filename = await path.resolve(__dirname, "../../users.txt");
      await fs.readFile(filename, "utf8", async (err, data) => {
        if (err) {
          console.log(err);
        }
        const lines = await data.split("\n");

        for (i = 0; i < lines.length; i++) {
          fileArray = await lines[i].split("|");
          fileName = fileArray[0];
          fileEmail = fileArray[1];
          filePasswordHash = fileArray[2];
          if (email === fileEmail) {
            console.log("idk");
            user = true;
            // res.json({ errors: [{ msg: "User already exists" }] });
          }
        }
      });

      await setTimeout(async () => {
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        console.log(user);

        //Encrypt password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        data = name + "|" + email + "|" + hashedPassword + "\n";

        await fs.appendFileSync(
          path.resolve(__dirname, "../../users.txt"),
          data,
          err => {
            if (err) throw err;
          }
        );

        fs.writeFileSync(`${email}.txt`, "");

        //Return json web token
        const payload = {
          user: {
            email
          }
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }, 1000);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
