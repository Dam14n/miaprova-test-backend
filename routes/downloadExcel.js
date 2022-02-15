const express = require('express');
const router = express.Router();
const cors = require('cors');
const whiteList = ["http://localhost:4200"];

router.use(cors({ origin: whiteList }));
router.use(express.json());

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
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    const $file = `${__dirname}/../files/${file}.txt`;
    res.download($file, `${__dirname}/../files/${name}${ext}`, () => {
        console.log("\nFile Renamed!\n")
    });
});

module.exports = router;