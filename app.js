const express = require('express');
const upload = require('express-fileupload');

const app = express();
app.use(upload());

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/', (req, res)=>{
    if(req.files) {
        let file = req.files.filename;
        let fileName = file.name;
        file.mv(`./uploads/${fileName}`, (err)=>{
            if(err){
                console.log(err)
                res.send(err)
            }
            else {
                res.redirect('/')
            }
        })
    }
})

app.listen(8000, ()=>{
    console.log('server started on 8000')
})