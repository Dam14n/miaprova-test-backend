const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const routes = require('./routes/getHTML');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(routes, require('./routes/components'));
app.use(routes, require('./routes/getExcel'));
app.use(routes, require('./routes/downloadExcel'));
app.use(cors());

app.listen(PORT, () => console.log('app is running on port ' + PORT))