/* eslint-disable no-plusplus */
const Axios = require('axios');

// const url2 = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json"

async function getJSONData(spreadsheetId) {
  const url1 = `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/od6/public/values?alt=json`;
  const response = await Axios.get(url1);
  const data = {};
  const headers = {};
  const cols = [];
  if (response.data) {
    const entries = response.data.feed.entry;
    const colCount = parseInt(response.data.feed.gs$colCount.$t, 10);
    const totalResults =  parseInt(response.data.feed['openSearch$totalResults']['$t'], 10);
    for (let i = 0; i <= colCount; i++) {
      const row = parseInt(entries[i].gs$cell.row, 10);
      if (row > 1) break;
      if (entries[i]) {
        const { col } = entries[i].gs$cell;
        const rawText = entries[i].gs$cell.$t;
        const [enLocale, locale, code] = rawText.split('-');
        headers[col] = {
          enLocale: enLocale.trim(),
          locale: locale ? locale.trim() : null,
          code: code ? code.trim() : null,
        };
      }
    }

    for (let i = 0; i <= totalResults; i++) {
      if(!entries[i]) continue;
      const row = parseInt(entries[i].gs$cell.row, 10);
      const col = parseInt(entries[i].gs$cell.col, 10);
      // eslint-disable-next-line no-continue
      if (row === 1) continue;
      if (!cols[col]) {
        cols[col] = [];
      }
      if (entries[i]) {
        const rawText = entries[i].gs$cell.$t;
        cols[col][row] = rawText;
      }
    }

    for (let i = 2; i <= cols.length - 1; i++) {
      data[headers[i].code] = {};
      for (let j = 0; j <= cols[i].length - 1; j++) {
        if (cols[i][j]) {
          data[headers[i].code][cols[1][j]] = cols[i][j];
        }
      }
    }
  }

  if (headers['1']) {
    delete headers['1'];
  }
  const languages = Object.keys(headers).map((key) => headers[key]);
  return { data, languages, cols };
}

module.exports = { getJSONData };
