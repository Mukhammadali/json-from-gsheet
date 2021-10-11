const fs = require('fs');
const { resolve } = require('path');
const helper = require('./helper');

const makeSurePathExists = (path) => {
  const resolvedPath = resolve(path);
  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true });
  }
};

const createFile = (filePath, content) => {
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.info(`created ${filePath}`);
};

const writeJSONfiles = (result, path) => {
  makeSurePathExists(path);

  // create json for each language data en.json, de.json etc...
  Object.keys(result.data).forEach((value) => {
    const file = resolve(`${path}/${value}.json`);
    // beautify content with 2 space identation before saving
    const content = JSON.stringify(result.data[value], null, 2);
    createFile(file, content);
  });
  
  // create locales/index.js file which exports all these json files
  const filePath = resolve(`${path}/index.js`);
  const jsContent = `export default {
  ${Object.keys(result.data).map((code, idx) => (idx !== 0 ? '\n  ' : '') + `${code}: require('./${code}.json')`)}
}
  `
  createFile(filePath, jsContent);


  // create languages.json which has got code, language name and etc.
  const languagesFilePath = resolve(path, '../', 'languages.json');
  const content = JSON.stringify(result.languages, null, 2);
  createFile(languagesFilePath, content);
};
const sheetToJSON = async ({ spreadsheetId, tabName, apiKey, savePath }) => {
  if (!spreadsheetId) {
    throw Error(`spreadsheetId is required`);
  }
  try {
    const result = await helper.getJSONData(spreadsheetId, apiKey, tabName);
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