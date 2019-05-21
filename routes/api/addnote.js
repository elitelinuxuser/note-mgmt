const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require('fs');

router.post('/', async (req, res)=>{
    title = req.body.title;
    desc = req.body.desc;
    hashKey = req.body.hashKey;
    data = title+'|'+desc+'|'+hashKey+"\n";
    console.log(data); 
    await fs.appendFileSync(path.resolve(__dirname, "../../notes.txt"), data ,(err)=>{
        if(err) throw err;
    });
    return res.json({msg: "Note added!"});
});

module.exports = router;