const fs = require('fs');
const { resolve } = require('path');
const helper = require('./helper');

const makeSurePathExists = (path) => {
  const resolvedPath = resolve(path);
  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }
};

const createFile = (filePath, data) => {
  // beautify content with 2 space identation before saving
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.info(`created ${filePath}`);
};

const writeJSONfiles = (result, path) => {
  makeSurePathExists(path);

  // create json for each language data en.json, de.json etc...
  Object.keys(result.data).forEach((value) => {
    const file = resolve(`${path}/${value}.json`);
    createFile(file, result.data[value]);
  });

  // create languages.json which has got code, language name and etc.
  const languagesFilePath = resolve(path, '../', 'languages.json');
  createFile(languagesFilePath, result.languages);
};
const sheetToJSON = async ({ spreadsheetId, savePath }) => {
  if (!spreadsheetId) {
    throw Error(`spreadsheetId is required`);
  }
  try {
    const result = await helper.getJSONData(spreadsheetId);
    if (savePath) {
      writeJSONfiles(result, savePath);
    }
    return result;
  } catch (err) {
    console.error(err);
  }
  return null;
};

module.exports = { sheetToJSON };