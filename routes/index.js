const express = require('express');
const router = express.Router();
const cors = require('cors');

const path = require('path');
const multer = require('multer');

const whiteList = ["http://localhost:4200"];

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.query.route + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

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

router.get(`/api/file`, (req, res) => {
    const fileName = req.query.name;
    const file = `${__dirname}/../uploads/${fileName}.html`;
    console.log(file);
    res.download(file);
});

module.exports = router;