const express = require('express');
const router = express.Router();
const cors = require('cors');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const whiteList = ["http://localhost:4200"];

const directoryPath = './uploads/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.query.route + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use(cors({ origin: whiteList }));
router.use(express.json());

router.post(`/api/upload`, upload.single('file'), (req, res) => {
    res.send(req.file);
});

router.get(`/api/file`, (req, res) => {
    const fileName = req.query.name;
    const file = `${__dirname}/../uploads/${fileName}.html`;
    res.download(file);
});

router.get("/api/files", (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        console.log(files);
        res.send(files);
    });
});

module.exports = router;