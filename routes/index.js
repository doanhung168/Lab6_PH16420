const express = require('express');
const router = express.Router();
const multer = require('multer')
const Car = require('../model/Car')

const upload = require('../middleware/upload')
const uploadFile = upload.array('images')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {message: ''});
});

router.post("/", function (req, res, next) {
    uploadFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.message === 'Too many files') {
                return res.render('index', {message: 'Chỉ cho phép tối đa 5 file'})
            }
            if (err.message === 'File too large') {
                return res.render('index', {message: 'Chỉ cho phép kích thước tối đa của file là 2MB'})
            }
        } else if (err) {
            return res.render('index', {message: err.message})
        } else {
            const images = []
            for(const file of req.files) {
                console.log(file.path)
                const pathPart = file.path.split("/")
                const path = pathPart[1] + "/" + pathPart[2]
                console.log(path)
                images.push(path)
            }
            let car = new Car({
                name: req.body.name,
                price: req.body.price,
                images: images
            })
            car.save()
                .then((car) => {
                    console.log(car)
                    console.log('car added successful')
                    return res.render('showResult', {car : car})
                })
                .catch(err => console.log(err.message))

        }
    })
})

module.exports = router;



