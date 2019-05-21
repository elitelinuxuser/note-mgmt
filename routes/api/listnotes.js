const express = require('express');
const router = express.Router();
const path = require('path');
const readline = require('readline');
const fs = require('fs');

router.get('/', async function(req, res){
    const list = []
    await fs.readFile(path.resolve(__dirname, "../../notes.txt"), function(err, data){
        if(err){
            res.send(err)
        }
        let rl = readline.createInterface({
            input: fs.createReadStream(path.resolve(__dirname, "../../notes.txt"))
        })
        rl.on('line', function(line) {
            let lineObj = {};
            lineData = line.split('|');
            lineObj.title = lineData[0];
            lineObj.desc = lineData[1];
            lineObj.hash = lineData[2];
            list.push(lineObj)
        });
        rl.on('close', function(){
            res.json(list)
        });
    })
});

router.get('/titles', async function(req, res){
    const list = []
    await fs.readFile(path.resolve(__dirname, "../../notes.txt"), function(err, data){
        if(err){
            res.send(err)
        }
        let rl = readline.createInterface({
            input: fs.createReadStream(path.resolve(__dirname, "../../notes.txt"))
        })
        rl.on('line', function(line) {
            lineData = line.split('|');
            list.push(lineData[0]);
        });
        rl.on('close', function(){
            res.json(list)
        });
    })
});

router.post('/view', async function(req, res){
    let data;
    title = req.body.title;
    hashKey = req.body.hashKey;
    filename = path.resolve(__dirname, "../../notes.txt");
    await fs.readFile(filename, 'utf8', async function(err, data)
    {
        if (err)
        {
            console.log(err)
        }
        let flag=false;
        const lines = data.split('\n');
        for(line in lines){
            fileTitle = lines[line].split('|')[0];
            fileDesc = lines[line].split('|')[1];
            fileHashKey = lines[line].split('|')[2];
            if(title === fileTitle && hashKey === fileHashKey){
                flag = true;
                res.json({title: fileTitle, desc: fileDesc, found: true})
            }
        }
        res.json({found: false, msg: 'No note found with the provided key'})
    })
});

module.exports = router;