const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const Excel = require('exceljs');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const whiteList = ["http://localhost:4200", "http://localhost:8080"];

router.use(cors({ origin: whiteList }));
router.use(express.json());

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './excelUploads');
    },
    filename: (req, file, cb) => {
        cb(null, req.query.name + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post(`/api/excelUpload`, upload.single('file'), (req, res) => {
    res.send(req.file);

    const fileName = req.query.name + path.extname(req.file.originalname);
    let pointIndex = fileName.lastIndexOf(".");
    let name = fileName.substring(0, pointIndex);
    let ext = fileName.substring(pointIndex);
    const workbook = new Excel.Workbook();

    workbook.csv.readFile(`./excelUploads/${name}${ext}`)
        .then(() => {
            let worksheet = workbook.getWorksheet(1);
            let row = worksheet.getRow(1);
            let cell = row.getCell(1);
            cell.value = "batch=" + cell.value;

            return workbook.csv.writeFile(`./excelUploads/${name}${ext}`);
        }).then(() => {
            const url = `https://${name}.tt.omtrdc.net/m2/${name}/v2/profile/batchUpdate`;
            const form = new FormData();
            form.append('file', fs.createReadStream(`./excelUploads/${name}${ext}`));
            // const request_config = {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     },
            //     data: form
            // }
            return axios.post(url, form)
        }).then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {
            console.log('finished all 2');
        });
})



module.exports = router;



// .then(() => {
//     let newFile = fs.createReadStream(`./excelUploads/${name}${ext}`)
//     const url = `${name}.tt.omtrdc.net/m2/${name}/v2/profile/batchUpdate`;
//     newFile.on('end', function() {
//         const form_data = new FormData();
//         form_data.append("file", newFile, "filename.ext");
//         const request_config = {
//             method: "post",
//             url: url,
//             data: form_data
//         };
//         return axios(request_config);
//     });
// });