const xlsx = require('xlsx');
var fs = require('fs');
const { parse } = require('path');

let path = 'asu_usage.xlsx';
excelToJSON(path);

function generateJSONFile(data) {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data))
    } catch (err) {
        console.error(err);
    }
}

function excelToJSON(path) {
    const file = xlsx.readFile(path);

    const sheetNames = file.SheetNames;
    const totalSheets = file.totalSheets;

    let parsedData = [];

    for (let i = 0; i < totalSheets; i++) {
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        tempData.shift();
        parsedData.push(...tempData);
    }

    generateJSONFile(parsedData);
}
