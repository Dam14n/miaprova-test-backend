const express = require('express');
const router = express.Router();
const cors = require('cors');
const whiteList = ["http://localhost:4200"];

router.use(cors({ origin: whiteList }));

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

module.exports = router;