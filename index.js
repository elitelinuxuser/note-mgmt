const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req,res) => res.send("Server endpoint / called!"))

app.use("/api/add", require('./routes/api/addnote'));
app.use('/api/remove', require('./routes/api/removenote'));
app.use('/api/list', require('./routes/api/listnotes'));
app.use('/api/update', require('./routes/api/updatenote'));

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server running on port ${port}`));
