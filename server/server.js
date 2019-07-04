const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

const getAll = require('./api').getAll;
const getOne = require('./api').getOne;
const writeLanguage = require('./api').writeLanguage;
const addLanguage = require('./api').addLanguage;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

app.get('/', async (req, res) => {
    const result = await getAll();
    res.json(JSON.parse(result));
});

app.get('/:language', async (req, res) => {
    const lang = req.params.language;
    const result = await getOne(lang);
    console.log(result);
    res.json(result);
});

app.post('/', async (req, res) => {
    const all = JSON.parse(await getAll());
    const newLang = req.body;
    const newAll = addLanguage(all, newLang);
    all.languages = newAll;
    console.log(all);
    await writeLanguage(all);
});

const httpServer = http.createServer(app);

httpServer.listen(8080);