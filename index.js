const express = require('express');
const app = express();
/* JSON body parse*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'do1srodkm',
api_key: '755929298436483',
api_secret: 'cFAJh9jmcsry4jrq4JdDnIP8cYI'
});


const { getDataUsers, createUser } = require('./contollers/user');


app.get('/hello', (req, res, next) => {

    res.send('Welcome to hackaton 3')
});

app.get('/user', async (req, res, next) => {
    const results = await getDataUsers();
    res.status(200).send(results);
})

app.post('/uploads', upload.single('image'), async (req, res, next) => {
    try {
        console.log(req.file, 'MY FILE LLALALLALA');

        const type = req.file.mimetype.split('/')[0];
        console.log(type, 'MY TYPEEEE');
        if(type !== 'video') {
            cloudinary.v2.uploader.upload(req.file.path,
            function(error, result) {
            if(error) {
                console.log(error)
            } else {
                res.status(200).send(result);
            }
        })
        } else {
            cloudinary.v2.uploader.upload_large(req.file.path, { resource_type: "video" },
            function(error, result) {
            if(error) {
                console.log(error)
            } else {
                res.status(200).send(result);
            }
          })
        }
        
    } catch (error) {
        throw error;
    }
    
})

app.listen(process.env.PORT || 5002, () => {
console.info('Server is running on PORT:', process.env.PORT || 5002);
});