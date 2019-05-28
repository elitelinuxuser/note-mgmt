const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const getUser = async req => {
  //   const readFile = util.promisify(fs.readFile);
  console.log("Get user fired");
  console.log(req.user);
  try {
    filename = path.resolve(__dirname, "../../users.txt");
    return await fs.readFile(filename, "utf8", (err, data) => {
      console.log(data);
      const lines = data.split("\n");
      for (line in lines) {
        fileName = lines[line].split("|")[0];
        fileEmail = lines[line].split("|")[1];
        if (req.user.email === fileEmail) {
          return req.user.email;
        }
      }
      return null;
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = getUser;
