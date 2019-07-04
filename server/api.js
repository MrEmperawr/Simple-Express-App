const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


function getAll() {
    return readFile('./db.json', 'utf-8')
        .catch(error => console.log(error));
}

function getOne(lang) {
    return readFile('./db.json', 'utf-8')
        .then(data => {
            data = JSON.parse(data);
            const language = data.languages.find(l => l.language === lang);
            return language;
        })
        .catch(error => console.log(error))
}

function writeLanguage(data) {
    return writeFile('./db.json', JSON.stringify(data, null, 4))
        .catch(error => console.log(error))
}

function addLanguage(langs, lang) {
    let langList = langs.languages;
    langList.push(lang);
    return langList;
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    writeLanguage: writeLanguage,
    addLanguage: addLanguage,
}