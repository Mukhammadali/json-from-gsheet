/* eslint-disable no-plusplus */
const Axios = require('axios');


async function getJSONData(spreadsheetId, apiKey, tabName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${tabName}?alt=json&key=${apiKey}`;
  const response = await Axios.get(url);
  const data = {};
  const headers = {};
  if (response.data && response.data.values) {
    const entries = response.data.values;
    const colCount = entries[0].length;
    const totalResults =  entries.length - 1;
    
    // get headers and ignore "Default" header name on index 1
    for (let i = 1; i <= colCount; i++) {
      const row = entries[0][i];
      if (row) {
        const [enLocale, locale, code] = row.split('-');
        headers[i] = {
          enLocale: enLocale.trim(),
          locale: locale ? locale.trim() : null,
          code: code ? code.trim() : null,
        };
      }
    }
    // iterate over each language and parse its values
    Object.keys(headers).forEach(idx => {
        // ignore index 0 since it is translation key
        for (let i = 1; i <= totalResults; i++) {
            if (entries[i][0] && entries[i][idx]){
                if (!data[headers[idx].code]) {
                    data[headers[idx].code] = {}
                }
                data[headers[idx].code][entries[i][0]] = entries[i][idx]
            }
        }
    })
  }

  const languages = Object.keys(headers).map((key) => headers[key]);
  return { data, languages };
}

module.exports = { getJSONData };
