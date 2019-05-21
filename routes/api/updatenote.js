const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require('fs');

router.get('/', (req, res)=>{
    fs.readFile(path.resolve(__dirname, "../../notes.txt"), (err, data)=>{
        if(err){
            res.send(err)
        }
        console.log("Asynchronous", data.toString());
    })
});

module.exports = router;