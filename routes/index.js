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

let newStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './newUploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.query.name + path.extname(file.originalname));
    }
})


const upload = multer({ storage: storage });
const newUpload = multer({ storage: newStorage });

router.use(cors({ origin: whiteList }));
router.use(express.json());

router.get('/api/catalogs', (req, res) => {
    res.send([{
        "id": 1,
        "name": "Chrome Extension",
        "img": "assets/chromeExtension.png",
        "link": "https://www.miaprova.com/blog/adobe-target-chrome-extension-brought-to-you-by-miaprova/"



    }, {
        "id": 2,
        "name": "Youtube",
        "img": "assets/followUsOnYoutube.png",
        "link": "https://www.youtube.com/channel/UCdm5r7ZVgyYfaMQvuOvqVlA"

    }, {
        "id": 3,
        "name": "Linkedin",
        "img": "assets/followUsOnLinkedin.png",
        "link": "https://www.linkedin.com/company/miaprova"

    }])
})

router.get('/api/stories', (req, res) => {
    res.send([{
        "id": 1,
        "name": "Begginers Luck",
        "img": "https://luma.enablementadobe.com/content/luma/us/en/experience/beginners-luck/_jcr_content/root/hero_image.coreimg.jpeg"

    }, {
        "id": 2,
        "name": "Warming Up",
        "img": "https://luma.enablementadobe.com/content/luma/us/en/experience/warming-up/_jcr_content/root/hero_image.coreimg.jpeg"

    }, {
        "id": 3,
        "name": "Keep Moving",
        "img": "https://luma.enablementadobe.com/content/luma/us/en/experience/keep-moving/_jcr_content/root/hero_image.coreimg.jpeg"


    }]);
});

router.post(`/api/upload`, upload.single('file'), (req, res) => {
    res.send(req.file);
});

router.post(`/api/newUpload`, newUpload.single('file'), (req, res) => {
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

router.get("/api/fileParty", (req, res) => {
    let fileName = req.query.name;
    console.log(fileName);

    let pointIndex = fileName.lastIndexOf(".");
    let name = fileName.substring(0, pointIndex);
    let ext = fileName.substring(pointIndex);

    console.log("File name= " + name);
    console.log("File Extension= " + ext);

    let file = "";
    if (name == "first-party ID") {
        file = "batch-first-party-id_download";
    } else if (name == "second-party ID") {
        file = "batch-second-party_download";
    } else {
        file = ""
    }
    console.log("file = " + file);
    const $file = `${__dirname}/../files/${file}.txt`;
    res.download($file, `${__dirname}/../files/${name}${ext}`, () => {
        console.log("\nFile Renamed!\n")
    });
});

module.exports = router;